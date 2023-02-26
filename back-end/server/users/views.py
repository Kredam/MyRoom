from .serializer import UserSerializerCreate, UserSerializer, ListUserSerializer
from rest_framework.generics import CreateAPIView, ListAPIView
from .models import User
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action
from api.authentication import CustomAuthentication
from rest_framework.response import Response
# Create your views here.

class CreateUserView(CreateAPIView):
    serializer_class = UserSerializerCreate
    queryset = User.objects.all()

class UserViewSet(ModelViewSet):
    serializer_class = UserSerializer
    queryset = User.objects.all()

    @action(detail=True, methods=['post'])
    def list(self, request):
        limit = request.data['limit']
        offset = request.data['offset']
        users = self.get_queryset()[offset:offset+limit]
        instance = {"nrOfUsers": len(users), "users": users}
        user_serialized = ListUserSerializer(instance)
        return Response(user_serialized.data)
