import json
from channels.generic.websocket import WebsocketConsumer
from channels.db import database_sync_to_async
from django.contrib.auth.models import AnonymousUser
from django.conf import settings
import jwt
from django.contrib.auth import get_user_model

User = get_user_model()

class PongConsumer(WebsocketConsumer):
    players = []
    score = {'player1': 0, 'player2': 0}
    game_active = False
    player1_name = None
    player2_name = None

    def connect(self):
        self.user = self.scope['user']
        if len(self.players) < 2:
            self.players.append(self)
            self.accept()

            if len(self.players) == 1:
                self.player = 1
                PongConsumer.player1_name = self.user.username
                # self.user.matches_played += 1
                # self.user.save()
            else:
                self.player = 2
                PongConsumer.player2_name = self.user.username
                # self.user.matches_played += 1
                # self.user.save()

            if len(self.players) == 2:
                self.start_game()
        else:
            self.close()

    def disconnect(self, close_code):
        if self in self.players:
            self.players.remove(self)

    def receive(self, text_data):
        if not self.game_active:
            return

        data = json.loads(text_data)

        if 'reset' in data:
            if data['reset'] == 'player1':
                self.score['player1'] += 1
            elif data['reset'] == 'player2':
                self.score['player2'] += 1

            if self.score['player1'] >= 11 or self.score['player2'] >= 11:
                self.end_game()

            self.broadcast_score()

        for player in self.players:
            player.send(text_data=json.dumps(data))

    def start_game(self):
        self.game_active = True
        initial_state = {
            'paddle1': {'y': 0},
            'paddle2': {'y': 0},
            'ball': {'x': 0, 'y': 0},
            'ballSpeed' : {'x': 0.05, 'y': 0.05},
            'scores': self.score
        }
        for player in self.players:
            player.send(text_data=json.dumps({'type': 'start_game', **initial_state}))
            player.send(text_data=json.dumps({'type': 'state_update', **initial_state}))

    def end_game(self):
        self.game_active = False
        winner = PongConsumer.player1_name if self.score['player1'] > self.score['player2'] else PongConsumer.player2_name

        # if self.user.username == winner:
        #     self.user.wins += 1
        #     self.user.save()
        #     loser = User.objects.get(username=PongConsumer.player2_name if self.user.username == PongConsumer.player1_name else PongConsumer.player1_name)
        #     loser.losses += 1
        #     loser.save()
        # else:
        #     self.user.losses += 1
        #     self.user.save()
        #     winner_user = User.objects.get(username=winner)
        #     winner_user.wins += 1
        #     winner_user.save()

        game_over_message = {
            'type': 'game_over',
            'winner': winner,
            'player1_score': self.score['player1'],
            'player2_score': self.score['player2']
        }
        for player in self.players:
            player.send(text_data=json.dumps(game_over_message))

    def broadcast_score(self):
        score_update = {
            'type': 'score_update',
            'player1_score': self.score['player1'],
            'player2_score': self.score['player2']
        }
        for player in self.players:
            player.send(text_data=json.dumps(score_update))


class PongConsumerLocal(WebsocketConsumer):
    players = []
    score = {'player1': 0, 'player2': 0}
    game_active = False
    player1_name = None
    player2_name = None

    def connect(self):
        self.user = self.scope['user']
        if len(self.players) < 2:
            self.players.append(self)
            self.accept()

            if len(self.players) == 1:
                self.player = 1
                PongConsumerLocal.player1_name = self.user.username
                # self.user.matches_played += 1
                # self.user.save()
            else:
                self.player = 2
                PongConsumerLocal.player2_name = self.user.username
                # self.user.matches_played += 1
                # self.user.save()

            self.start_game()
        else:
            self.close()

    def disconnect(self, close_code):
        if self in self.players:
            self.players.remove(self)

    def receive(self, text_data):
        if not self.game_active:
            return

        data = json.loads(text_data)

        if 'reset' in data:
            if data['reset'] == 'player1':
                self.score['player1'] += 1
            elif data['reset'] == 'player2':
                self.score['player2'] += 1

            if self.score['player1'] >= 11 or self.score['player2'] >= 11:
                self.end_game()

            self.broadcast_score()

        for player in self.players:
            player.send(text_data=json.dumps(data))

    def start_game(self):
        self.game_active = True
        initial_state = {
            'paddle1': {'y': 0},
            'paddle2': {'y': 0},
            'ball': {'x': 0, 'y': 0},
            'ballSpeed' : {'x': 0.05, 'y': 0.05},
            'scores': self.score
        }
        for player in self.players:
            player.send(text_data=json.dumps({'type': 'start_game', **initial_state}))
            player.send(text_data=json.dumps({'type': 'state_update', **initial_state}))

    def end_game(self):
        self.game_active = False
        winner = PongConsumerLocal.player1_name if self.score['player1'] > self.score['player2'] else PongConsumer.player2_name

        # if self.user.username == winner:
        #     self.user.wins += 1
        #     self.user.save()
        #     loser = User.objects.get(username=PongConsumer.player2_name if self.user.username == PongConsumer.player1_name else PongConsumer.player1_name)
        #     loser.losses += 1
        #     loser.save()
        # else:
        #     self.user.losses += 1
        #     self.user.save()
        #     winner_user = User.objects.get(username=winner)
        #     winner_user.wins += 1
        #     winner_user.save()

        game_over_message = {
            'type': 'game_over',
            'winner': winner,
            'player1_score': self.score['player1'],
            'player2_score': self.score['player2']
        }
        for player in self.players:
            player.send(text_data=json.dumps(game_over_message))

    def broadcast_score(self):
        score_update = {
            'type': 'score_update',
            'player1_score': self.score['player1'],
            'player2_score': self.score['player2']
        }
        for player in self.players:
            player.send(text_data=json.dumps(score_update))
