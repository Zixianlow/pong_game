# API Services Documentation

This directory contains all API service modules for communicating with the backend.

## Response Types

See `types/responses.js` for detailed documentation of all API response types.

## Services

### authService
- `login(credentials)`: Authenticates user and returns token
- `register(userData)`: Creates new user account
- `logout()`: Logs out current user
- `getCurrentUser()`: Gets current authenticated user

### messageService
- `getMessages(userId)`: Gets chat messages with specific user
- `sendMessage(recipientId, content)`: Sends new message
- `markAsRead(messageId)`: Marks message as read
- `deleteMessage(messageId)`: Deletes a message
- `getUnreadCount()`: Gets count of unread messages

### roomService
- `getRooms()`: Gets list of active game rooms
- `createRoom(roomData)`: Creates new game room
- `joinRoom(roomId)`: Joins existing room
- `leaveRoom(roomId)`: Leaves current room
- `getRoomDetails(roomId)`: Gets detailed room info
- `updateRoomSettings(roomId, settings)`: Updates room settings

### tournamentService
- `createTournament(tournamentData)`: Creates new tournament
- `getTournament(id)`: Gets tournament details
- `updateMatch(tournamentId, matchId, matchData)`: Updates match result
- `advanceRound(tournamentId, roundId)`: Advances tournament round
- `getTournamentResults(tournamentId)`: Gets tournament results

### userService
- `getProfile(userId)`: Gets user profile
- `updateProfile(userData)`: Updates user profile
- `getStats(userId)`: Gets user game statistics
- `getRanking(userId)`: Gets user ranking info
- `blockUser(userId)`: Blocks a user
- `unblockUser(userId)`: Unblocks a user
- `getBlockedUsers()`: Gets list of blocked users
- `getOnlinePlayers()`: Gets list of online players

## Error Handling

All services use the central error handling from `client.js`. Common error scenarios:

- 401: Unauthorized (redirects to login)
- 403: Forbidden
- 404: Not found
- 500: Server error

## Configuration

API configuration is centralized in `config.js`:
- Base URL
- API version
- Endpoints