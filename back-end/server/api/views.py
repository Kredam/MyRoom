from rest_framework.response import Response
from rest_framework import status
from rest_framework.views import APIView
from django.contrib.auth import authenticate
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.views import TokenRefreshView
from rest_framework.decorators import api_view
from server.settings import SIMPLE_JWT

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
  routes = [
    'api/token',
    'api/token/refresh',
  ]
  return Response(routes)

def get_tokens_for_user(user):
    refresh = RefreshToken.for_user(user)
    return {
        'refresh': str(refresh),
        'access': str(refresh.access_token),
    }

class CustomTokenView(TokenRefreshView):
  def post(self, request, *args, **kwargs):
    request.data.update({"refresh": request.COOKIES.get("refresh_token")})
    print(request.COOKIES)
    return super().post(request, *args, **kwargs)


class LoginView(APIView):
  def post(self, request):
    response = Response()
    username = request.data.get("username")
    password = request.data.get("password")
    user = authenticate(username=username, password=password)
    if user is not None:
      if user.is_active:
        token = get_tokens_for_user(user=user)
        response.set_cookie(
          key = SIMPLE_JWT["AUTH_COOKIE"],
          value = token["refresh"],
          expires = SIMPLE_JWT['ACCESS_TOKEN_LIFETIME'],
          secure = SIMPLE_JWT['AUTH_COOKIE_SECURE'],
          httponly = SIMPLE_JWT['AUTH_COOKIE_HTTP_ONLY'],
          samesite = SIMPLE_JWT['AUTH_COOKIE_SAMESITE'],
        )
        response.data = token
        return response
      else:
        return Response({"Not active": "This account is not active"}, status=status.HTTP_404_NOT_FOUND)
    else:
      return Response({"No user": "No such user"}, status=status.HTTP_404_NOT_FOUND)

