from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated
from django.contrib.auth import get_user_model
from rest_framework.exceptions import NotAuthenticated
from .consumer import OnlineConsumer

User = get_user_model()

class CurrentUserView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            raise NotAuthenticated("Authorization header missing or invalid")

        token = auth_header.split(' ')[1]
        try:
            user = User.objects.get(auth_token=token)
        except User.DoesNotExist:
            raise NotAuthenticated("Invalid token")

        return Response({'username': user.username, 'email': user.email, 'bio': user.bio})


class CurrentUserStatsView(APIView):
    permission_classes = [IsAuthenticated]

    def get(self, request):
        auth_header = request.headers.get('Authorization')
        if not auth_header or not auth_header.startswith('Bearer '):
            raise NotAuthenticated("Authorization header missing or invalid")

        token = auth_header.split(' ')[1]
        try:
            user = User.objects.get(auth_token=token)
            total_matches = user.total_matches
            wins = user.wins
            points = user.points
            winRate = wins/total_matches if total_matches > 0 else 0
        except User.DoesNotExist:
            raise NotAuthenticated("Invalid token")

        return Response({'totalMatches': total_matches, 'wins': wins, 'points': points, 'winRate': 0})


class UsersOnlineView(APIView):
    def get(self, request):
        """
        Returns the list of online users with their details.
        """
        online_users = OnlineConsumer.get_online_users()
        response = [
            {
                'id': user.id,
                'name': user.get_full_name() or user.username,
                'username': user.username,
                'avatar': user.profile.avatar_url if hasattr(user, 'profile') else 'https://via.placeholder.com/150',
                'status': 'Online',  # Static "Online" status for simplicity
                'rank': user.profile.rank if hasattr(user, 'profile') else 'Unranked',
                'elo': user.profile.elo if hasattr(user, 'profile') else 1000
            }
            for user in online_users
        ]

        return Response(response)