from django.db import models

# Create your models here.
class Room(models.Model):
  name = models.CharField(max_length=200, null=False, blank=True, primary_key=True)
  description = models.TextField(null=True, blank=True)
  picture = models.URLField()
  # can be extended later with room rules, stats etc

  def __str__(self):
    return self.name


# Reddit like topics, that you can give to articles
class Topics(models.Model):
  name = models.CharField(max_length=50, null=False, primary_key=True)
  # room should be primary key
  room = models.ForeignKey(Room, on_delete=models.SET_NULL, null=True)

class Article(models.Model):
  room = models.ForeignKey(Room, on_delete=models.CASCADE)
  title = models.CharField(max_length=100)
  likes = models.IntegerField(default=0)
  body = models.TextField(blank=True)

# many to one
class Comments(models.Model):
  room = models.ForeignKey(Room, on_delete=models.CASCADE)
  user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
  body = models.TextField(blank=True)
  likes = models.IntegerField(default=0)
  create = models.DateTimeField(auto_now_add=True)
  update = models.DateTimeField(auto_now=True)

class Followed(models.Model):
  room = models.ForeignKey(Room, on_delete=models.CASCADE)
  user = models.ForeignKey('users.User', on_delete=models.CASCADE)
  isAdmin = models.BooleanField()