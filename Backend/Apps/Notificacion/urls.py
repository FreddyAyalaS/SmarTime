from django.urls import path
from .views import (
    enviar_recordatorios,
    notificar_actividades_fin,
    notificar_actividades_pendientes,
)

urlpatterns = [
    path("probar-correo/", enviar_recordatorios),
    path("correo-expiracion/", notificar_actividades_fin),
    path("correo-pendientes/", notificar_actividades_pendientes),
]
