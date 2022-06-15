from django.db import models

# Create your models here.
class Article(models.Model):
  room = models.ForeignKey('room.Room', on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  likes = models.IntegerField(default=0)
  body = models.TextField(blank=True)

# many to one
class Comments(models.Model):
  room = models.ForeignKey('room.Room', on_delete=models.CASCADE)
  user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
  body = models.TextField(blank=True)
  likes = models.IntegerField(default=0)
  create = models.DateTimeField(auto_now_add=True)
  update = models.DateTimeField(auto_now=True)

class Liked(models.Model):
  article = models.ForeignKey(Article, on_delete=models.CASCADE)
  user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)