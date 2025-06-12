from django.db import models
from django.contrib.auth import get_user_model

# Create your models here.
class ActividadAcademica(models.Model):
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="actividades_academicas")
    titulo = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    fechaInicio = models.DateField()
    horaInicio = models.TimeField()
    duracion = models.TimeField()
    complejidad = models.IntegerField()

    def __str__(self):
        return f"{self.titulo} - {self.usuario}"
    
    
class ActividadNoAcademica(models.Model):
    usuario = models.ForeignKey(get_user_model(), on_delete=models.CASCADE, related_name="actividades_no_academicas")
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    fecha = models.DateField()
    horaInicio = models.TimeField()
    duracion = models.TimeField()

    def __str__(self):
        return f"{self.titulo} - {self.usuario}"
