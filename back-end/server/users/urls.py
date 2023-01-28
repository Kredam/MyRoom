from django.urls import path
from .views import CreateUserView, ListAllUsers, RetriveUser

urlpatterns = [ 
  #<str:pk> dynamic routing 
  path('register/', CreateUserView.as_view(), name="register user"),
  path('all', ListAllUsers.as_view(), name="list all users"),
  path(r'info', RetriveUser.as_view(), name="retrive user"),
]  