from django.contrib import admin

# Register your models here.
from .models import Article, Room, Followed, Comments, Topics
admin.site.register(Room)
admin.site.register(Followed)
admin.site.register(Comments)
admin.site.register(Topics)
admin.site.register(Article)