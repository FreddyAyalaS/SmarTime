from rest_framework import serializers
from django.contrib.auth import authenticate
from Apps.Autenticacion.models import UsuarioPersonalizado
from Apps.Autenticacion.serializers import criterios_password



# Serializer para actualizar las preferencias de notificación y sugerencia
class ConfiguracionUsuarioSerializer(serializers.ModelSerializer):
    notificacion = serializers.BooleanField(required=False)  # Cambiar el estado de las notificaciones
    sugerencia = serializers.BooleanField(required=False)    # Cambiar el estado de las sugerencias

    class Meta:
        model = UsuarioPersonalizado  # Usamos el modelo de usuario personalizado
        fields = ['notificacion', 'sugerencia']  # Solo los campos relevantes

    def validate(self, data):
        # Asegúrate de que `email` no esté presente en los datos de actualización
        if 'email' in data:
            raise serializers.ValidationError({"email": "El campo 'email' no se puede actualizar aquí."})
        return data


class CambiarContrasenaSerializer(serializers.Serializer):
    contrasena_actual = serializers.CharField(write_only=True)
    nueva_contrasena = serializers.CharField(write_only=True)
    confirmar_nueva_contrasena = serializers.CharField(write_only=True)

    def validate(self, data):
        user = self.context['request'].user
        contrasena_actual = data.get('contrasena_actual')
        nueva_contrasena = data.get('nueva_contrasena')
        confirmar_nueva_contrasena = data.get('confirmar_nueva_contrasena')

        if not user.check_password(contrasena_actual):
            raise serializers.ValidationError({"contrasena_actual": "La contraseña actual es incorrecta."})

        if nueva_contrasena != confirmar_nueva_contrasena:
            raise serializers.ValidationError({"confirmar_nueva_contrasena": "Las contraseñas no coinciden."})

        criterios_password(nueva_contrasena)  # Valida seguridad de la nueva contraseña

        return data

    def save(self, **kwargs):
        user = self.context['request'].user
        user.set_password(self.validated_data['nueva_contrasena'])
        user.save()
        return user

#Perfil de usuario (sin contraseña)
class PerfilUsuarioSerializer(serializers.ModelSerializer):
    class Meta:
        model = UsuarioPersonalizado
        fields = ['first_name', 'username', 'email', 'fecha_nacimiento', 'escuela_profesional']

    def validate_email(self, value):
        if not value.endswith('@unmsm.edu.pe'):
            raise serializers.ValidationError("El correo debe ser institucional (UNMSM)")
        return value