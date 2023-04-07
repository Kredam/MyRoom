from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework import status
from users.models import User
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from api.authentication import CustomAuthentication
from users.serializer import ListUserSerializer, UserSerializer
from .models import Room, Followed, Topics
from .serializer import RoomSearchSerializer, RoomSerializer, FollowedSerializer, RoomListSerializer, TopicSerializer


class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @action(detail=True, methods=['POST'])
    def list(self, request):
        limit = request.data['limit']
        offset = request.data['offset']
        rooms = self.get_queryset()[offset:offset+limit]
        instance = {"nrOfObjects": len(self.get_queryset()), "rooms": rooms}
        room_serialized  = RoomListSerializer(instance)
        return Response(room_serialized.data)

    @action(detail=True, methods=["post"])
    def search(self, request, pk=None):
        search = request.data['search']
        user = request.user.pk
        followed_rooms = Followed.objects.values('room_id').annotate(followers_nr=Count(
            'room_id')).filter(user=user,room__name__icontains=search).order_by('-followers_nr')
        serialized = RoomSearchSerializer(followed_rooms, many=True)
        return Response(serialized.data)

class TopicViewSet(ModelViewSet):
    queryset = Topics.objects.all()
    serializer_class = TopicSerializer

class FollowedViewSet(ModelViewSet):
    queryset = Followed.objects.all()
    serializer_class = FollowedSerializer

    @action(detail=True, methods=['post'], permission_classes=[CustomAuthentication])
    def create(self, request, pk=None):
        user = request.user
        pk = self.request.data['name']
        room = get_object_or_404(Room, name=pk)
        try:
            Followed.objects.get(room=room, user=user).delete()
            return Response('Unfollowed')
        except ObjectDoesNotExist:
            role = request.data['role']
            serializer = FollowedSerializer(
                data={'room': room, 'user': request.user.pk, 'role': role})
            if serializer.is_valid():
                serializer.save()
                return Response('Followed')
            return Response('Ooops something went wrong', status=status.HTTP_404_NOT_FOUND)
        

    @action(detail=True, methods=['GET'])
    def room_followed_user(self, request):
        pk = self.request.GET.get("name")
        room = get_object_or_404(Room, name=pk)
        users = User.objects.filter(followed__room=room.pk)
        instance = {"nrOfUsers": users.count(), "users": UserSerializer(users, many=True, context={'user': request.user.pk, 'room': room.name}).data}
        serializer = ListUserSerializer(instance=instance)
        return Response(serializer.data)

