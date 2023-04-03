import asyncio
import json
from .models import RoomChat
from room.models import Room
from room.models import Followed
from channels.generic.websocket import AsyncJsonWebsocketConsumer
from channels.db import database_sync_to_async
from asgiref.sync import sync_to_async

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
            },)

    async def chat_message(self, event):
        await self.send_json({
            "room": event["chat"].room.name,
            "user": event["chat"].user.username,
            "message": event["chat"].message
        })

    async def disconnect(self, code):
        await self.channel_layer.group_discard(self.room.name.join("_"), self.channel_name)
        await super().disconnect(code)