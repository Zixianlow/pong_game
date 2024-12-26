from django.urls import path
from .views import CurrentUserView, CurrentUserStatsView, UsersOnlineView

urlpatterns = [
    path('me', CurrentUserView.as_view(), name='current_user'),
    path('me/stats', CurrentUserStatsView.as_view(), name='current_user_stats'),
    path('online', UsersOnlineView.as_view(), name='users_online'),
]