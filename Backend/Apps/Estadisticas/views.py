from datetime import timedelta
from django.utils.timezone import now
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated

from Apps.Calendario.models import Tarea


class EstadoTareasView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        hoy = now().date()
        inicio_semana = hoy - timedelta(days=hoy.weekday())  # lunes
        fin_semana = inicio_semana + timedelta(days=6)  # domingo

        tareas = Tarea.objects.filter(usuario=request.user)

        contador = {
            "por_hacer": 0,
            "en_proceso_dentro_fecha": 0,
            "en_proceso_fuera_fecha": 0,
            "finalizado_dentro_fecha": 0,
            "finalizado_fuera_fecha": 0,
        }

        for tarea in tareas:
            estado = tarea.estado  # ahora accedes directamente
            fecha_entrega = tarea.fechaEntrega

            print(
                f"Tarea: {tarea.titulo}, Estado: {estado}, Fecha entrega: {fecha_entrega}"
            )

            if not estado or estado == "pendiente":
                if inicio_semana <= fecha_entrega <= fin_semana:
                    contador["por_hacer"] += 1
                elif fecha_entrega < hoy:
                    contador["en_proceso_fuera_fecha"] += 1

            elif estado in ["inicio", "en_desarrollo"]:
                if fecha_entrega < hoy:
                    contador["en_proceso_fuera_fecha"] += 1
                else:
                    contador["en_proceso_dentro_fecha"] += 1

            elif estado in ["finalizado", "entregado"]:
                print(f"Estado terminado: {tarea}")
                if fecha_entrega >= hoy:
                    contador["finalizado_dentro_fecha"] += 1
                else:
                    contador["finalizado_fuera_fecha"] += 1

        total = sum(contador.values()) or 1  # evitar división por cero

        resultado = {
            clave: f"{(valor / total) * 100:.1f}%" for clave, valor in contador.items()
        }

        print(f"Resultado: {resultado}")
        return Response(resultado)
