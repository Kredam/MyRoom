from django.urls import path
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet
from rest_framework import routers

article = routers.DefaultRouter()
article.register('', ArticleViewSet, basename='article')
article.register('article', ArticleViewSet)

urlpatterns = [
    path('<int:pk>/', ArticleViewSet.as_view({'get': 'get_details'})),
    path('thread', ArticleViewSet.as_view({'post' : 'thread'})),
]
