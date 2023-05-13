from django.contrib import admin

# Register your models here.
from .models import Room, Followed
admin.site.register(Room)
admin.site.register(Followed)
