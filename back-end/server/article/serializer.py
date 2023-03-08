from re import I
from .models import Article, Comments
from rest_framework.serializers import ModelSerializer


class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = ('__all__')

class CommentsSerializer(ModelSerializer):
    class Meta:
        model = Comments
        fields = ('__all__')
