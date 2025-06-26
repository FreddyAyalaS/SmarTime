from rest_framework import serializers
from .models import Tarea, Clase, Estudio, ActividadNoAcademica

class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = '__all__'
        read_only_fields = ['usuario']

class TareaResumenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = ['horaInicio', 'horaFin', 'titulo', 'usuario']
        read_only_fields = ['usuario']


class ClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clase
        fields = '__all__'
        read_only_fields = ['usuario']
        
class ClaseResumenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clase
        fields = ['horaInicio', 'horaFin', 'curso', 'usuario']
        read_only_fields = ['usuario']        


class EstudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudio
        fields = '__all__'
        read_only_fields = ['usuario']

class EstudioResumenSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudio
        fields = ['horaInicio', 'horaFin', 'titulo', 'usuario']
        read_only_fields = ['usuario']

class ActividadNoAcademicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadNoAcademica
        fields = '__all__'
        read_only_fields = ['usuario']

class ActividadNoAcademicaResumenSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadNoAcademica
        fields = ['horaInicio', 'horaFin', 'titulo', 'usuario']
        read_only_fields = ['usuario']

