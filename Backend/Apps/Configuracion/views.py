from django.shortcuts import render

# Create your views here.
from rest_framework import generics, permissions, status
from rest_framework.response import Response
from .serializers import PerfilUsuarioSerializer
from .serializers import CambiarContrasenaSerializer


#  Vista para obtener y actualizar perfil
class PerfilUsuarioAPIView(generics.RetrieveUpdateAPIView):
    serializer_class = PerfilUsuarioSerializer
    permission_classes = [permissions.IsAuthenticated]

    def get_object(self):
        return self.request.user


#  Vista para cambiar contraseña
class CambiarContrasenaAPIView(generics.GenericAPIView):
    serializer_class = CambiarContrasenaSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data, context={'request': request})
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"detail": "La contraseña ha sido cambiada correctamente."}, status=status.HTTP_200_OK)
