import os
import django

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'backend.settings')
django.setup()

from django.contrib.auth import get_user_model
User = get_user_model()

# Créer le superutilisateur s'il n'existe pas déjà
if not User.objects.filter(email='admin@skystone.com').exists():
    User.objects.create_superuser(
        email='admin@skystone.com',
        password='Skystone2024!',
        pseudo='admin'
    )
    print("Superutilisateur créé avec succès!")
else:
    print("Le superutilisateur existe déjà")
