from django.shortcuts import get_list_or_404
from rest_framework.generics import ListAPIView, RetrieveAPIView
from rest_framework.response import Response
from rest_framework.renderers import JSONRenderer
from rest_framework.viewsets import ModelViewSet, ViewSet

from rest_framework.permissions import IsAuthenticated
from .models import Article, Room, Followed
from .serializer import ArticleSerializer, RoomSerializer, FollowedSerializer

class GetAllRoomsView(ListAPIView):
  serializer_class = RoomSerializer
  queryset = Room.objects.all()[:5]

class ArticleTestView(ListAPIView):
  serializer_class = RoomSerializer

  def get_queryset(self):
      return get_list_or_404(Article, room=self.kwargs.get('pk'))

class ArticlesViewSet(ModelViewSet):
  serializer_class = ArticleSerializer
  queryset = Article.objects.all()


  def get_queryset(self):
    room = self.kwargs.get('pk')
    return get_list_or_404(Article, room=room)



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

