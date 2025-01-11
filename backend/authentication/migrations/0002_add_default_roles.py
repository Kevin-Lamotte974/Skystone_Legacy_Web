from django.db import migrations

def create_default_roles_and_assign(apps, schema_editor):
    Role = apps.get_model('authentication', 'Role')
    User = apps.get_model('authentication', 'User')
    
    # Création des rôles
    roles = {
        'player': 'Utilisateur standard du jeu',
        'admin': 'Administrateur avec accès aux fonctionnalités de gestion',
        'admin_dev': 'Administrateur développeur avec accès complet'
    }
    
    created_roles = {}
    for role_name, description in roles.items():
        role = Role.objects.create(
            name=role_name,
            description=description
        )
        created_roles[role_name] = role
    
    # Attribution du rôle admin_dev au superuser s'il existe
    superusers = User.objects.filter(is_superuser=True)
    for superuser in superusers:
        superuser.roles.add(created_roles['admin_dev'])
    
    # Attribution du rôle player aux utilisateurs normaux
    normal_users = User.objects.filter(is_superuser=False)
    for user in normal_users:
        user.roles.add(created_roles['player'])

def remove_default_roles(apps, schema_editor):
    Role = apps.get_model('authentication', 'Role')
    Role.objects.filter(name__in=['player', 'admin', 'admin_dev']).delete()

class Migration(migrations.Migration):
    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.RunPython(create_default_roles_and_assign, remove_default_roles),
    ]