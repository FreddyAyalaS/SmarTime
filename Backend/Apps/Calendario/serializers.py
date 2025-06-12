from rest_framework import serializers
from .models import ActividadAcademica, ActividadNoAcademica

class ActividadAcademicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadAcademica
        fields = '__all__'
        read_only_fields = ['usuario']

class ActividadNoAcademicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadNoAcademica
        fields = '__all__'
        read_only_fields = ['usuario']

