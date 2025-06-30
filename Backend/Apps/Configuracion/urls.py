from django.urls import path
from .views import PerfilUsuarioAPIView, CambiarContrasenaAPIView

urlpatterns = [
    path('perfil/', PerfilUsuarioAPIView.as_view(), name='perfil'),
    path('cambiar-contrasena/', CambiarContrasenaAPIView.as_view(), name='cambiar-contrasena'),
]
