from django.db import models


class Usuario(models.Model):
    nombre = models.CharField(max_length=100)
    correo = models.EmailField(unique=True)
    contraseña = models.CharField(max_length=100)
    score = models.BigIntegerField(default=0)
    notificacion = models.BooleanField(default=False)
    sugerencia = models.BooleanField(default=False)

    def __str__(self):
        return self.nombre


class Tarea(models.Model):
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="tareas"
    )
    titulo = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    fechaEntrega = models.DateField()
    horaEntrega = models.TimeField()
    fechaRealizacion = models.DateField()
    horaInicio = models.TimeField()
    horaFin = models.TimeField()
    complejidad = models.IntegerField()
    estado = models.CharField(
        max_length=20,
        choices=[
            ("pendiente", "Pendiente"),
            ("en proceso", "En Proceso"),
            ("completada", "Completada"),
            ("cancelada", "Cancelada"),
        ],
        default="pendiente",
    )

    def __str__(self):
        return f"{self.titulo} - {self.usuario.nombre}"


class Clase(models.Model):
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="clases"
    )
    curso = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    fecha = models.DateField()
    horaInicio = models.TimeField()
    horaFin = models.TimeField()
    repetir = models.BooleanField(
        default=False
    )  # Solo se activa si el usuario marcó "Repetir"
    semanas = models.IntegerField(
        null=True, blank=True
    )  # Solo se activa si repetir=True

    def __str__(self):
        return f"{self.curso} - Clase de {self.usuario.nombre}"


class Estudio(models.Model):
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="estudios"
    )
    titulo = models.CharField(max_length=100)
    curso = models.CharField(max_length=100)
    temas = models.TextField(blank=True)
    fecha = models.DateField()
    horaInicio = models.TimeField()
    horaFin = models.TimeField()

    def __str__(self):
        return f"{self.titulo} - Estudio de {self.usuario.nombre}"


class ActividadNoAcademica(models.Model):
    usuario = models.ForeignKey(
        Usuario, on_delete=models.CASCADE, related_name="actividades_no_academicas"
    )
    titulo = models.CharField(max_length=100)
    descripcion = models.TextField(blank=True)
    fecha = models.DateField()
    horaInicio = models.TimeField()
    horaFin = models.TimeField()
    repetir = models.BooleanField(
        default=False
    )  # Solo se activa si el usuario marcó "Repetir"
    semanas = models.IntegerField(
        null=True, blank=True
    )  # Solo se activa si repetir=True

    def __str__(self):
        return f"{self.titulo} - {self.usuario}"
