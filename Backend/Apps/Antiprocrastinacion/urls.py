# Apps/Antiprocrastinacion/urls.py
from django.urls import path
from .views import ConfiguracionAntiprocrastinacionAPIView

urlpatterns = [
    path('configuracion-antiprocrastinacion/', ConfiguracionAntiprocrastinacionAPIView.as_view(), name='configuracion_antiprocrastinacion'),
]
