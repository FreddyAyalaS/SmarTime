from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TareaViewSet, ClaseViewSet, EstudioViewSet, ActividadNoAcademicaViewSet

router = DefaultRouter()
router.register(r'tareas', TareaViewSet, basename='tarea')
router.register(r'clases', ClaseViewSet, basename='clase')
router.register(r'estudios', EstudioViewSet, basename='estudio')
router.register(r'actividadesNoAcademicas', ActividadNoAcademicaViewSet, basename='actividadNoAcademica')


urlpatterns = [
    path('api/', include(router.urls)),
]
