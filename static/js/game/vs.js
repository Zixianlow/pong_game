
export function initPongGameVS(player1 = null, player2 = null, socketuser = null, token = null) {
    // Game state
    console.log("PONG GAME VS INITIALIZE");
    let isTournament = false;
    if (player1 != null && player2 != null) isTournament = true;

    const state = {
        paused: false,
        gameOver: false,
        scores: { player1: 0, player2: 0 },
        paddleSpeed: 0.1,
        ballSpeed: { x: 0.05, y: 0.05 },
        type: 'state_update'
    };

    const wsProtocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    let socket = new WebSocket(`${wsProtocol}${window.location.host}/ws/api/pong/?token=${token}`);

    // WebSocket Event Handlers
    socket.onerror = function(error) {
        console.error('WebSocket error:', error);
    };

    socket.onopen = function() {
        console.log('WebSocket connection established');
    };

    socket.onclose = function(e) {
        console.log('Socket closed. Reconnecting in 1 second.', e.reason);
        setTimeout(() => {
            socket = new WebSocket(`${wsProtocol}${window.location.host}/ws/api/pong/?token=${token}`);
        }, 1000);
    };

    socket.onmessage = function(e) {
        try {
            const data = JSON.parse(e.data);
            if (data.type === 'start_game') {
                scene.add(ball);
            } else if (data.type === 'score_update') {
                state.scores.player1 = data.player1_score;
                state.scores.player2 = data.player2_score;
                updateScoreboard();
            } else if (data.type === 'state_update') {
                if (data.paddle1 && data.paddle2 && data.ball) {
                    paddle1.position.y = data.paddle1.y;
                    paddle2.position.y = data.paddle2.y;
                    ball.position.x = data.ball.x;
                    ball.position.y = data.ball.y;
                    state.ballSpeed.x = data.ballSpeed.x;
                    state.ballSpeed.y = data.ballSpeed.y;
                }
            } else if (data.type === 'game_over') {
                state.gameOver = true;
                document.getElementById('gameOverModal').style.display = 'flex';
                document.getElementById('winner').textContent = data.winner;
            } else {
                console.error("Unexpected message type", data.type);
            }
        } catch (error) {
            console.error("Error processing message", error);
        }
    };

    let animationFrameId; // Variable to store the animation frame ID

    // Scene setup
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x000000);

    // Camera setup
    const camera = new THREE.PerspectiveCamera(30, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.rotation.x = THREE.MathUtils.degToRad(45);
    camera.position.y = -20;
    camera.position.z = 20;

    // Renderer setup
    const canvas = document.getElementById('pongCanvas');
    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true });
    renderer.setSize(canvas.clientWidth, canvas.clientHeight);

    // Game objects (initial setup will be done inside a reset function)
    let paddle1, paddle2, ball, centerLine, wall, wall2;

    // Function to reset the game state and scene
    function resetGame() {
        // Reset game state
        state.paused = false;
        state.gameOver = false;
        state.scores.player1 = 0;
        state.scores.player2 = 0;

        // Reset score display
        document.getElementById('player1Score').textContent = '0';
        document.getElementById('player2Score').textContent = '0';

        // Clear previous game objects if any
        if (paddle1) scene.remove(paddle1);
        if (paddle2) scene.remove(paddle2);
        if (wall) scene.remove(wall);
        if (wall2) scene.remove(wall2);
        if (ball) scene.remove(ball);
        if (centerLine) scene.remove(centerLine);
        
        // Recreate game objects
        paddle1 = createPaddle(-7);
        paddle2 = createPaddle(7);
        ball = createBall();
        centerLine = createCenterLine();
        wall = createWall(3);
        wall2 = createWall(-3)

        // Add new objects to the scene
        scene.add(paddle1, paddle2, ball, centerLine, wall, wall2);
        resetBall();
    }
    
    function createPaddle(x) {
        const geometry = new THREE.BoxGeometry(0.5, 2, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
        const paddle = new THREE.Mesh(geometry, material);
        paddle.position.x = x;
        return paddle;
    }

    function createWall(x) {
        const geometry = new THREE.BoxGeometry(15, 0.2, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: 0x808080 });
        const wall = new THREE.Mesh(geometry, material);
        wall.position.y = x;
        return wall;
    }

    function createBall() {
        const geometry = new THREE.SphereGeometry(0.3, 16, 16);
        const material = new THREE.MeshBasicMaterial({ color: 0xffffff });
        return new THREE.Mesh(geometry, material);
    }

    function createCenterLine() {
        const geometry = new THREE.PlaneGeometry(0.1, 6);
        const material = new THREE.MeshBasicMaterial({
            color: 0xffffff,
            transparent: true,
            opacity: 0.3
        });
        const line = new THREE.Mesh(geometry, material);
        line.position.x = 0;
        return line;
    }

    function resetBall() {
        ball.position.set(0, 0, 0);
        state.ballSpeed.x = 0.05 * (Math.random() > 0.5 ? 1 : -1);
        state.ballSpeed.y = 0.05 * (Math.random() > 0.5 ? 1 : -1);
    }

    function updateScore(player) {
        if (player === 1) state.scores.player1 += 5;
        else state.scores.player2 += 5;

        document.getElementById('player1Score').textContent = state.scores.player1;
        document.getElementById('player2Score').textContent = state.scores.player2;

        if (state.scores.player1 >= 11 || state.scores.player2 >= 11) {
            endGame();
        } else {
            resetBall();
        }

        const gamestate = {
            paddle1: { y: paddle1.position.y },
            paddle2: { y: paddle2.position.y },
            scores: { player1: state.scores.player1, player2: state.scores.player2 },
            ball: { x: ball.position.x, y: ball.position.y },
            ballSpeed: { x: state.ballSpeed.x, y: state.ballSpeed.y },
            type: 'state_update'
        };
        socket.send(JSON.stringify(gamestate));
    }

    function endGame() {
        state.gameOver = true;
        const p1 = player1 ? player1 : 'Player 1';
        const p2 = player2 ? player2 : 'Player 2';
        const winner = state.scores.player1 > state.scores.player2 ? p1 : p2;
        const overlay = document.getElementById('gameOverlay');
        const message = document.getElementById('overlayMessage');

        message.textContent = `${winner} Wins!`;
        overlay.style.display = 'flex';
    }

    // Handle Ball movement and collisions
    function updateBall() {
        if (state.gameOver) return;

        ball.position.x += state.ballSpeed.x;
        ball.position.y += state.ballSpeed.y;

        // Wall collisions
        if (ball.position.y >= 2.85 || ball.position.y <= -2.85) {
            state.ballSpeed.y *= -1;
        }

        // Paddle collisions
        if (ball.position.x <= -6.85 && ball.position.x >= -7.0) {
            if (ball.position.y <= paddle1.position.y + 1 &&
                ball.position.y >= paddle1.position.y - 1) {
                state.ballSpeed.x *= -1.05;
                state.ballSpeed.y = (ball.position.y - paddle1.position.y) * 0.5;
            }
        }

        if (ball.position.x >= 6.85 && ball.position.x <= 7.0) {
            if (ball.position.y <= paddle2.position.y + 1 &&
                ball.position.y >= paddle2.position.y - 1) {
                state.ballSpeed.x *= -1.05;
                state.ballSpeed.y = (ball.position.y - paddle2.position.y) * 0.5;
            }
        }

        // Scoring
        if (ball.position.x < -8) updateScore(2);
        if (ball.position.x > 8) updateScore(1);
    }
    // Input handling
    const keys = {};
    window.addEventListener('keydown', e => keys[e.code] = true);
    window.addEventListener('keyup', e => keys[e.code] = false);

    function handleInput() {
        // Player 1 controls (W/S)
        if (keys['KeyW'] && paddle1.position.y < 2) paddle1.position.y += statess.paddleSpeed;
        if (keys['KeyS'] && paddle1.position.y > -2) paddle1.position.y -= statess.paddleSpeed;

        // Player 2 controls (Arrow Up/Down)
        if (keys['ArrowUp'] && paddle2.position.y < 2) paddle2.position.y += statess.paddleSpeed;
        if (keys['ArrowDown'] && paddle2.position.y > -2) paddle2.position.y -= statess.paddleSpeed;
    }

    let gameLoopInterval;

    function animate() {
        const interval = 1000 / 60; // Run at 60 FPS
        gameLoopInterval = setInterval(() => {
            if (state.gameOver) {
                clearInterval(gameLoopInterval); // Stop the loop when game is over or paused
                return;
            }

            if (!state.paused && !state.gameOver) {
                handleInput();
                updateBall();
            }

            renderer.render(scene, camera);
        }, interval);
    }

    // Handle window resize
    function onWindowResize() {
        const container = document.getElementById('gameContainer');
        const aspect = container.clientWidth / container.clientHeight;

        camera.left = -aspect;
        camera.right = aspect;
        camera.updateProjectionMatrix();

        renderer.setSize(container.clientWidth, container.clientHeight);
    }

    window.addEventListener('resize', onWindowResize);
    onWindowResize();

    // Animation
    resetGame();
    animate();
}
