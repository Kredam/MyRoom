from django.db import connection
from django.db.models import Count
from rest_framework.decorators import action
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from django.core.exceptions import ObjectDoesNotExist
from api.authentication import CustomAuthentication
from .models import Room, Followed
from .serializer import RoomNameSerializer, RoomSearchSerializer, RoomSerializer, FollowedSerializer


class RoomViewSet(ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer

    @action(detail=True, methods=["post"])
    def search(self, request, pk=None):
        search = request.data['search']
        # if (len(search) == 0): return Response()
        followed_rooms = Followed.objects.values('room_id').annotate(followers_nr=Count('room_id')).filter(room__name__icontains=search).order_by('-followers_nr')
        # cursor.execute('SELECT room_id , COUNT(room_id) as followers FROM room_followed rf LEFT JOIN room_room rr ON rf.id = rr.name GROUP BY room_id ORDER BY followers DESC LIMIT 5 WHERE room_id')
        # row = cursor.fetchall()
        # print(row)
        serialized = RoomSearchSerializer(followed_rooms, many=True)
        return Response(serialized.data)


class FollowedViewSet(ModelViewSet):
    queryset = Followed.objects.all()
    serializer_class = FollowedSerializer
    permission_classes = [IsAuthenticated]

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
            serializer = FollowedSerializer(data={'room': room, 'user': request.user.pk, 'isAdmin': admin})
            if serializer.is_valid():
                serializer.save()
            return Response('Successful follow')


    @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
    def followed_rooms(self, request):
        user = request.user
        rooms = Followed.objects.filter(user=user)
        # serialized_data = FollowedRoomsSerializer(rooms, many=True).get_names()
        serialized = RoomNameSerializer(rooms, many=True)
        # return Response(serialized_data)
        print(serialized.data)
        return Response(serialized.data)
