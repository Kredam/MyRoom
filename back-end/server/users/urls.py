from django.urls import path
from .views import CreateUserView, UserViewSet, FollowedViewSet

urlpatterns = [
    # <str:pk> dynamic routing
    path('<int:user>', UserViewSet.as_view({'get':'retrieve'})),
    path('user-follows', FollowedViewSet.as_view({'get': 'followed'})),
    path('room-follows', FollowedViewSet.as_view({'get': 'user_followed_rooms'})),
    path('follow', FollowedViewSet.as_view({'post': 'create'})),
    path('register/', CreateUserView.as_view(), name="register user"),
    path('all', UserViewSet.as_view({'get' : 'list'})),
]
