from re import I
from .models import Article
from rest_framework.serializers import ModelSerializer


class ArticleSerializer(ModelSerializer):
    class Meta:
        model = Article
        fields = ('__all__')
