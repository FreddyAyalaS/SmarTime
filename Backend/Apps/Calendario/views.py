from rest_framework import viewsets
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import ActividadAcademica, ActividadNoAcademica
from .serializers import ActividadAcademicaSerializer, ActividadNoAcademicaSerializer

class ActividadAcademicaViewSet(viewsets.ModelViewSet):
    queryset = ActividadAcademica.objects.all()
    serializer_class = ActividadAcademicaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
    
    def update(self, request, *args, **kwargs):
        if request.method == 'PUT':
            return Response(
                {"detail": "Método PUT no permitido, usa PATCH para actualizaciones"},
                status=status.HTTP_405_METHOD_NOT_ALLOWED
            )
        return super().update(request, *args, **kwargs)

    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)
        
        return Response(
            {
                "mensaje": "Actividad académica creada con éxito",
                "actividad": serializer.data
            }, 
            status=status.HTTP_201_CREATED, 
            headers=headers
        )
    def destroy(self, request, *args, **kwargs):
        instance = self.get_object()
        self.perform_destroy(instance)
        return Response(
            {"mensaje": "Actividad académica eliminada con éxito"},
            status=status.HTTP_200_OK
        )

#Operaciones a considerar
#Operación	              Método HTTP	               URL Ejemplo	                                       Descripción
#Crear	                     POST	        /calendario/actividadesAcademicas/	                  Crear una nueva actividad académica.
#Leer lista	                 GET	        /calendario/actividadesAcademicas/	                 Obtener todas las actividades del usuario.
#Leer detalle	             GET	        /calendario/actividadesAcademicas/{id}/	              Obtener una actividad específica por id.
#Actualizar	                PATCH	        /calendario/actividadesAcademicas/{id}/	             Actualizar parcialmente campos de una actividad.
#Eliminar	                DELETE	        /calendario/actividadesAcademicas/{id}/	                 Borrar una actividad específica.


class ActividadNoAcademicaViewSet(viewsets.ModelViewSet):
    queryset = ActividadNoAcademica.objects.all()
    serializer_class = ActividadNoAcademicaSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return self.queryset.filter(usuario=self.request.user)

    def perform_create(self, serializer):
        serializer.save(usuario=self.request.user)
    
    def update(self, request, *args, **kwargs):
        if request.method == 'PUT':
            return Response(
                {"detail": "Método PUT no permitido, usa PATCH para actualizaciones"},
                status=status.HTTP_405_METHOD_NOT_ALLOWED
            )
        return super().update(request, *args, **kwargs)
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        self.perform_create(serializer)
        headers = self.get_success_headers(serializer.data)

        return Response(
            {
                "mensaje": "Actividad no académica creada con éxito",
                "actividad": serializer.data
            },
            status=status.HTTP_201_CREATED,
            headers=headers
        )

#Operaciones a considerar
#Operación	          Método HTTP           	      URL Ejemplo	                                            Descripción
#Crear	                 POST	           /calendario/actividadesNoAcademicas/	                      Crear una nueva actividad no académica.
#Leer lista	             GET	           /calendario/actividadesNoAcademicas/	               Obtener todas las actividades no académicas del usuario.
#Leer detalle	         GET	           /calendario/actividadesNoAcademicas/{id}/	         Obtener una actividad no académica específica por id.
#Actualizar	            PATCH	           /calendario/actividadesNoAcademicas/{id}/	         Actualizar parcialmente campos de una actividad no académica.
#Eliminar	            DELETE	           /calendario/actividadesNoAcademicas/{id}/	              Borrar una actividad no académica específica.