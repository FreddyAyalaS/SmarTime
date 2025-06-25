from Apps.Notificacion.models import (
    Usuario,
    Tarea,
    Clase,
    Estudio,
    ActividadNoAcademica,
)
from datetime import date, time, timedelta

# Crear 5 usuarios
usuarios = []
for i in range(1, 3):
    usuario = Usuario.objects.create(
        nombre=f"Usuario {i}", correo=f"usuario{i}@example.com", contraseña="123456"
    )
    usuarios.append(usuario)

# Fechas base
hoy = date.today()
hora_base = time(9, 0)

# Crear 5 tareas por usuario
for u in usuarios:
    for i in range(1, 6):
        Tarea.objects.create(
            usuario=u,
            titulo=f"Tarea {i} de {u.nombre}",
            curso=f"Curso {i}",
            descripcion=f"Descripción de la tarea {i}",
            fechaEntrega=hoy + timedelta(days=i),
            horaEntrega=time(23, 59),
            fechaRealizacion=hoy,
            horaInicio=time(14, 0),
            horaFin=time(15, 0),
            complejidad=i,
        )

# Crear 5 clases por usuario
for u in usuarios:
    for i in range(1, 6):
        Clase.objects.create(
            usuario=u,
            curso=f"Curso Clase {i}",
            descripcion=f"Descripción clase {i}",
            fecha=hoy,
            horaInicio=time(8 + i, 0),
            horaFin=time(9 + i, 0),
            repetir=(i % 2 == 0),
            semanas=i if i % 2 == 0 else None,
        )

# Crear 5 sesiones de estudio por usuario
for u in usuarios:
    for i in range(1, 6):
        Estudio.objects.create(
            usuario=u,
            titulo=f"Estudio {i}",
            curso=f"Curso Estudio {i}",
            temas=f"Temas {i}",
            fecha=hoy,
            horaInicio=time(10 + i, 0),
            horaFin=time(11 + i, 0),
        )

# Crear 5 actividades no académicas por usuario
for u in usuarios:
    for i in range(1, 6):
        ActividadNoAcademica.objects.create(
            usuario=u,
            titulo=f"Actividad No Académica {i}",
            descripcion=f"Descripción {i}",
            fecha=hoy,
            horaInicio=time(17 + i, 0),
            horaFin=time(18 + i, 0),
            repetir=(i % 2 == 1),
            semanas=i if i % 2 == 1 else None,
        )

print("✅ Se cargaron los datos de prueba.")
