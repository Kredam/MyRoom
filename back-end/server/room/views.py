from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from django.core.serializers import json
from rest_framework.renderers import JSONRenderer

from rest_framework.permissions import IsAuthenticated
from .models import Room, Followed
from .serializer import RoomSerializer, FollowedSerializer

class GetAllRoomsView(ListAPIView):
  serializer_class = RoomSerializer
  queryset = Room.objects.all()[:5]
 
class ListFollowedRooms(ListAPIView):
  permission_classes = [IsAuthenticated]
  serializer_class = RoomSerializer

  def get(self, request, *args, **kwargs):
    user_authenticated = request.user
    rooms_followed_by_user = []
    sub_query = Followed.objects.filter(user=user_authenticated).only('user', 'isAdmin')[:5]
    sub_serialized = FollowedSerializer(sub_query, many=True)
    for key in sub_serialized.data:
      query = Room.objects.get(id=key['room'])
      query_serialized = RoomSerializer(query)
      # rewrite serializer to multiple models 
      rooms_followed_by_user.append({'isAdmin' : key['isAdmin'], 'details' : query_serialized.data})
    return Response(rooms_followed_by_user)
