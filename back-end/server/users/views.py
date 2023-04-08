from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from api.authentication import CustomAuthentication
from rest_framework import status
from .serializer import UserSerializerCreate, UserSerializer, ListUserSerializer, FollowUserSerializer
from rest_framework.generics import CreateAPIView, ListAPIView
from .models import User, Followed
from room.models import Followed as RoomFollows
from room.serializer import RoomSerializer, RoomListSerializer
from rest_framework.permissions import IsAuthenticated
# Create your views here.


class CreateUserView(CreateAPIView):
    serializer_class = UserSerializerCreate
    queryset = User.objects.all()


class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    def get_object(self):
        pk = self.kwargs['user']
        queryset = self.queryset
        return queryset.get(pk=pk)

    @action(detail=True, methods=['GET'])
    def list(self, request):
        limit = int(self.request.GET.get("limit"))
        offset = int(self.request.GET.get("offset"))
        users = self.get_queryset()[offset:offset+limit]
        instance = {"nrOfUsers": users.count(), "users": self.get_serializer(users, many=True, context={'user': self.request.user.pk}).data}
        user_serialized = ListUserSerializer(instance=instance)
        return Response(user_serialized.data)


class FollowedViewSet(ModelViewSet):
    serializer_class = FollowUserSerializer
    queryset = Followed.objects.all()

    @action(detail=True, methods=['POST'], permission_classes=[CustomAuthentication, IsAuthenticated])
    def create(self, request):
        id = self.request.data['id']
        if request.user.pk is id:
            return
        followed = get_object_or_404(User, pk=id)
        try:
            user =request.user
            Followed.objects.get(following=followed.pk, follower=user.pk).delete()
            return Response('Unfollowed')
        except ObjectDoesNotExist:
            serializer = FollowUserSerializer(
                data={'following': followed.pk, 'follower': user.pk})
            if serializer.is_valid():
                serializer.save()
                return Response('Followed')
            return Response('Oops somehting went wrong', status=status.HTTP_404_NOT_FOUND)
        
    @action(detail=True, methods=['GET'])
    def user_followed_rooms(self, request):
        pk = int(self.request.GET.get("user_pk"))
        user_follows = RoomFollows.objects.prefetch_related('room').filter(user=pk)
        rooms = []
        for user_follow in user_follows:
            rooms.append(RoomSerializer(user_follow.room).data)
        serializer = RoomListSerializer({'nrOfObjects': len(user_follows), 'rooms': rooms})
        return Response(serializer.data)

    @action(detail=True, methods=['GET'])
    def followed(self, request):
        user_pk = self.request.GET.get("pk")
        user = get_object_or_404(User, pk=user_pk)
        user_folows = User.objects.filter(followers=user.pk)
        instance = {"nrOfUsers": user_folows.count(), "users": UserSerializer(user_folows, many=True, context={'user': request.user.pk}).data}
        serializer = ListUserSerializer(instance=instance)
        return Response(serializer.data)