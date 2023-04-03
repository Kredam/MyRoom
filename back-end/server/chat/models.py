from django.db import models

# Create your models here.
class RoomChat(models.Model):
    room = models.ForeignKey('room.Room', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
    message = models.CharField(max_length=95, blank=False, null=False)
    sent_time = models.DateTimeField(auto_now_add=True)

class RoomStatus(models.Model):
    room = models.ForeignKey('room.Room', on_delete=models.CASCADE)
    user = models.ForeignKey('users.User', on_delete=models.SET_NULL, null=True)
    is_active = models.BooleanField(null=False, default=False)