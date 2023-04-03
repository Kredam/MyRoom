# need to implement CSRF
from rest_framework.authentication import CSRFCheck
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework import exceptions
from channels.db import database_sync_to_async
from server.settings import SIMPLE_JWT
from django.core.exceptions import ObjectDoesNotExist
from rest_framework_simplejwt.tokens import UntypedToken, TokenError
from urllib.parse import parse_qs
from server.settings import SIMPLE_JWT, SECRET_KEY
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
import jwt

def enforce_csrf(request):
    check = CSRFCheck()
    check.process_request(request)
    reason = check.process_view(request, None, (), {})
    if reason:
        raise exceptions.PermissionDenied('CSRF failed: %s' % reason)


class CustomAuthentication(JWTAuthentication):
    def authenticate(self, request):
        header = self.get_header(request)

        if header is None:
            raw_token = request.COOKIES.get(SIMPLE_JWT['AUTH_COOKIE']) or None
        else:
            raw_token = self.get_raw_token(header)
        if raw_token is None:
            return None

        validated_token = self.get_validated_token(raw_token)
        enforce_csrf(request)
        return self.get_user(validated_token), validated_token

@database_sync_to_async
def get_user(user_id):
    try:
        return get_user_model().objects.get(pk=user_id)
    except ObjectDoesNotExist:
        return AnonymousUser()

class TokenAuthMiddleWare:
    def __init__(self, app):
        self.app = app

    async def __call__(self, scope, receive, send):
        # needs utf8 to decode from byte format b''
        user_id = -1
        try:
            raw_token = parse_qs(scope["query_string"].decode("utf8"))["token"][0]
            UntypedToken(raw_token)
            decode_token = jwt.decode(raw_token, SECRET_KEY, SIMPLE_JWT["ALGORITHM"])
            user_id = decode_token['user_id']
        except:
            print("Token is invalid")
        finally:
            user = await get_user(user_id)
            return await self.app(dict(scope, user=user), receive, send)
        