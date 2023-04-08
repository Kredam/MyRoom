from rest_framework import serializers
from .models import User, Followed
from room.models import Followed as RoomFollows, Role
from room.serializer import RoleSerializer, FollowedSerializer as RoomFollowSerializer
from django.contrib.auth.hashers import make_password
from room.serializer import RoleSerializer

class UserSerializerCreate(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('username', 'email', 'password', 'first_name', 'last_name', 'born')

    def create(self, validated_data):
        UserModel = self.Meta.model
        validated_data['password'] = make_password(validated_data['password'])
        user = UserModel._default_manager.create(**validated_data)
        return user

class UserSerializer(serializers.ModelSerializer):
    is_followed = serializers.SerializerMethodField()
    role = serializers.SerializerMethodField()
    class Meta:
        model = User
        fields = ('id', 'last_login', 'username', 'online', 'email', 'first_name',
                  'last_name', 'is_staff', 'last_login', 'date_joined', 'joined', 'born', 'NSFW', 'is_followed', 'online', 'role')
    
    def get_is_followed(self, obj):
        user = self.context.get('user')
        if user is None:
            return None
        return Followed.objects.filter(following=user, follower=obj).exists()

    def get_role(self, obj):
        room = self.context.get('room')
        if room is None:
            return None
        user = obj.id
        query = Role.objects.get(followed__room=room, followed__user=user)
        serializer = RoleSerializer(query)
        return serializer.data['name']


class ListUserSerializer(serializers.Serializer):
    nrOfUsers = serializers.IntegerField()
    users = serializers.ListField()


class FollowUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = Followed
        fields = '__all__'
