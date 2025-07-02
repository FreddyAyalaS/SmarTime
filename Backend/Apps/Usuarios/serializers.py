from rest_framework import serializers
from Apps.Autenticacion.models import UsuarioPersonalizado

class UsuarioPersonalizadoSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioPersonalizado
        fields = [
            'id',
            'username',
            'first_name',
            'last_name',
            'email',
            'fecha_nacimiento',
            'escuela_profesional',
        ]