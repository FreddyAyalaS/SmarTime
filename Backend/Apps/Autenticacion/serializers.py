from rest_framework import serializers
from rest_framework.validators import UniqueValidator
from .models import UsuarioPersonalizado

class RegistroUsuarioSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
        validators=[UniqueValidator(queryset=UsuarioPersonalizado.objects.all(), message="Este correo ya está en uso.")]
    )
    username = serializers.CharField(
        validators=[UniqueValidator(queryset=UsuarioPersonalizado.objects.all(), message="Este nombre de usuario ya existe.")]
    )    
    
    class Meta:
        model = UsuarioPersonalizado
        fields = ['first_name', 'username', 'password', 'email', 'fecha_nacimiento', 'escuela_profesional']
        extra_kwargs = {
            'password': {'write_only': True}
        }

    def validate_email(self, value):
        # Validar que el correo termine con @unmsm.edu.pe
        if not value.endswith('@unmsm.edu.pe'):
            raise serializers.ValidationError("El correo debe ser institucional (UNMSM)")
        return value
    
    def validate(self, data):
        required_fields = ['first_name', 'username', 'password', 'email', 'fecha_nacimiento', 'escuela_profesional']
        for field in required_fields:
            if not data.get(field):
                raise serializers.ValidationError({field: 'Este campo es obligatorio.'})
        return data

    def create(self, validated_data):
        user = UsuarioPersonalizado.objects.create_user(**validated_data)
        return user


class PasswordResetRequestSerializer(serializers.Serializer):
    email = serializers.EmailField()

class SetNewPasswordSerializer(serializers.Serializer):
    password = serializers.CharField(min_length=6, max_length=128, write_only=True)
    token = serializers.CharField(write_only=True)
    uidb64 = serializers.CharField(write_only=True)
