from rest_framework import serializers
from .models import User, Role

class RoleSerializer(serializers.ModelSerializer):
    class Meta:
        model = Role
        fields = ['name', 'description']

class UserSerializer(serializers.ModelSerializer):
    role = serializers.CharField(read_only=True)
    roles = RoleSerializer(many=True, read_only=True)
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ['id', 'email', 'pseudo', 'password', 'role', 'roles', 'level', 'date_joined', 'is_active']
        read_only_fields = ['id', 'date_joined', 'is_active']
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            pseudo=validated_data['pseudo'],
            password=validated_data['password']
        )
        return user
