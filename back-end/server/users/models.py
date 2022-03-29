from django.db import models
from django.contrib.auth.models import AbstractUser;
# Create your models here.

class User(AbstractUser):
    joined = models.DateTimeField(auto_now_add=True)
    born = models.DateField(null=True, blank=True)

class Starred(models.Model):
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    topics = models.ForeignKey("room.Topics", on_delete=models.CASCADE)