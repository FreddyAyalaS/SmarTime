from .models import Actividad
from django.http import HttpResponse
from .utils import enviar_recordatorio_actividades
from .models import Usuario
import datetime


def test_email(request):
    usuario = Usuario.objects.first()
    actividades = Actividad.objects.filter(usuario=usuario, fecha=datetime.date.today())
    if actividades:
        enviar_recordatorio_actividades(usuario, actividades)
        return HttpResponse("Correo enviado")
    return HttpResponse("No hay actividades para hoy")
