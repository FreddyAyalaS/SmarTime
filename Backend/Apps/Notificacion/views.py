from collections import defaultdict
from django.http import JsonResponse
from .models import Actividad
from .utils import enviar_recordatorio_actividades
import datetime


def enviar_recordatorios(request):
    hoy = datetime.date.today()

    actividades = Actividad.objects.select_related("usuario").filter(fecha=hoy)

    actividades_por_usuario = defaultdict(list)
    for actividad in actividades:
        actividades_por_usuario[actividad.usuario].append(actividad)

    usuarios_notificados = []

    for usuario, actividades_usuario in actividades_por_usuario.items():
        enviar_recordatorio_actividades(usuario, actividades_usuario)

        usuarios_notificados.append(
            {
                "id": usuario.id,
                "nombre": usuario.nombre,
                "correo": usuario.correo,
                "cantidad_actividades": len(actividades_usuario),
            }
        )

    if usuarios_notificados:
        return JsonResponse(
            {
                "mensaje": f"Se enviaron recordatorios a {len(usuarios_notificados)} usuario(s).",
                "usuarios": usuarios_notificados,
            }
        )
    else:
        return JsonResponse({"mensaje": "No hay actividades para hoy."}, status=404)
