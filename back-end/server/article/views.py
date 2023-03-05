from rest_framework.viewsets import ModelViewSet
from .models import Article
from .serializer import ArticleSerializer
from rest_framework.response import Response
from rest_framework.decorators import action
from api.authentication import CustomAuthentication


class ArticleViewSet(ModelViewSet):
    queryset = Article.objects.all()
    serializer_class = ArticleSerializer

    @action(detail=False)
    def get_details(self, request, pk=None):
        article = Article.objects.get(id=pk)
        serialized = self.get_serializer(article, many=False)
        return Response(serialized.data)
        # return Response("serialized.data")

    @action(detail=True, methods=['POST'])
    def thread(self, request, pk=None):
        limit = request.data['limit']
        offset = request.data['offset']
        if CustomAuthentication().authenticate(request):
            return Response('user authenticated')
        else:
            articles = Article.objects.all()[offset:offset+limit]
            serialized = self.get_serializer(articles, many=True)
            return Response(serialized.data)
