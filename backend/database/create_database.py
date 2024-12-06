import mysql.connector
from mysql.connector import Error

def create_database():
    try:
        # Première connexion sans spécifier de base de données
        connection = mysql.connector.connect(
            host="localhost",
            user="root",
            password=""
        )
        
        if connection.is_connected():
            cursor = connection.cursor()
            
            # Création de la base de données
            cursor.execute("CREATE DATABASE IF NOT EXISTS skystone_db")
            print("Base de données 'skystone_db' créée avec succès!")
            
            # On se connecte à la nouvelle base de données
            cursor.execute("USE skystone_db")
            
            # Création des tables
            # Table des utilisateurs
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS users (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    username VARCHAR(50) NOT NULL UNIQUE,
                    email VARCHAR(100) NOT NULL UNIQUE,
                    password VARCHAR(255) NOT NULL,
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            print("Table 'users' créée avec succès!")
            
            # Table des personnages
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS characters (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    user_id INT,
                    name VARCHAR(50) NOT NULL,
                    level INT DEFAULT 1,
                    class VARCHAR(50),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
                    FOREIGN KEY (user_id) REFERENCES users(id)
                )
            """)
            print("Table 'characters' créée avec succès!")
            
            # Table des objets
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS items (
                    id INT AUTO_INCREMENT PRIMARY KEY,
                    name VARCHAR(100) NOT NULL,
                    description TEXT,
                    type VARCHAR(50),
                    rarity VARCHAR(20),
                    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
                )
            """)
            print("Table 'items' créée avec succès!")
            
            # Table d'inventaire (relation entre personnages et objets)
            cursor.execute("""
                CREATE TABLE IF NOT EXISTS inventory (
                    character_id INT,
                    item_id INT,
                    quantity INT DEFAULT 1,
                    FOREIGN KEY (character_id) REFERENCES characters(id),
                    FOREIGN KEY (item_id) REFERENCES items(id),
                    PRIMARY KEY (character_id, item_id)
                )
            """)
            print("Table 'inventory' créée avec succès!")

    except Error as e:
        print(f"Erreur lors de la création de la base de données: {e}")
    
    finally:
        if connection.is_connected():
            cursor.close()
            connection.close()
            print("Connexion MySQL fermée")

if __name__ == "__main__":
    create_database()
