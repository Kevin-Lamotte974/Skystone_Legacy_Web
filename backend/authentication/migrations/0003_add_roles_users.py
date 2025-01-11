from django.db import migrations

def update_roles_and_users(apps, schema_editor):
    Role = apps.get_model('authentication', 'Role')
    User = apps.get_model('authentication', 'User')
    
    # Attribution du rôle admin_dev au superuser s'il existe
    superusers = User.objects.filter(is_superuser=True)
    for superuser in superusers:
        admin_role = Role.objects.get(name='admin_dev')
        if not superuser.roles.filter(name='admin_dev').exists():
            superuser.roles.add(admin_role)
    
    # Attribution du rôle player aux utilisateurs normaux
    normal_users = User.objects.filter(is_superuser=False)
    for user in normal_users:
        player_role = Role.objects.get(name='player')
        if not user.roles.filter(name='player').exists():
            user.roles.add(player_role)

def reverse_update(apps, schema_editor):
    pass

class Migration(migrations.Migration):
    dependencies = [
        ('authentication', '0002_add_default_roles'),  # Correction de la dépendance
    ]

    operations = [
        migrations.RunPython(update_roles_and_users, reverse_update),
    ]