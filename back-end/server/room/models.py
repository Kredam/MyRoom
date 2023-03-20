from django.db import models

# Create your models here.

class Topics(models.Model):
    name = models.CharField(max_length=50, null=False, primary_key=True)
    # room should be primary key

class Room(models.Model):
    name = models.CharField(max_length=200, null=False,
                            blank=True, primary_key=True)
    description = models.TextField(null=True, blank=True)
    picture = models.URLField()
    nsfw = models.BooleanField(null=False, blank=False, default=False)
    topics = models.ManyToManyField(Topics)
    # can be extended later with room rules, stats etc

    def __str__(self):
        return self.name

# Reddit like topics, that you can give to articles

class SubRoom(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    name = models.CharField(max_length=50, null=False,
                            blank=True, primary_key=True)

class Followed(models.Model):
    room = models.ForeignKey(Room, on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.CASCADE)
    isAdmin = models.BooleanField(default=False)

    class Meta:
        constraints = [
            models.UniqueConstraint(
                fields=['room', 'user'], name='unique_follow'
            )
        ]
