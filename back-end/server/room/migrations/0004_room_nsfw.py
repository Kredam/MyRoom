# Generated by Django 4.0.3 on 2023-01-16 15:31

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0003_remove_comments_room_remove_comments_user_and_more'),
    ]

    operations = [
        migrations.AddField(
            model_name='room',
            name='nsfw',
            field=models.BooleanField(default=False),
        ),
    ]