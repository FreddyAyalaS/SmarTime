from django.urls import path
from .views import PerfilUsuarioAPIView, CambiarContrasenaAPIView, ConfiguracionUsuarioAPIView

urlpatterns = [
    path('perfil/', PerfilUsuarioAPIView.as_view(), name='perfil'),
    path('cambiar-contrasena/', CambiarContrasenaAPIView.as_view(), name='cambiar-contrasena'),
    path('configuracion-preferencias/', ConfiguracionUsuarioAPIView.as_view(), name='configuracion-preferencias'),
]
