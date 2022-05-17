from django.db import models

# Create your models here.
class Room(models.Model):
  name = models.CharField(max_length=200, null=False, blank=True)
  description = models.TextField(null=True, blank=True)
  picture = models.URLField()

  def __str__(self):
    return self.name


# Reddit like topics, that you can give to articles
class Topics(models.Model):
  name = models.CharField(max_length=50, null=False, primary_key=True)
  room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True)
  create = models.DateTimeField(auto_now_add=True)

class Article(models.Model):
  title = models.CharField(max_length=100)
  topics = models.ForeignKey(Topics, on_delete=models.SET_NULL, null=True)
  body = models.TextField()

# many to one
class Message(models.Model):
  room = models.ForeignKey(Room, on_delete=models.CASCADE)
  body = models.TextField()
  update = models.DateTimeField(auto_now=True)

class Followed(models.Model):
  room = models.ForeignKey(Room, on_delete=models.CASCADE)
  user = models.ForeignKey('users.User', on_delete=models.CASCADE)
  isAdmin = models.BooleanField()