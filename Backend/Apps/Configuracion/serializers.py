from rest_framework import serializers
from django.contrib.auth import authenticate
from Apps.Autenticacion.models import UsuarioPersonalizado
from Apps.Autenticacion.serializers import criterios_password
from django.utils import timezone
from Apps.Notificacion.utils import (
    enviar_recordatorios_tareas,
    enviar_recordatorios_expiracion,
    enviar_recordatorios_pendientes,
    sugerencia_actividad,
)

# Serializer para actualizar las preferencias de notificación y sugerencia
class ConfiguracionUsuarioSerializer(serializers.ModelSerializer):
    notificacion = serializers.BooleanField(required=False)  # Cambiar el estado de las notificaciones
    sugerencia = serializers.BooleanField(required=False)    # Cambiar el estado de las sugerencias
    modo_antiprocrastinacion = serializers.BooleanField(required=False)  # Activar o desactivar el modo anti-procrastinación

    class Meta:
        model = UsuarioPersonalizado  # Usamos el modelo de usuario personalizado
        fields = ['notificacion', 'sugerencia','modo_antiprocrastinacion', 'tiempo_activado']  # Solo los campos relevantes

    def validate(self, data):
        # Asegúrate de que `email` no esté presente en los datos de actualización
        if 'email' in data:
            raise serializers.ValidationError({"email": "El campo 'email' no se puede actualizar aquí."})
        return data

    def update(self, instance, validated_data):
        """Actualizamos el objeto UsuarioPersonalizado con los datos validados"""
        # Si se activa el modo anti-procrastinación, debemos guardar el tiempo de activación
        if validated_data.get('modo_antiprocrastinacion') is not None:
            if validated_data['modo_antiprocrastinacion']:
                validated_data['tiempo_activado'] = timezone.now()  # Establecer la fecha y hora de activación
            else:
                validated_data['tiempo_activado'] = None  # Vaciar el tiempo si se desactiva

        # Actualizar las preferencias
        updated_instance = super().update(instance, validated_data)
        # Obtener las tareas del usuario
        actividades_usuario = updated_instance.tareas.all()
        # Si las notificaciones están activadas, enviamos las notificaciones
        if updated_instance.notificacion:
            if actividades_usuario:
                usuario_actividades = {updated_instance: actividades_usuario}
                enviar_recordatorios_tareas(usuario_actividades)
                print("Envie la notificación")
            else:
                print("Error: updated_instance no es una instancia de UsuarioPersonalizado")    

        # Si las sugerencias están activadas, enviamos las sugerencias
        if updated_instance.sugerencia:
            for tarea in actividades_usuario:
                sugerencia_actividad(updated_instance, tarea)  # Evaluar la actividad
                print("Envie la sugerencia")

        return updated_instance


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