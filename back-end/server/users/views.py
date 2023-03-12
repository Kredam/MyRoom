from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from api.authentication import CustomAuthentication
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

    @action(detail=True, methods=['POST'])
    def list(self, request):
        limit = request.data['limit']
        offset = request.data['offset']
        users = self.get_queryset()[offset:offset+limit]
        instance = {"nrOfUsers": len(users), "users": users}
        user_serialized = ListUserSerializer(instance)
        return Response(user_serialized.data)


class FollowedViewSet(ModelViewSet):
    serializer_class = FollowUserSerializer
    queryset = Followed.objects.all()

    @action(detail=True, methods=['POST'], permission_classes=[CustomAuthentication, IsAuthenticated])
    def create(self, request):
        id = self.request.data['id']
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
            return Response('Oops somehting went wrong')
        
    @action(detail=True, methods=['POST'])
    def user_followed_rooms(self, request):
        pk = request.data['user_pk']
        limit = request.data['limit']
        offset = request.data['offset']
        user_follows = RoomFollows.objects.prefetch_related('room').filter(user=pk)[offset:limit+offset]
        rooms = []
        for user_follow in user_follows:
            rooms.append(RoomSerializer(user_follow.room).data)
        serializer = RoomListSerializer({'nrOfObjects': len(rooms), 'rooms': rooms})
        return Response(serializer.data)

    @action(detail=True, methods=['post'])
    def followed(self, request):
        user_pk = request.data['pk']
        limit = request.data['limit']
        offset = request.data['offset']
        user = get_object_or_404(User, pk=user_pk)
        user_folows = Followed.objects.select_related('follower').filter(follower=user)[offset:limit+offset]
        users = []
        for user_follow in user_folows:
            if request.user.is_authenticated:
                serializer = UserSerializer(instance=user_follow.follower, context={'user': request.user})
                users.append(serializer.data)
                continue
            users.append(UserSerializer(user_follow.following).data)
        instance = {"nrOfUsers": len(users), "users": users}
        serializer = ListUserSerializer(instance=instance)
        return Response(serializer.data)