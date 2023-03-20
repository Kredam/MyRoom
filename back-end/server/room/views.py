from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from users.models import User
from api.authentication import CustomAuthentication
from .models import Room, Followed, Topics
from .serializer import RoomNameSerializer, RoomSearchSerializer, RoomSerializer, FollowedSerializer, RoomListSerializer, TopicSerializer


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
        followed_rooms = Followed.objects.values('room_id').annotate(followers_nr=Count(
            'room_id')).filter(room__name__icontains=search).order_by('-followers_nr')
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
            admin = request.data['isAdmin']
            serializer = FollowedSerializer(
                data={'room': room, 'user': request.user.pk, 'isAdmin': admin})
            if serializer.is_valid():
                serializer.save()
                return Response('Followed')
            return Response('Ooops something went wrong')
        
    

    @action(detail=True, methods=['post'])
    def list(self, request):
        pk = request.data['name']
        limit = request.data['limit']
        offset = request.data['offset']
        room = get_object_or_404(Room, name=pk)
        user_rooms = Followed.objects.prefetch_related('room').filter(room=room)
        rooms_data = []
        for user_room in user_rooms[offset:limit+offset]:
                rooms_data.append(RoomSerializer(user_room.room).data)
        instance = {"nrOfObjects": len(user_rooms), "room": rooms_data}
        serializer = RoomListSerializer(instance=instance, context={'user': request.user})
        return Response(serializer.data)

    