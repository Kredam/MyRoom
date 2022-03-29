from django.urls import path
from .views import GetAllRoomsView, ListFollowedRooms

urlpatterns = [
  #<str:pk> dynamic routing 
  path('all', GetAllRoomsView.as_view(), name="room"),
  path('followed-rooms', ListFollowedRooms.as_view())

]