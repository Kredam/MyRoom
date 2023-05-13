from rest_framework import serializers
from .models import RoomChat
from users.serializer import UserSerializer

class RoomChatSerializer(serializers.ModelSerializer):
    class Meta:
        model = RoomChat
        fields = '__all__'