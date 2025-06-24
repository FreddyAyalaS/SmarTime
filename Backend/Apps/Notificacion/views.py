from collections import defaultdict
from django.http import JsonResponse
from .models import Actividad
from .utils import (
    enviar_recordatorios_actividades,
    enviar_recordatorios_expiracion,
    enviar_recordatorios_pendientes,
)
from django.utils.timezone import localtime, now, make_aware
from datetime import date, datetime, timedelta


def enviar_recordatorios(request):
    hoy = date.today()

    actividades = Actividad.objects.select_related("usuario").filter(fecha=hoy)

    if not actividades:
        return JsonResponse({"mensaje": "No hay actividades para hoy."})

    actividades_por_usuario = defaultdict(list)
    for actividad in actividades:
        actividades_por_usuario[actividad.usuario].append(actividad)

    if actividades_por_usuario:
        enviar_recordatorios_actividades(actividades_por_usuario)

    return JsonResponse(
        {
            "mensaje": f"Se enviaron recordatorios a {len(actividades_por_usuario)} usuario(s).",
        }
    )


def notificar_actividades_fin(request):
    ahora = localtime(now()).replace(second=0, microsecond=0)
    hoy = ahora.date()

    actividades = Actividad.objects.select_related("usuario").filter(fecha=hoy)

    if not actividades:
        return JsonResponse({"mensaje": "No hay actividades para hoy."})

    usuarios_actividades = []

    for actividad in actividades:
        hora_actividad = actividad.hora_fin.replace(second=0, microsecond=0)
        fecha_actividad = hoy

        if hora_actividad < ahora.time():
            fecha_actividad = hoy + timedelta(days=1)

        hora_fin_datetime = make_aware(
            datetime.combine(fecha_actividad, hora_actividad)
        )
        diferencia = hora_fin_datetime - ahora

        if diferencia == timedelta(hours=2):
            usuarios_actividades.append((actividad.usuario, actividad))

    if usuarios_actividades:
        enviar_recordatorios_expiracion(usuarios_actividades)

    return JsonResponse(
        {"mensaje": f"{len(usuarios_actividades)} recordatorio(s) enviado(s)."}
    )


def notificar_actividades_pendientes(request):
    actividades = Actividad.objects.select_related("usuario").filter(estado="pendiente")

    if not actividades:
        return JsonResponse({"mensaje": "No hay actividades pendientes para hoy."})

    actividades_por_usuario = defaultdict(list)
    for actividad in actividades:
        actividades_por_usuario[actividad.usuario].append(actividad)

    enviar_recordatorios_pendientes(actividades_por_usuario)

    return JsonResponse(
        {
            "mensaje": f"Se enviaron recordatorios de actividades pendientes a {len(actividades_por_usuario)} usuario(s).",
        }
    )
