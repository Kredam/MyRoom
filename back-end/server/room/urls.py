from django.urls import include, path
from .views import FollowedViewSet, RoomViewSet
from article.urls import article
# article.register('article', ArticlesViewSet, basename='article')

urlpatterns = [
  # name = easy to reference in view template
  path('all/', RoomViewSet.as_view({'post' : 'list'})),
  path('search/', RoomViewSet.as_view({'post' : 'search'})),
  path('follow/', FollowedViewSet.as_view({'post' : 'follow_action'})),
  path('followed-rooms/', FollowedViewSet.as_view({'get': 'followed_rooms'})),
  path('<str:pk>/', include(article.urls)),
]