from django.urls import include, path
from .views import FollowedViewSet, RoomViewSet
from rest_framework.routers import DefaultRouter
from django.urls import include
# article.register('article', ArticlesViewSet, basename='article')

urlpatterns = [
    # name = easy to reference in view template
    path('all', RoomViewSet.as_view({'get': 'list'})),
    path('create', RoomViewSet.as_view({'post': 'create'})),
    path('search/', RoomViewSet.as_view({'post': 'search'})),
    path('update/<str:pk>', RoomViewSet.as_view({'post': 'update'})),
    path('retrieve/<str:pk>', RoomViewSet.as_view({'get': 'retrieve'})),
    path('follow/', FollowedViewSet.as_view({'post': 'create'})),
    path('followed-rooms',
         FollowedViewSet.as_view({'get': 'room_followed_user'})),
]
