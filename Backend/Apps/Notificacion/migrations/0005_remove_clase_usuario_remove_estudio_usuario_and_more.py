# Generated by Django 5.2 on 2025-07-01 04:38

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('Notificacion', '0004_tarea_estado'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='clase',
            name='usuario',
        ),
        migrations.RemoveField(
            model_name='estudio',
            name='usuario',
        ),
        migrations.RemoveField(
            model_name='tarea',
            name='usuario',
        ),
        migrations.DeleteModel(
            name='ActividadNoAcademica',
        ),
        migrations.DeleteModel(
            name='Clase',
        ),
        migrations.DeleteModel(
            name='Estudio',
        ),
        migrations.DeleteModel(
            name='Tarea',
        ),
        migrations.DeleteModel(
            name='Usuario',
        ),
    ]
