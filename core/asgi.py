"""
ASGI config for core project.

It exposes the ASGI callable as a module-level variable named ``application``.

For more information on this file, see
https://docs.djangoproject.com/en/4.2/howto/deployment/asgi/
"""

import os

from django.core.asgi import get_asgi_application
from channels.routing import ProtocolTypeRouter, URLRouter
from channels.auth import AuthMiddlewareStack
from channels.security.websocket import AllowedHostsOriginValidator

os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'core.settings')

django_asgi_app = get_asgi_application()

# Import routing modules with explicit aliases
from match_app import routing as match_routing
from users_app import routing as users_routing
# from chat_app import routing as chat_routing
from pong_app import routing as pong_routing

# Combine WebSocket URL patterns from multiple apps
# websocket_urlpatterns = match_routing.websocket_urlpatterns + users_routing.websocket_urlpatterns
# websocket_urlpatterns = match_routing.websocket_urlpatterns + users_routing.websocket_urlpatterns + chat_routing.websocket_urlpatterns
websocket_urlpatterns = match_routing.websocket_urlpatterns + users_routing.websocket_urlpatterns + pong_routing.websocket_urlpatterns


# application = ProtocolTypeRouter({
#     "http": django_asgi_app,
#     "websocket": AllowedHostsOriginValidator(
#         AuthMiddlewareStack(URLRouter(websocket_urlpatterns))
#     ),
# })
from users_app.middleware import JWTAuthMiddleware

application = ProtocolTypeRouter({
    "http": get_asgi_application(),
    "websocket": AllowedHostsOriginValidator(
        JWTAuthMiddleware(
            URLRouter(
                websocket_urlpatterns
            )
        )
    ),
})

