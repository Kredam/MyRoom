from django.urls import path
from .views import CreateUserView, UserViewSet, FollowedViewSet

urlpatterns = [
    # <str:pk> dynamic routing
    path('user-follows', FollowedViewSet.as_view({'post': 'followed'})),
    path('follow', FollowedViewSet.as_view({'post': 'create'})),
    path('register/', CreateUserView.as_view(), name="register user"),
    path('all', UserViewSet.as_view({'post': 'list'})),
]
