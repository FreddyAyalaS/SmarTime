from django.db import models


class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=100)
    score = models.BigIntegerField(default=0)

    def __str__(self):
        return self.nombre


class Actividad(models.Model):

    TIPO_CHOICES = [
        ("tarea", "Tarea"),
        ("estudio", "Estudio"),
        ("evento", "Evento"),
        ("act. no académica", "Act. no académica"),
    ]

    ESTADO_CHOICES = [
        ("pendiente", "Pendiente"),
        ("completada", "Completada"),
    ]

    tipo = models.CharField(max_length=20, choices=TIPO_CHOICES)
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField()
    estado = models.CharField(max_length=20, choices=ESTADO_CHOICES)
    fecha = models.DateField()
    hora_ini = models.TimeField()
    hora_fin = models.TimeField()
    usuario = models.ForeignKey(Usuario, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.titulo} ({self.fecha_ini})"
