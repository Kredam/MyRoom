# Generated by Django 4.0.3 on 2023-03-05 17:23

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0005_remove_topics_room_room_topic'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='room',
            name='topic',
        ),
        migrations.AddField(
            model_name='room',
            name='topics',
            field=models.ManyToManyField(to='room.topics'),
        ),
    ]