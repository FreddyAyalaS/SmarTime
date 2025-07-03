from django.urls import path
from .views import CalcularPuntuacionView


urlpatterns = [
    path('api/puntuacionAcumulada/', CalcularPuntuacionView.as_view(), name='puntuacionAcumulada'), # http://localhost:8000/gamificacion/api/puntuacionAcumulada/

]
