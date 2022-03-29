from .serializer import UserSerializer
from rest_framework.generics import CreateAPIView, ListAPIView
from .models import User
# Create your views here.

class CreateUserView(CreateAPIView):
  serializer_class = UserSerializer
  queryset = User.objects.all()

class ListAllUsers(ListAPIView):
  serializer_class = UserSerializer
  queryset = User.objects.all()

