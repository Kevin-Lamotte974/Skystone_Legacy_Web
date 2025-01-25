from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(read_only=True)  # Champ en lecture seule pour le rôle
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'email', 'pseudo', 'password', 'date_joined', 'role', 'is_staff', 'is_superuser')
        extra_kwargs = {
            'password': {'write_only': True},
            'date_joined': {'read_only': True},
            'role': {'read_only': True},
            'is_staff': {'read_only': True},
            'is_superuser': {'read_only': True}
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            pseudo=validated_data['pseudo'],
            password=validated_data['password']
        )
        return user

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ('id', 'name')

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    roles = RoleSerializer(many=True, read_only=True)  # Utiliser 'roles' au lieu de 'role'
    
    class Meta:
        model = User
        fields = ('id', 'email', 'pseudo', 'password', 'date_joined', 'roles', 'is_staff', 'is_superuser')
        extra_kwargs = {
            'password': {'write_only': True},
            'date_joined': {'read_only': True},
            'is_staff': {'read_only': True},
            'is_superuser': {'read_only': True}
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            pseudo=validated_data['pseudo'],
            password=validated_data['password']
        )
        return user
