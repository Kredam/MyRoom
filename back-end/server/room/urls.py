from django.urls import include, path
from .views import GetAllRoomsView, ListFollowedRooms, ArticlesViewSet, ArticleTestView
from rest_framework import routers

article = routers.DefaultRouter()
article.register('', ArticlesViewSet, basename='article')

urlpatterns = [
  # name = easy to reference in view template
  path('all/', GetAllRoomsView.as_view()),
  path('followed-rooms/', ListFollowedRooms.as_view()),
  path('<str:pk>/', include(article.urls))
  # path('<str:pk>/', ArticleTestView.as_view()),
]

