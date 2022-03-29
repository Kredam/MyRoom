from django.urls import path
from .views import getRoutes
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView


urlpatterns = [ 
  #<str:pk> dynamic routing 
    path('', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('refresh', TokenRefreshView.as_view(), name='token_refresh'),
]  