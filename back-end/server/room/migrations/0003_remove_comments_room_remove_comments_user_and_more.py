# Generated by Django 4.0.3 on 2022-10-18 16:57

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('room', '0002_alter_followed_isadmin_followed_unique_follow'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='comments',
            name='room',
        ),
        migrations.RemoveField(
            model_name='comments',
            name='user',
        ),
        migrations.DeleteModel(
            name='Article',
        ),
        migrations.DeleteModel(
            name='Comments',
        ),
    ]