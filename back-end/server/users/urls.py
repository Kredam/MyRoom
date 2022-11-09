from django.urls import path
from .views import CreateUserView, ListAllUsers

urlpatterns = [ 
  #<str:pk> dynamic routing 
  path('register/', CreateUserView.as_view(), name="register"),
  path('all', ListAllUsers.as_view(), name="list"),
]  