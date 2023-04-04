from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/<str:room>/', consumers.ChatConsumer.as_asgi()),
    path('ws/join/<str:room>/', consumers.JoinLeaveConsumer.as_asgi())
]