from channels.generic.websocket import WebsocketConsumer
from django.shortcuts import get_object_or_404
from django.template.loader import render_to_string, get_template
from asgiref.sync import async_to_sync
import json
# from .models import *
import requests
from django.core.cache import cache
from .utils import check_if_friend, check_friend_request_sent
from time import sleep

