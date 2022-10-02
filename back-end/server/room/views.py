from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Room, Followed
from .serializer import FollowedRoomsSerializer, RoomSerializer, FollowedSerializer

class RoomViewSet(ModelViewSet):
  queryset = Room.objects.all()
  serializer_class = RoomSerializer

  # @action(detail=True, methods=['get'])

class FollowedViewSet(ModelViewSet):
  queryset = Followed.objects.all()
  serializer_class = FollowedSerializer
  permission_classes = [IsAuthenticated]

  @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
  def follow(self, request, pk=None):
    room = Room.objects.get(name=request.data['name'])
    admin = request.data['isAdmin']
    serializer = FollowedSerializer(data={'room':room, 'user':request.user.pk, 'isAdmin':admin})
    if serializer.is_valid():
      serializer.save()
      return Response('Successfull follow')
    return Response("Not Successfull")

  @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
  def unfollow(self, request, pk=None):
    room = Room.objects.get(name=self.request.data['name'])
    user = request.user.pk
    Followed.objects.get(room=room, user=user).delete()
    return Response('Unfollowed')

  @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
  def followed(self, request, pk=None):
    room = Room.objects.get(name=self.kwargs['pk'])
    user = request.user.pk
    try:
      Followed.objects.get(room=room, user=user)
      return Response(True)
    except Followed.DoesNotExist:
      return Response(False)
    
  @action(detail=True, methods=['get'], permission_classes=[IsAuthenticated])
  def followedRooms(self, request):
    user = request.user
    rooms = Followed.objects.filter(user=user)
    # serialized_data = FollowedRoomsSerializer(rooms, many=True).get_names()
    serialized_data = FollowedRoomsSerializer.get_names(self, follow=rooms)
    return Response(serialized_data)
