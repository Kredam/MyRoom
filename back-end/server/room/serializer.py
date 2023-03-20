from dataclasses import fields
from .models import Room, Followed, Topics
from rest_framework import serializers


class RoomSerializer(serializers.ModelSerializer):
    is_followed = serializers.SerializerMethodField()
    class Meta:
        model = Room
        fields = '__all__'

    def get_is_followed(self, obj):
        user = self.context.get('user')
        if user is None:
            return None
        return Followed.objects.filter(user=user.pk, room=obj['id']).exists()


class TopicSerializer(serializers.ModelSerializer):
    class Meta:
        model = Topics

class RoomListSerializer(serializers.Serializer):
    nrOfObjects = serializers.IntegerField()
    rooms = serializers.ListField(child=RoomSerializer())

class FollowedSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followed
        fields = '__all__'

    def get_user_related_rooms(self, obj):
        return RoomSerializer(obj.room).data

class RoomNameSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followed
        fields = ['room']


class RoomSearchSerializer(serializers.ModelSerializer):
    followers_nr = serializers.IntegerField()

    class Meta:
        model = Followed
        fields = ('room_id', 'followers_nr')
