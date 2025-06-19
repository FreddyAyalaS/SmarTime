from django.urls import path
from .views import test_email

urlpatterns = [
    path("probar-correo/", test_email),
]
