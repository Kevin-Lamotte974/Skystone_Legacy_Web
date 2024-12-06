# Importation des modules nécessaires
import mysql.connector  # Module principal pour la connexion MySQL
from mysql.connector import Error  # Pour la gestion des erreurs MySQL
from dotenv import load_dotenv  # Pour charger les variables d'environnement
import os  # Pour accéder aux variables d'environnement

# Charge les variables d'environnement depuis un fichier .env si présent
load_dotenv()

def get_db_connection():
    """
    Crée et retourne une connexion à la base de données MySQL.
    
    Returns:
        connection: Objet de connexion MySQL si réussi, None si échec
    """
    try:
        # Établit la connexion avec les paramètres suivants
        connection = mysql.connector.connect(
            host="localhost",     # Adresse du serveur MySQL (local)
            user="root",         # Nom d'utilisateur MySQL (par défaut: root)
            password="",         # Mot de passe (vide par défaut dans XAMPP)
            database="skystone_db"  # Nom de la base de données
        )
        return connection
        
    except Error as e:
        # En cas d'erreur, affiche le message et retourne None
        print(f"Erreur lors de la connexion à MySQL: {e}")
        return None

def test_connection():
    """
    Teste la connexion à la base de données et affiche les informations de connexion.
    Cette fonction est utile pour vérifier que tout fonctionne correctement.
    """
    # Tente d'établir une connexion
    connection = get_db_connection()
    
    # Vérifie si la connexion est établie et active
    if connection and connection.is_connected():
        # Récupère la version du serveur MySQL
        db_info = connection.get_server_info()
        print(f"Connecté à MySQL Server version {db_info}")
        
        # Crée un curseur pour exécuter des requêtes
        cursor = connection.cursor()
        
        # Vérifie quelle base de données est actuellement utilisée
        cursor.execute("select database();")
        record = cursor.fetchone()
        print(f"Vous êtes connecté à la base de données: {record[0]}")
        
        # Ferme proprement le curseur et la connexion
        cursor.close()
        connection.close()
        print("Connexion MySQL est fermée")
    else:
        print("Échec de la connexion")
