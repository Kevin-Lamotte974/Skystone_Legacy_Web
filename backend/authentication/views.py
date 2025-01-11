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
    password = request.data.get('password')
    
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
        'level': getattr(user, 'level', 1)  # Valeur par défaut de 1 si level n'existe pas
    })

# Vues d'administration
def admin_dashboard(request):
    context = {
        'total_users': 0,
        'total_collections': 0,
        'total_stories': 0,
        'active_services': 0,
        'recent_users': []
    }
    return render(request, 'authentication/admin/dashboard.html', context)

def admin_users_list(request):
    context = {
        'users': []
    }
    return render(request, 'authentication/admin/users.html', context)

def admin_user_edit(request, user_id):
    context = {
        'user': {
            'id': user_id,
            'email': 'exemple@email.com',
            'pseudo': 'Exemple Utilisateur'
        }
    }
    return render(request, 'authentication/admin/user_edit.html', context)


# def admin_login(request):
#     if request.method == 'POST':
#         email = request.POST.get('email')
#         password = request.POST.get('password')
#         user = authenticate(username=email, password=password)
#         if user is not None and user.is_staff:
#             auth_login(request, user)
#             return redirect('admin_dashboard')
#         else:
#             return render(request, 'authentication/admin/login.html', {
#                 'error': 'Email ou mot de passe incorrect'
#             })
#     return render(request, 'authentication/admin/login.html')
