from django import urls
from django.urls import include, path
from .views import GetAllRoomsView, ListFollowedRooms, ArticlesViewSet, RoomViewSet
from rest_framework import routers

article = routers.DefaultRouter()
article.register('', ArticlesViewSet, basename='article')
article.register('article', ArticlesViewSet)
# article.register('article', ArticlesViewSet, basename='article')

urlpatterns = [
  # name = easy to reference in view template
  path('all/', GetAllRoomsView.as_view()),
  path('follow/', ArticlesViewSet.as_view({'post' : 'follow'})),
  path('followed-rooms/', ListFollowedRooms.as_view()),
  path('<str:pk>/', include(article.urls)),
]