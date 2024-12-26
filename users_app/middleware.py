import jwt
from django.conf import settings
from django.contrib.auth import get_user_model
from django.contrib.auth.models import AnonymousUser
from channels.db import database_sync_to_async

User = get_user_model()

class JWTAuthMiddleware:
    """
    Custom middleware to authenticate users using JWT in Django Channels.
    """
    def __init__(self, inner):
        self.inner = inner

    async def __call__(self, scope, receive, send):
        # Extract the JWT token from query string
        query_string = scope.get('query_string', b'').decode()
        token = self.get_token_from_query_string(query_string)

        # Validate token and populate the user
        scope['user'] = await self.get_user_from_token(token)

        # Call the next layer
        return await self.inner(scope, receive, send)

    def get_token_from_query_string(self, query_string):
        """
        Parse the query string to extract the token.
        Example: ws://example.com/socket?token=<JWT>
        """
        for part in query_string.split('&'):
            if part.startswith('token='):
                return part.split('=')[1]
        return None

    @database_sync_to_async
    def get_user_from_token(self, token):
        """
        Decode the token and return the corresponding user.
        """
        if not token:
            return AnonymousUser()

        try:
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = decoded_token.get('user_id')
            if user_id:
                return User.objects.get(id=user_id)
        except (jwt.ExpiredSignatureError, jwt.DecodeError, User.DoesNotExist):
            return AnonymousUser()

        return AnonymousUser()

