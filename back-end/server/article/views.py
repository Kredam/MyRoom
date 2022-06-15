from rest_framework.viewsets import ModelViewSet
from .models import Article
from .serializer import ArticleSerializer
from rest_framework.response import Response
from rest_framework.decorators import action

class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    @action(detail=False)
    def get_details(self, request, pk=None):
        article = Article.objects.get(id=pk)
        serialized = self.get_serializer(article, many=False)
        return Response(serialized.data)
        # return Response("serialized.data")
    