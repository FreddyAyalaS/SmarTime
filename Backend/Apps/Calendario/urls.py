from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ActividadAcademicaViewSet, ActividadNoAcademicaViewSet

router = DefaultRouter()
router.register(r'actividadesAcademicas', ActividadAcademicaViewSet, basename='actividadAcademica')
router.register(r'actividadesNoAcademicas', ActividadNoAcademicaViewSet, basename='actividadNoAcademica')

urlpatterns = [
    path('', include(router.urls)),
]
