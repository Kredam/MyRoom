from dataclasses import fields
from .models import Room, Followed
from rest_framework import serializers
class RoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = '__all__'

class RoomListSerializer(serializers.Serializer):
  nrOfObjects = serializers.IntegerField()
  rooms = serializers.ListField(child=RoomSerializer())

class FollowedSerializer(serializers.ModelSerializer):
  class Meta:
    model = Followed
    fields = '__all__'

class RoomNameSerializer(serializers.ModelSerializer):
  class Meta:
    model = Followed
    fields = ['room']

class RoomSearchSerializer(serializers.ModelSerializer):
  followers_nr = serializers.IntegerField()
  class Meta:
    model = Followed
    fields = ('room_id', 'followers_nr')