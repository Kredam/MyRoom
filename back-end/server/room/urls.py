from django.urls import include, path
from .views import FollowedViewSet, RoomViewSet, TopicViewSet
from rest_framework.routers import DefaultRouter
from django.urls import include
# article.register('article', ArticlesViewSet, basename='article')

router = DefaultRouter()
router.register('', TopicViewSet)

urlpatterns = [
    # name = easy to reference in view template
    path('', RoomViewSet.as_view({'post': 'list'})),
    path('search/', RoomViewSet.as_view({'post': 'search'})),
    path('follow/', FollowedViewSet.as_view({'post': 'create'})),
    path('followed-rooms',
         FollowedViewSet.as_view({'get': 'room_followed_user'})),
    path('topics', include(router.urls))
]
