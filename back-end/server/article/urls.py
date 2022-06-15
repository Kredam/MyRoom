from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ArticleViewSet


urlpatterns = [
    path('<int:pk>/', ArticleViewSet.as_view({'get': 'get_details'}))
]
