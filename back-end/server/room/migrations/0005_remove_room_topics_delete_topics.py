# Generated by Django 4.0.3 on 2023-05-10 22:56

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0004_remove_followed_online'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='topics',
        ),
        migrations.DeleteModel(
            name='Topics',
        ),
    ]
