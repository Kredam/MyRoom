from django.urls import path
from . import consumers

websocket_urlpatterns = [
    path('ws/<str:room>/chat/', consumers.ChatConsumer.as_asgi()),
    path('ws/join/', consumers.JoinLeaveConsumer.as_asgi())
]