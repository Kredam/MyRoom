from .models import Room, Followed
from rest_framework.serializers import ModelSerializer, SerializerMethodField

class RoomSerializer(ModelSerializer):
  class Meta:
    model = Room
    fields = ('__all__')

class FollowedSerializer(ModelSerializer):
  class Meta:
    model = Followed
    fields = ('__all__')

class FollowedRoomsSerializer(ModelSerializer):
  room = SerializerMethodField()

  class Meta:
    model = Followed
    fields = ['room']
  
  def get_names(self, follow):
    return follow.values_list('room', flat=True)
