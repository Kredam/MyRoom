# Generated by Django 4.0.3 on 2023-04-03 14:33

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('chat', '0003_initial'),
    ]

    operations = [
        migrations.DeleteModel(
            name='RoomStatus',
        ),
    ]
