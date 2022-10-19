from django.urls import include, path
from .views import FollowedViewSet, RoomViewSet
from article.urls import article
# article.register('article', ArticlesViewSet, basename='article')

urlpatterns = [
  # name = easy to reference in view template
  path('all/', RoomViewSet.as_view({'get' : 'list'})),
  path('follow/', FollowedViewSet.as_view({'post' : 'follow'})),
  path('search/', RoomViewSet.as_view({'post' : 'search'})),
  path('unfollow/', FollowedViewSet.as_view({'post' : 'unfollow'})),
  path('followed-rooms/', FollowedViewSet.as_view({'get': 'followedRooms'})),
  path('followed/<str:pk>/', FollowedViewSet.as_view({'get' : 'followed'})),
  path('<str:pk>/', include(article.urls)),
]