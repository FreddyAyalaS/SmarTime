# views.py
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from Apps.Autenticacion.models import UsuarioPersonalizado
from django.utils import timezone

class ConfiguracionAntiprocrastinacionAPIView(APIView):
    permission_classes = [IsAuthenticated]

    def patch(self, request, *args, **kwargs):
        print("Datos recibidos:", request.data)  # Verifica que los datos estén llegando
        user = request.user
        # Obtener las URLs bloqueadas y el estado del modo antiprocrastinación
        urls_bloqueadas = request.data.get("urls_bloqueadas", [])
        modo_antiprocrastinacion = request.data.get("modo_antiprocrastinacion", False)
        
        # Actualizar las URLs bloqueadas y el estado del modo antiprocrastinación
        user.urls_bloqueadas = urls_bloqueadas
        user.modo_antiprocrastinacion = modo_antiprocrastinacion
        user.tiempo_activado = timezone.now() if modo_antiprocrastinacion else None
        user.save()

        return Response({"detail": "Modo antiprocrastinación activado y URLs bloqueadas actualizadas."}, status=200)
