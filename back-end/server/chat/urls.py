from django.urls import path
from .views import RoomChatViewSet

urlpatterns = [
    path("<str:room>/history/", RoomChatViewSet.as_view({"get": "list"}))
]