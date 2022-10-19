from django.urls import path
from .views import CustomTokenView, LoginView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import LoginView

urlpatterns = [
    # <str:pk> dynamic routing
    path('', LoginView.as_view(), name='token_obtain_pair'),
    path('refresh', CustomTokenView.as_view(), name='token_refresh'),
]
