from django.core.exceptions import ObjectDoesNotExist
from django.shortcuts import get_object_or_404
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from rest_framework.response import Response
from api.authentication import CustomAuthentication
from .serializer import UserSerializerCreate, UserSerializer, ListUserSerializer, FollowedUserSerializer
from rest_framework.generics import CreateAPIView, ListAPIView
from .models import User, Followed
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
    serializer_class = FollowedUserSerializer
    queryset = Followed.objects.all()

    @action(detail=True, methods=['POST'], permission_classes=[CustomAuthentication])
    def create(self, request):
        try:
            followed = User.objects.get(id=self.request.data['id'])
            user = request.user.pk
            Followed.objects.get(following=followed, follower=user).delete()
            return Response('Unfollowed')
        except ObjectDoesNotExist:
            followed = User.objects.get(id=request.data['id'])
            serializer = FollowedUserSerializer(
                data={'following': followed, 'follower': request.user.pk})
            if serializer.is_valid():
                serializer.save()
            return Response('Followed')
    
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
            users.append(UserSerializer(user_follow.follower).data)
        instance = {"nrOfUsers": len(users), "users": users}
        serializer = ListUserSerializer(instance=instance)
        return Response(serializer.data)