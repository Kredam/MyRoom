from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.


class User(AbstractUser):
    joined = models.DateTimeField(auto_now_add=True)
    born = models.DateField(null=True, blank=True)
    NSFW = models.BooleanField(null=False, blank=False, default=False)
    online = models.BooleanField(default=False, null=False)


class Followed(models.Model):
    follower = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='followers')
    following = models.ForeignKey(
        User, on_delete=models.CASCADE, related_name='followings')

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['follower', 'following'], name='unique_user_follow'
            )
        ]
