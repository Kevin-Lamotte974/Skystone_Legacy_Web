from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import UserSerializer
from django.contrib.admin.views.decorators import staff_member_required
from django.shortcuts import render, redirect
from django.contrib.auth import get_user_model
from django.contrib.auth.decorators import login_required
from django.http import HttpResponseForbidden
from rest_framework_simplejwt.authentication import JWTAuthentication
from .models import User

# Create your views here.

@api_view(['POST'])
@permission_classes([AllowAny])
def register(request):
    serializer = UserSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': serializer.data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        }, status=status.HTTP_201_CREATED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['POST'])
@permission_classes([AllowAny])
def login(request):
    email = request.data.get('email')
    password = request.data.get('password')  # Utilisation de 'password' au lieu de 'motDePasse'
    
    if not email or not password:
        return Response({'error': 'Veuillez fournir un email et un mot de passe'}, 
                      status=status.HTTP_400_BAD_REQUEST)
    
    user = authenticate(username=email, password=password)
    
    if user:
        refresh = RefreshToken.for_user(user)
        return Response({
            'user': UserSerializer(user).data,
            'refresh': str(refresh),
            'access': str(refresh.access_token),
        })
    return Response({'error': 'Identifiants invalides'}, 
                   status=status.HTTP_401_UNAUTHORIZED)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def profile(request):
    user = request.user
    return Response({
        'pseudo': user.pseudo,
        'email': user.email,
        'level': getattr(user, 'level', 1),
        'roles': [{'name': role.name} for role in user.roles.all()]  # Ajout des rôles
    })

# Vues d'administration
@api_view(['GET'])
def admin_dashboard(request):
    # Essayer de récupérer le token de l'URL ou de l'en-tête
    token = request.GET.get('Authorization', '').replace('Bearer ', '') or \
            request.headers.get('Authorization', '').replace('Bearer ', '')
    
    if not token:
        return HttpResponseForbidden("Token non fourni")
    
    try:
        # Valider le token
        jwt_auth = JWTAuthentication()
        validated_token = jwt_auth.get_validated_token(token)
        user = jwt_auth.get_user(validated_token)
        
        if not user.roles.filter(name__in=['admin', 'admin_dev']).exists():
            return HttpResponseForbidden("Accès non autorisé")
        
        context = {
            'total_users': User.objects.count(),
            'total_collections': 0,
            'total_stories': 0,
            'active_services': 0,
            'recent_users': User.objects.all()[:5],
            'user': {
                'username': user.username,
                'email': user.email,
                'roles': [role.name for role in user.roles.all()]
            }
        }
        return render(request, 'authentication/admin/dashboard.html', context)
    except Exception as e:
        return HttpResponseForbidden(str(e))

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def admin_users_list(request):
    if not request.user.roles.filter(name__in=['admin', 'admin_dev']).exists():
        return Response({'error': 'Accès non autorisé'}, status=status.HTTP_403_FORBIDDEN)
    
    users = User.objects.all()
    return Response({
        'users': UserSerializer(users, many=True).data
    })

@api_view(['GET', 'PUT'])
@permission_classes([IsAuthenticated])
def admin_user_edit(request, user_id):
    if not request.user.roles.filter(name__in=['admin', 'admin_dev']).exists():
        return Response({'error': 'Accès non autorisé'}, status=status.HTTP_403_FORBIDDEN)
    
    try:
        user = User.objects.get(id=user_id)
    except User.DoesNotExist:
        return Response({'error': 'Utilisateur non trouvé'}, status=status.HTTP_404_NOT_FOUND)
    
    if request.method == 'GET':
        return Response(UserSerializer(user).data)
    elif request.method == 'PUT':
        serializer = UserSerializer(user, data=request.data, partial=True)
        if serializer.is_valid():
            serializer.save()
            return Response(serializer.data)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)
