from django.urls import path
from .views import CreateUserView, UserViewSet

urlpatterns = [ 
  #<str:pk> dynamic routing 
  path('register/', CreateUserView.as_view(), name="register user"),
  path('all', UserViewSet.as_view({'post' : 'list'})),
]