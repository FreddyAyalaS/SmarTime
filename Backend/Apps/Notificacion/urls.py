from django.urls import path
from .views import enviar_recordatorios

urlpatterns = [
    path("probar-correo/", enviar_recordatorios),
]
