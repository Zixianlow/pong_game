/**
 * This file documents the expected response types from the API endpoints.
 * These are TypeScript-like definitions for documentation purposes.
 */

/**
 * @typedef {Object} User
 * @property {string} id - Unique identifier
 * @property {string} name - Display name
 * @property {string} username - Unique username
 * @property {string} avatar - URL to avatar image
 * @property {string} status - "Online" | "Offline" | "In Game"
 * @property {string} rank - "Bronze" | "Silver" | "Gold" | "Platinum" | "Diamond"
 * @property {number} elo - ELO rating
 */

/**
 * @typedef {Object} Message
 * @property {string} id - Message ID
 * @property {string} senderId - Sender's user ID
 * @property {string} recipientId - Recipient's user ID
 * @property {string} content - Message content
 * @property {string} timestamp - ISO date string
 * @property {string} status - "sent" | "delivered" | "read"
 * @property {string} senderName - Sender's display name
 * @property {string} senderAvatar - Sender's avatar URL
 */

/**
 * @typedef {Object} Room
 * @property {string} id - Room ID
 * @property {string} name - Room name
 * @property {string} host - Host's display name
 * @property {string} type - "Casual" | "Ranked" | "Tournament"
 * @property {string} status - "Waiting" | "In Progress" | "Finished"
 * @property {string} skill - Skill level requirement (e.g., "1500-1800 ELO")
 * @property {number} maxPlayers - Maximum number of players
 * @property {Array<User>} players - Currently joined players
 */

/**
 * @typedef {Object} Match
 * @property {string} id - Match ID
 * @property {User} opponent - Opponent details
 * @property {string} type - "Ranked" | "Casual" | "Tournament"
 * @property {number} playerScore - Current player's score
 * @property {number} opponentScore - Opponent's score
 * @property {string} result - "Won" | "Lost" | "Draw"
 * @property {string} date - ISO date string
 */

/**
 * @typedef {Object} Tournament
 * @property {string} id - Tournament ID
 * @property {string} name - Tournament name
 * @property {Array<User>} players - Participating players
 * @property {Array<Match>} matches - Tournament matches
 * @property {string} status - "Pending" | "In Progress" | "Completed"
 * @property {Object} settings - Tournament settings
 * @property {boolean} settings.thirdPlace - Whether to include third place match
 */

/**
 * @typedef {Object} Ranking
 * @property {string} league - Current league
 * @property {number} percentile - Top percentile
 * @property {number} progress - Progress to next rank (0-100)
 * @property {number} pointsToNext - Points needed for next rank
 * @property {number} globalRank - Global ranking position
 * @property {number} regionalRank - Regional ranking position
 * @property {number} elo - Current ELO rating
 */

/**
 * @typedef {Object} Stats
 * @property {number} totalMatches - Total matches played
 * @property {number} wins - Total wins
 * @property {number} losses - Total losses
 * @property {number} points - Total points earned
 * @property {number} winRate - Win rate percentage
 * @property {number} averageScore - Average score per game
 */

/**
 * Example API Responses:
 * 
 * GET /api/v1/messages/{userId}
 * Response: Array<Message>
 * 
 * GET /api/v1/rooms
 * Response: Array<Room>
 * 
 * GET /api/v1/users/{userId}/stats
 * Response: Stats
 * 
 * GET /api/v1/users/{userId}/ranking
 * Response: Ranking
 * 
 * GET /api/v1/matches/history/{userId}
 * Response: Array<Match>
 * 
 * GET /api/v1/tournaments/{id}
 * Response: Tournament
 */