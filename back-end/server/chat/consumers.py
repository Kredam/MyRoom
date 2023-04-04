import asyncio
import json
from .models import RoomChat
from .serializers import RoomChatSerializer
from room.models import Room, Followed
from users.serializer import UserSerializer
from channels.generic.websocket import AsyncJsonWebsocketConsumer
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
def join_room(self):
    follow = Followed.objects.get(room=self.room, user=self.user)
    follow.online = True
    follow.save()
    return follow
    # Followed.objects.get(room=self.room, user=self.user).update(online=True)

@database_sync_to_async
def leave_room(self):
    follow = Followed.objects.get(room=self.room, user=self.user)
    follow.online = False
    follow.save()
    return follow
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
        self.room = await get_room(self.scope["url_route"]["kwargs"]["room"])
        self.user = self.scope["user"]
        if (await is_member(self.room, self.user)):
            await join_room(self)
            await self.channel_layer.group_add(self.room.name.join("_") + "status", self.channel_name)
            await self.channel_layer.group_send(self.room.name.join("_") + "status", {
                "type": "user.status",
                "online": True,
                "user": self.user.id
            })
            await self.accept()

    # need to pass user in the event 
    # if not user will stay the same
    async def user_status(self, event):
        user = UserSerializer(event["user"]).data
        await self.send_json({"user": user, "online": event["online"]})

    async def disconnect(self, code):
        await leave_room(self)
        await self.channel_layer.group_send(self.room.name.join("_") + "status", {
                "type": "user.status",
                "online": False,
                "user": self.user.id
            })
        await self.channel_layer.group_discard(self.room.name.join("_") + "status", self.channel_name)
        await self.close()