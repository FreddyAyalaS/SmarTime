from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import PerfilUsuarioSerializer
from .serializers import CambiarContrasenaSerializer
from .serializers import ConfiguracionUsuarioSerializer
from django.utils import timezone


#  Vista para obtener y actualizar perfil
class PerfilUsuarioAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = PerfilUsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user

#Notificaciones y sugerencias 
class ConfiguracionUsuarioAPIView(generics.UpdateAPIView):
    serializer_class = ConfiguracionUsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        # Usamos el usuario autenticado para actualizar sus preferencias
        return self.request.user

    def patch(self, request, *args, **kwargs):
        # Limpiar los datos entrantes: eliminamos el campo 'email'
        request_data = request.data.copy()
        if 'email' in request_data:
            del request_data['email']

        # Pasamos los datos limpiados al serializer
        serializer = self.get_serializer(data=request_data)
        serializer.is_valid(raise_exception=True)

        # Actualizamos el usuario con los datos validados
        user = self.get_object()
        serializer.update(user, serializer.validated_data)

        return Response({"detail": "Configuración de usuario actualizada correctamente."}, status=status.HTTP_200_OK)


#  Vista para cambiar contraseña
class CambiarContrasenaAPIView(generics.GenericAPIView):
    serializer_class = CambiarContrasenaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "La contraseña ha sido cambiada correctamente."}, status=status.HTTP_200_OK)
