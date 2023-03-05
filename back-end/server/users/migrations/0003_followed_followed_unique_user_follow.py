# Generated by Django 4.0.3 on 2023-02-25 15:20

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0002_user_nsfw'),
    ]

    operations = [
        migrations.CreateModel(
            name='Followed',
            fields=[
                ('id', models.BigAutoField(auto_created=True,
                 primary_key=True, serialize=False, verbose_name='ID')),
                ('follower', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                 related_name='followers', to=settings.AUTH_USER_MODEL)),
                ('following', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE,
                 related_name='followings', to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.AddConstraint(
            model_name='followed',
            constraint=models.UniqueConstraint(
                fields=('follower', 'following'), name='unique_user_follow'),
        ),
    ]
