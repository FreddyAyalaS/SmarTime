# serializers.py
from rest_framework import serializers
from Apps.Autenticacion.models import UsuarioPersonalizado

class ConfiguracionUsuarioSerializer(serializers.ModelSerializer):
    modo_antiprocrastinacion = serializers.BooleanField(required=False)
    urls_bloqueadas = serializers.ListField(child=serializers.CharField(), required=False)

    class Meta:
        model = UsuarioPersonalizado
        fields = ['modo_antiprocrastinacion', 'urls_bloqueadas']

    def update(self, instance, validated_data):
        if 'modo_antiprocrastinacion' in validated_data:
            instance.modo_antiprocrastinacion = validated_data['modo_antiprocrastinacion']
            instance.tiempo_activado = timezone.now() if validated_data['modo_antiprocrastinacion'] else None
        if 'urls_bloqueadas' in validated_data:
            instance.urls_bloqueadas = validated_data['urls_bloqueadas']
        instance.save()
        return instance
