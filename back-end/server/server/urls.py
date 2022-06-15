from django.contrib import admin
from django.urls import path, include


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/users/', include('users.urls')),
    path('api/rooms/', include('room.urls')),
    path('api/token', include('api.urls')),
    path('api/article/', include('article.urls'))
]
 