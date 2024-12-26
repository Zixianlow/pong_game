from django.urls import path, re_path
from .consumer import *

websocket_urlpatterns = [
    path("ws/online/", OnlineConsumer.as_asgi()),
]