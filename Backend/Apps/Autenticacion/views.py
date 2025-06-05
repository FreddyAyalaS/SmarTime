# Create your views here.

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from .serializers import RegistroUsuarioSerializer, PasswordResetRequestSerializer, SetNewPasswordSerializer
from .models import UsuarioPersonalizado
from rest_framework.permissions import AllowAny

from django.contrib.auth.tokens import PasswordResetTokenGenerator
from django.utils.encoding import force_bytes, force_str
from django.utils.http import urlsafe_base64_encode, urlsafe_base64_decode

class RegistroUsuarioAPIView(APIView):
    def post(self, request):
        serializer = RegistroUsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Usuario creado"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUsuarioAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        usuario = authenticate(username=username, password=password)
        if usuario:
            refresh = RefreshToken.for_user(usuario)
            return Response({
                "mensaje": "Login exitoso",
                "access": str(refresh.access_token),
                "refresh": str(refresh),
            }, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)

class LogoutUsuarioAPIView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        try:
            # Logout con simplejwt y blacklist
            refresh_token = request.data.get('refresh')
            token = RefreshToken(refresh_token)
            token.blacklist()
            return Response({"mensaje": "Logout exitoso"}, status=status.HTTP_200_OK)
        except Exception as e:
            return Response({"error": f"No se pudo cerrar sesión: {str(e)}"}, status=status.HTTP_400_BAD_REQUEST)


class PasswordResetRequestAPIView(APIView):
    permission_classes = [AllowAny]
    def post(self, request):
        serializer = PasswordResetRequestSerializer(data=request.data)
        if serializer.is_valid():
            email = serializer.validated_data['email']
            try:
                user = UsuarioPersonalizado.objects.get(email=email)
            except UsuarioPersonalizado.DoesNotExist:
                return Response({"error": "No existe usuario con ese correo"}, status=status.HTTP_400_BAD_REQUEST)

            token_generator = PasswordResetTokenGenerator()
            token = token_generator.make_token(user)
            uidb64 = urlsafe_base64_encode(force_bytes(user.pk))

            # Aquí simulas el envío por email mostrando el link en consola
            reset_link = f"http://localhost:3000/reset-password/{uidb64}/{token}/"
            print(f"Link de restablecimiento de contraseña: {reset_link}")

            return Response({"mensaje": "Se ha enviado un enlace para restablecer la contraseña (revisar consola)."}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class SetNewPasswordAPIView(APIView):
    permission_classes = [AllowAny] #Solo usuarios no autenticados
    def post(self, request):
        serializer = SetNewPasswordSerializer(data=request.data)
        if serializer.is_valid():
            password = serializer.validated_data['password']
            token = serializer.validated_data['token']
            uidb64 = serializer.validated_data['uidb64']

            try:
                uid = force_str(urlsafe_base64_decode(uidb64))
                user = UsuarioPersonalizado.objects.get(pk=uid)
            except (TypeError, ValueError, OverflowError, UsuarioPersonalizado.DoesNotExist):
                return Response({"error": "UID inválido"}, status=status.HTTP_400_BAD_REQUEST)

            token_generator = PasswordResetTokenGenerator()
            if not token_generator.check_token(user, token):
                return Response({"error": "Token inválido o expirado"}, status=status.HTTP_400_BAD_REQUEST)

            if user.check_password(password):
                return Response({"error": "La nueva contraseña no puede ser igual a la anterior."}, status=status.HTTP_400_BAD_REQUEST)

            user.set_password(password)
            user.save()
            return Response({"mensaje": "Contraseña actualizada con éxito"}, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)





















'''from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import UsuarioPersonalizado
from .serializers import RegistroUsuarioSerializer

class RegistroUsuarioAPIView(APIView):
    def post(self, request):
        serializer = RegistroUsuarioSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"mensaje": "Usuario creado"}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class LoginUsuarioAPIView(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        usuario = authenticate(username=username, password=password)
        if usuario:
            return Response({"mensaje": "Login exitoso"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)
'''



















'''from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate
from .models import UsuarioPersonalizado


class RegistroUsuario(APIView):
    def post(self, request):
        first_name = request.data.get('first_name')
        username = request.data.get('username')
        password = request.data.get('password')
        email = request.data.get('email')
        fecha_nacimiento = request.data.get('fecha_nacimiento')
        escuela_profesional = request.data.get('escuela_profesional')

        if UsuarioPersonalizado.objects.filter(username=username).exists():
            return Response({"error": "El usuario ya existe"}, status=status.HTTP_400_BAD_REQUEST)

        usuario = UsuarioPersonalizado.objects.create_user(
            first_name=first_name,
            username=username, 
            password=password,
            email=email,
            fecha_nacimiento=fecha_nacimiento,
            escuela_profesional=escuela_profesional
        )
        return Response({"mensaje": "Usuario creado"}, status=status.HTTP_201_CREATED)

class LoginUsuario(APIView):
    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        usuario = authenticate(username=username, password=password)
        if usuario:
            # Aquí podrías crear y devolver un token o solo un mensaje
            return Response({"mensaje": "Login exitoso"}, status=status.HTTP_200_OK)
        else:
            return Response({"error": "Credenciales incorrectas"}, status=status.HTTP_401_UNAUTHORIZED)
'''