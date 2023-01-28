from .serializer import UserSerializerCreate, UserSerializer
from rest_framework.generics import CreateAPIView, ListAPIView, RetrieveAPIView
from .models import User
from api.authentication import CustomAuthentication
# Create your views here.

class CreateUserView(CreateAPIView):
    serializer_class = UserSerializerCreate
    queryset = User.objects.all()

class ListAllUsers(ListAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.all()

class RetriveUser(RetrieveAPIView):
    serializer_class = UserSerializer
    queryset = User.objects.get()