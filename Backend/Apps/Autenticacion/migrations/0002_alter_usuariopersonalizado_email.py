# Generated by Django 5.2 on 2025-06-05 05:54

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ("Autenticacion", "0001_initial"),
    ]

    operations = [
        migrations.AlterField(
            model_name="usuariopersonalizado",
            name="email",
            field=models.EmailField(max_length=254, unique=True),
        ),
    ]
