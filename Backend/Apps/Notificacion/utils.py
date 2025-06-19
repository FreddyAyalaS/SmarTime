from django.core.mail import EmailMessage
from django.template.loader import render_to_string
from datetime import date


def enviar_recordatorio_actividades(usuario, actividades):
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
    email.send()
