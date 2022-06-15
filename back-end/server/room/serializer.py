from .models import Room, Followed
from rest_framework.serializers import ModelSerializer

class RoomSerializer(ModelSerializer):
  class Meta:
    model = Room
    fields = ('__all__')

class FollowedSerializer(ModelSerializer):
  class Meta:
    model = Followed
    fields = ('__all__')
