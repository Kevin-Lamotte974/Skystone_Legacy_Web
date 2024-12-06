<?php
require_once "config.php";

try {
    if($pdo) {
        echo "Connexion à la base de données réussie !";
    }
} catch(PDOException $e) {
    echo "Erreur de connexion : " . $e->getMessage();
}
?>
