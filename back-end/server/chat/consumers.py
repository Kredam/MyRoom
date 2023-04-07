import asyncio
import json
from users.models import User
from .models import RoomChat
from .serializers import RoomChatSerializer
from room.models import Room, Followed
from users.serializer import UserSerializer
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async

@database_sync_to_async
def is_member(room, user):
    return Followed.objects.filter(user=user, room=room).exists()

@database_sync_to_async
def get_room(room):
    return Room.objects.get(name=room)    

@database_sync_to_async
def save_chat(self, text_data):
    chat = RoomChat(room=self.room, user=self.user, message=text_data)
    chat.save()
    return chat

@database_sync_to_async
def join(self):
    user = User.objects.get(pk=self.user.pk)
    user.online = True
    user.save()
    return user
    # Followed.objects.get(room=self.room, user=self.user).update(online=True)

@database_sync_to_async
def leave(self):
    user = User.objects.get(pk=self.user.pk)
    user.online = False
    user.save()
    return user
    # Followed.objects.get(room=self.room, user=self.user).update(online=False)

class ChatConsumer(AsyncJsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        self.room = None
        self.user = None
        super().__init__(*args, **kwargs)

    async def connect(self):
        self.room = await get_room(self.scope["url_route"]["kwargs"]["room"])
        self.user = self.scope["user"]
        if (await is_member(self.room, self.user)):
            await self.channel_layer.group_add(self.room.name.join("_"), self.channel_name)
            await self.accept()

    async def receive(self, text_data=None, bytes_data=None, **kwargs):
        chat = await save_chat(self, text_data)
        await self.channel_layer.group_send(self.room.name.join("_"), {
                "type": "chat.message",
                "chat": chat,
            })

    async def chat_message(self, event):
        instance = RoomChatSerializer(event["chat"])
        await self.send_json(instance.data)

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room.name.join("_"), self.channel_name)
        await super().disconnect(code)

class JoinLeaveConsumer(AsyncJsonWebsocketConsumer):
    def __init__(self, *args, **kwargs):
        self.room = None
        self.user = None
        super().__init__(*args, **kwargs)

    async def connect(self):
        self.user = self.scope["user"]
        if self.user.pk is not None:
            await join(self)
        await self.channel_layer.group_add("status", self.channel_name)
        await self.channel_layer.group_send("status", {
            "type": "user.status",
            "online": True,
            "user_id": self.user.id
        })
        await self.accept()

    # need to pass user in the event 
    # if not user will stay the same
    async def user_status(self, event):
        await self.send_json({"user": event["user_id"], "online": event["online"]})

    async def disconnect(self, code):
        if self.user.pk is not None:
            await leave(self)
        await self.channel_layer.group_send("status", {
                "type": "user.status",
                "online": False,
                "user_id": self.user.id
            })
        await self.channel_layer.group_discard("status", self.channel_name)
        await self.close()