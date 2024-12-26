import json
from channels.generic.websocket import WebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.conf import settings
import jwt
from django.contrib.auth import get_user_model

User = get_user_model()

class OnlineConsumer(WebsocketConsumer):
    online_users = set()

    def connect(self):
        self.user = self.get_user_from_jwt()
        if self.user and self.user.is_authenticated:
            OnlineConsumer.online_users.add(self.user.username)
            self.accept()
        else:
            self.close()

    def disconnect(self, close_code):
        if self.user and self.user.is_authenticated:
            OnlineConsumer.online_users.discard(self.user.username)

    def receive(self, text_data):
        try:
            data = json.loads(text_data)
            if data.get('type') == 'check_user_online':
                username_to_check = data.get('username')
                response = {
                    'type': 'user_online_status',
                    'username': username_to_check,
                    'is_online': username_to_check in OnlineConsumer.online_users
                }
                self.send(text_data=json.dumps(response))
        except (json.JSONDecodeError, KeyError) as e:
            self.send(text_data=json.dumps({
                'type': 'error',
                'message': f'Invalid data received: {str(e)}'
            }))

    @classmethod
    def get_online_users(cls):
        """
        Return the list of users who are online.
        """
        return User.objects.filter(username__in=cls.online_users)

    def get_user_from_jwt(self):
        """
        Extract the JWT from the query string or headers, validate it, and return the user.
        """
        token = self.scope['query_string'].decode().split('token=')[-1] if 'token=' in self.scope['query_string'].decode() else None
        
        if not token:
            return AnonymousUser()

        try:
            # Decode the JWT
            decoded_token = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
            user_id = decoded_token.get("user_id")

            # Fetch the user instance
            if user_id:
                user = User.objects.get(id=user_id)
                return user
        except (jwt.ExpiredSignatureError, jwt.DecodeError, User.DoesNotExist):
            return AnonymousUser()

