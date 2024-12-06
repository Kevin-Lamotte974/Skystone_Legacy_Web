from flask import Blueprint, request, jsonify
from werkzeug.security import generate_password_hash, check_password_hash
from database.config import get_db_connection
import jwt
import datetime

auth_bp = Blueprint('auth', __name__)

@auth_bp.route('/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    pseudo = data.get('pseudo')
    password = data.get('password')
    
    if not email or not pseudo or not password:
        return jsonify({'error': 'Tous les champs sont requis'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Erreur de connexion à la base de données'}), 500
    
    cursor = conn.cursor(dictionary=True)
    
    # Vérifier si l'email existe déjà
    cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'error': 'Cet email est déjà utilisé'}), 400
    
    # Vérifier si le pseudo existe déjà
    cursor.execute('SELECT * FROM users WHERE pseudo = %s', (pseudo,))
    if cursor.fetchone():
        cursor.close()
        conn.close()
        return jsonify({'error': 'Ce pseudo est déjà utilisé'}), 400
    
    # Créer le nouvel utilisateur
    hashed_password = generate_password_hash(password)
    try:
        print(f"Tentative d'insertion de l'utilisateur: {email}, {pseudo}")
        cursor.execute(
            'INSERT INTO users (email, pseudo, password) VALUES (%s, %s, %s)',
            (email, pseudo, hashed_password)
        )
        print("Requête SQL exécutée")
        conn.commit()
        print("Commit effectué avec succès")
        
        # Générer le token JWT
        token = jwt.encode({
            'user_id': cursor.lastrowid,
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, 'votre_secret_key', algorithm='HS256')
        
        return jsonify({
            'message': 'Inscription réussie',
            'token': token,
            'user': {
                'id': cursor.lastrowid,
                'email': email,
                'pseudo': pseudo
            }
        }), 201
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

@auth_bp.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')
    
    if not email or not password:
        return jsonify({'error': 'Email et mot de passe requis'}), 400
    
    conn = get_db_connection()
    if not conn:
        return jsonify({'error': 'Erreur de connexion à la base de données'}), 500
    
    cursor = conn.cursor(dictionary=True)
    
    try:
        cursor.execute('SELECT * FROM users WHERE email = %s', (email,))
        user = cursor.fetchone()
        
        if not user or not check_password_hash(user['password'], password):
            return jsonify({'error': 'Email ou mot de passe incorrect'}), 401
        
        # Générer le token JWT
        token = jwt.encode({
            'user_id': user['id'],
            'exp': datetime.datetime.utcnow() + datetime.timedelta(days=1)
        }, 'votre_secret_key', algorithm='HS256')
        
        return jsonify({
            'token': token,
            'user': {
                'id': user['id'],
                'email': user['email'],
                'pseudo': user['pseudo']
            }
        })
        
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    finally:
        cursor.close()
        conn.close()

@auth_bp.route('/logout', methods=['POST'])
def logout():
    # Côté serveur, nous n'avons pas besoin de faire grand-chose
    # car le token JWT sera géré côté client
    return jsonify({'message': 'Déconnexion réussie'}), 200
