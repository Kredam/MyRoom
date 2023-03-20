from django.urls import include, path
from .views import FollowedViewSet, RoomViewSet, TopicViewSet
from article.urls import article
from rest_framework.routers import DefaultRouter
from django.urls import include
# article.register('article', ArticlesViewSet, basename='article')

router = DefaultRouter()
router.register('', TopicViewSet)

urlpatterns = [
    # name = easy to reference in view template
    path('', RoomViewSet.as_view({'get': 'list'})),
    path('search/', RoomViewSet.as_view({'post': 'search'})),
    path('follow/', FollowedViewSet.as_view({'post': 'create'})),
    path('followed-rooms/',
         FollowedViewSet.as_view({'post': 'room_followed_user'})),
    path('<str:pk>/', include(article.urls)),
    path('topics', include(router.urls))
]
