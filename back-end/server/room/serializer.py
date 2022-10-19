from .models import Room, Followed
from rest_framework import serializers

class RoomSerializer(serializers.ModelSerializer):
  class Meta:
    model = Room
    fields = '__all__'

class FollowedSerializer(serializers.ModelSerializer):
  class Meta:
    model = Followed
    fields = '__all__'

class RoomNameSerializer(serializers.ModelSerializer):
  class Meta:
    model = Followed
    fields = ['name']

class RoomSearchSerializer(serializers.Serializer):
  room = serializers.CharField()
  followers = serializers.IntegerField()