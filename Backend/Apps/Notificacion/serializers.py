from rest_framework import serializers
from .models import Tarea, Clase, Estudio, ActividadNoAcademica


class TareaSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tarea
        fields = "__all__"


class ClaseSerializer(serializers.ModelSerializer):
    class Meta:
        model = Clase
        fields = "__all__"


class EstudioSerializer(serializers.ModelSerializer):
    class Meta:
        model = Estudio
        fields = "__all__"


class ActividadNoAcademicaSerializer(serializers.ModelSerializer):
    class Meta:
        model = ActividadNoAcademica
        fields = "__all__"
