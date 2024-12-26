from django.db import models
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    auth_token = models.CharField(max_length=150, blank=True, null=True)
    bio = models.TextField(max_length=500, default='The User doesnt change the bio yet')
    total_matches = models.IntegerField(default=0)
    wins = models.IntegerField(default=0)
    points = models.IntegerField(default=0)
