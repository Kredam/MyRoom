from django.shortcuts import get_list_or_404, get_object_or_404
from rest_framework.decorators import action
from rest_framework.generics import ListAPIView
from rest_framework.response import Response
from rest_framework.viewsets import ModelViewSet
from rest_framework.permissions import IsAuthenticated
from .models import Room, Followed
from article.models import Article
from .serializer import RoomSerializer, FollowedSerializer
from article.serializer import ArticleSerializer

class GetAllRoomsView(ListAPIView):
  serializer_class = RoomSerializer
  queryset = Room.objects.all()[:5]


class ArticlesViewSet(ModelViewSet):
  serializer_class = ArticleSerializer
  queryset = Article.objects.all()

  def get_object(self):
    pk = self.kwargs["pk"]
    return get_object_or_404(Article, id=pk)

  def get_queryset(self):
    room = self.kwargs.get('pk')
    return get_list_or_404(Article, room=room)

  @action(detail=True, methods=['post'], permission_classes=[IsAuthenticated])
  def follow(self, request, pk=None):
    room = Room.objects.get(name=request.data['name'])
    admin = request.data['isAdmin']
    serializer = FollowedSerializer(data={'room':room, 'user':request.user.pk, 'isAdmin':admin})
    print(serializer.initial_data)
    if serializer.is_valid():
      print(serializer.validated_data)
      serializer.save()
      return Response('Successfull follow')
    print(serializer.errors)
    return Response("Not Successfull")


class RoomViewSet(ModelViewSet):
  queryset = Room.objects.all()
  serializer_class = FollowedSerializer

    
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

