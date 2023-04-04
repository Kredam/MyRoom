
from .models import RoomChat
from .serializers import RoomChatSerializer
from rest_framework.viewsets import ModelViewSet
from rest_framework.decorators import action

class RoomChatViewSet(ModelViewSet):
    queryset = RoomChat.objects.all()
    serializer_class = RoomChatSerializer

    def get_queryset(self):
        queryset = self.queryset
        room = self.kwargs["room"]
        query_set = queryset.filter(room=room)
        return query_set

