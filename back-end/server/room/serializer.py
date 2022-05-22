from .models import Article, Room, Followed
from rest_framework.serializers import ModelSerializer

class RoomSerializer(ModelSerializer):
  class Meta:
    model = Room
    fields = ('__all__')

class FollowedSerializer(ModelSerializer):
  class Meta:
    model = Followed
    fields = ['room', 'isAdmin']

class ArticleSerializer(ModelSerializer):
  class Meta:
    model = Article
    fields = ('__all__')