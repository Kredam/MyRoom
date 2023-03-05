from django.db.models import Count
from django.shortcuts import get_object_or_404
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from users.models import User
from api.authentication import CustomAuthentication
from .models import Room, Followed
from .serializer import RoomNameSerializer, RoomSearchSerializer, RoomSerializer, FollowedSerializer, RoomListSerializer


class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @action(detail=True, methods=['POST'])
    def list(self, request):
        limit = request.data['limit']
        offset = request.data['offset']
        rooms = self.get_queryset()[offset:offset+limit]
        instance = {"nrOfObjects": len(self.get_queryset()), "rooms": rooms}
        room_serialized = RoomListSerializer(instance)
        return Response(room_serialized.data)

    @action(detail=True, methods=["post"])
    def search(self, request, pk=None):
        search = request.data['search']
        # if (len(search) == 0): return Response()
        followed_rooms = Followed.objects.values('room_id').annotate(followers_nr=Count(
            'room_id')).filter(room__name__icontains=search).order_by('-followers_nr')
        # cursor.execute('SELECT room_id , COUNT(room_id) as followers FROM room_followed rf LEFT JOIN room_room rr ON rf.id = rr.name
        # GROUP BY room_id ORDER BY followers DESC LIMIT 5 WHERE room_id')
        # row = cursor.fetchall()
        # print(row)
        serialized = RoomSearchSerializer(followed_rooms, many=True)
        return Response(serialized.data)


class FollowedViewSet(ModelViewSet):
    queryset = Followed.objects.all()
    serializer_class = FollowedSerializer

    @action(detail=True, methods=['post'], permission_classes=[CustomAuthentication])
    def follow_action(self, request, pk=None):
        try:
            room = Room.objects.get(name=self.request.data['name'])
            user = request.user.pk
            Followed.objects.get(room=room, user=user).delete()
            return Response('Unfollowed')
        except ObjectDoesNotExist:
            room = Room.objects.get(name=request.data['name'])
            admin = request.data['isAdmin']
            serializer = FollowedSerializer(
                data={'room': room, 'user': request.user.pk, 'isAdmin': admin})
            if serializer.is_valid():
                serializer.save()
            return Response('Followed')

    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def followed_rooms(self, request):
        user = request.user
        rooms = Followed.objects.filter(user=user)
        # serialized_data = FollowedRoomsSerializer(rooms, many=True).get_names()
        serialized = RoomNameSerializer(rooms, many=True)
        # return Response(serialized_data)
        print(serialized.data)
        return Response(serialized.data)

    @action(detail=True, methods=['post'])
    def user_followed_rooms(self, request):
        user_pk = request.data['pk']
        limit = request.data['limit']
        offset = request.data['offset']
        user = get_object_or_404(User, pk=user_pk)
        user_rooms = Followed.objects.prefetch_related('room').filter(user=user)[offset:limit+offset]
        rooms_data = []
        for user_room in user_rooms:
            if request.user.is_authenticated:
                serializer = RoomSerializer(instance=user_room.room, context={'user': request.user})
                rooms_data.append(serializer.data)
                continue
            rooms_data.append(RoomSerializer(user_room.room).data)
        return Response(rooms_data)

    