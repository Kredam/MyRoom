from django.contrib import admin

# Register your models here.
from .models import Room, Followed, Message, Topics
admin.site.register(Room)
admin.site.register(Followed)
admin.site.register(Message)
admin.site.register(Topics)