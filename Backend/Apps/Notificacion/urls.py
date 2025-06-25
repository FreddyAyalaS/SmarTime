from django.urls import path
from .views import (
    enviar_recordatorios,
    notificar_tareas_fin,
    notificar_tareas_pendientes,
)

urlpatterns = [
    path("probar-correo/", enviar_recordatorios),
    path("correo-expiracion/", notificar_tareas_fin),
    path("correo-pendientes/", notificar_tareas_pendientes),
]
