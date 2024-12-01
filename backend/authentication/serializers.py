from rest_framework import serializers
from .models import User

class UserSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only=True)
    
    class Meta:
        model = User
        fields = ('id', 'email', 'pseudo', 'password', 'date_joined')
        extra_kwargs = {
            'password': {'write_only': True},
            'date_joined': {'read_only': True}
        }
    
    def create(self, validated_data):
        user = User.objects.create_user(
            email=validated_data['email'],
            pseudo=validated_data['pseudo'],
            password=validated_data['password']
        )
        return user
