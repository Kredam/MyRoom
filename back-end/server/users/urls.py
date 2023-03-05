from django.urls import path
from .views import CreateUserView, UserViewSet

urlpatterns = [
    # <str:pk> dynamic routing
    path('user-follows', UserViewSet.as_view({'post': 'user_followed_users'})),
    path('follow', UserViewSet.as_view({'post': 'follow'})),
    path('register/', CreateUserView.as_view(), name="register user"),
    path('all', UserViewSet.as_view({'post': 'list'})),
]
