from rest_framework import permissions, status
from .models import EstadoTarea
from Apps.Calendario.models import Tarea
from rest_framework.views import APIView
from rest_framework.response import Response

class ActualizarEstadoPorTareaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, tarea_id):
        try:
            tarea = Tarea.objects.get(pk=tarea_id, usuario=request.user)
        except Tarea.DoesNotExist:
            return Response({'error': 'Tarea no encontrada'}, status=status.HTTP_404_NOT_FOUND)

        nuevo_estado = request.data.get("estado")
        if nuevo_estado not in dict(EstadoTarea.ESTADOS):
            return Response({'error': 'Estado no válido'}, status=400)

        estado_tarea, creado = EstadoTarea.objects.get_or_create(tarea=tarea)

        # Validar el orden lógico de los estados
        orden = ['inicio', 'en_desarrollo', 'finalizado', 'entregado']
        actual = estado_tarea.estado
        idx_actual = orden.index(actual) if actual in orden else -1
        idx_nuevo = orden.index(nuevo_estado)

        if idx_nuevo == idx_actual + 1:
            estado_tarea.estado = nuevo_estado
            estado_tarea.save()           
            return Response({'mensaje': f"Estado actualizado a '{nuevo_estado}'"})
        else:
            return Response({
                'error': f"No puedes cambiar al estado '{nuevo_estado}' desde '{actual or 'ninguno'}'"
            }, status=400)
            
            
            

class OcultarTareaView(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def patch(self, request, tarea_id):
        try:
            tarea = Tarea.objects.get(pk=tarea_id, usuario=request.user)
        except Tarea.DoesNotExist:
            return Response({'error': 'Tarea no encontrada'}, status=status.HTTP_404_NOT_FOUND)

        tarea.visible = False
        tarea.save()
        return Response({'mensaje': 'Tarea ocultada correctamente'})