from django.core.mail import EmailMessage, get_connection
from django.template.loader import render_to_string
from datetime import date


def enviar_recordatorios_actividades(usuario_actividades):
    connection = get_connection()
    connection.open()

    emails = []
    for usuario, actividades in usuario_actividades.items():
        subject = f"Tus actividades para hoy ({date.today().strftime('%d/%m/%Y')})"
        message = render_to_string(
            "recordatorio.html",
            {
                "nombre": usuario.nombre,
                "actividades": actividades,
            },
        )
        email = EmailMessage(subject, message, to=[usuario.correo])
        email.content_subtype = "html"
        emails.append(email)

    connection.send_messages(emails)
    connection.close()


def enviar_recordatorios_expiracion(usuarios_actividades):
    connection = get_connection()
    connection.open()

    emails = []
    for usuario, actividad in usuarios_actividades:
        subject = f"⏰ Recordatorio: Actividad '{actividad.titulo}' por terminar"
        message = render_to_string(
            "expiracion.html",
            {
                "nombre": usuario.nombre,
                "titulo": actividad.titulo,
                "hora_fin": actividad.hora_fin,
            },
        )
        email = EmailMessage(subject, message, to=[usuario.correo])
        email.content_subtype = "html"
        email.connection = connection
        emails.append(email)

    connection.send_messages(emails)
    connection.close()


def enviar_recordatorios_pendientes(usuario_actividades):
    connection = get_connection()
    connection.open()

    emails = []
    for usuario, actividades in usuario_actividades.items():
        subject = f"Tareas no completadas ({date.today().strftime('%d/%m/%Y')})"
        message = render_to_string(
            "actIncompleta.html",
            {
                "nombre": usuario.nombre,
                "actividades": actividades,
            },
        )
        email = EmailMessage(subject, message, to=[usuario.correo])
        email.content_subtype = "html"
        emails.append(email)

    connection.send_messages(emails)
    connection.close()
