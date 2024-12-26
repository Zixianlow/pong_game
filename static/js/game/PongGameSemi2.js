import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

export function initPongGameSemi2(player1 = null, player2 = null, semi1 = null, semi2 = null, gametype = null) {
    // Game statess
    console.log("PONG GAME SEMI 2 INITIALISE");
    let isTournament = false;
    if (player1 != null && player2 != null) isTournament = true;

    const statess = {
        paused: false,
        gameOver: false,
        scores: { player1: 0, player2: 0 },
        paddleSpeed: 0.1,
        ballSpeed: { x: 0.05, y: 0.05 }
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

    // Function to reset the game statess and scene
    function resetGame() {
        // Reset game statess
        statess.paused = false;
        statess.gameOver = false;
        statess.scores.player1 = 0;
        statess.scores.player2 = 0;

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
        statess.ballSpeed.x = 0.05 * (Math.random() > 0.5 ? 1 : -1);
        statess.ballSpeed.y = 0.05 * (Math.random() > 0.5 ? 1 : -1);
    }

    function updateScore(player) {
        if (player === 1) statess.scores.player1 += 5;
        else statess.scores.player2 += 5;

        document.getElementById('player1Score').textContent = statess.scores.player1;
        document.getElementById('player2Score').textContent = statess.scores.player2;

        if (statess.scores.player1 >= 11 || statess.scores.player2 >= 11) {
            endGame();
        } else {
            resetBall();
        }
    }

    function endGame() {
        statess.gameOver = true;
        const p1 = player1 ? player1 : 'Player 1';
        const p2 = player2 ? player2 : 'Player 2';
        const winner = statess.scores.player1 > statess.scores.player2 ? p1 : p2;
        const overlay = document.getElementById('gameOverlay');
        const message = document.getElementById('overlayMessage');
        
        if (gametype == 'semi1') semi1 = winner;
        if (gametype == 'semi2') semi2 = winner;

        message.textContent = `${winner} Wins!`;
        overlay.style.display = 'flex';
    }

    function handleInput() {
        // Player 1 controls (W/S)
        if (keys['KeyW'] && paddle1.position.y < 2) paddle1.position.y += statess.paddleSpeed;
        if (keys['KeyS'] && paddle1.position.y > -2) paddle1.position.y -= statess.paddleSpeed;

        // Player 2 controls (Arrow Up/Down)
        if (keys['ArrowUp'] && paddle2.position.y < 2) paddle2.position.y += statess.paddleSpeed;
        if (keys['ArrowDown'] && paddle2.position.y > -2) paddle2.position.y -= statess.paddleSpeed;
    }

    function updateBall() {
        if (statess.gameOver)
            return ;

        ball.position.x += statess.ballSpeed.x;
        ball.position.y += statess.ballSpeed.y;

        // Wall collisions
        if (ball.position.y >= 2.85 || ball.position.y <= -2.85) {
            statess.ballSpeed.y *= -1;
        }

        // Paddle collisions
        if (ball.position.x <= -6.85 && ball.position.x >= -7.0) {
            if (ball.position.y <= paddle1.position.y + 1 &&
                ball.position.y >= paddle1.position.y - 1) {
                statess.ballSpeed.x *= -1.05; // Increase speed slightly
                statess.ballSpeed.y = (ball.position.y - paddle1.position.y) * 0.5; // Add spin
            }
        }

        if (ball.position.x >= 6.85 && ball.position.x <= 7.0) {
            if (ball.position.y <= paddle2.position.y + 1 &&
                ball.position.y >= paddle2.position.y - 1) {
                statess.ballSpeed.x *= -1.05; // Increase speed slightly
                statess.ballSpeed.y = (ball.position.y - paddle2.position.y) * 0.5; // Add spin
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

    // Button handlers
    document.getElementById('pauseBtn')?.addEventListener('click', () => {
        statess.paused = !statess.paused;
        const btn = document.getElementById('pauseBtn');
        btn.innerHTML = statess.paused ?
            '<i class="bi bi-play-fill"></i> Resume' :
            '<i class="bi bi-pause-fill"></i> Pause';
    });

    document.getElementById('resetBtn')?.addEventListener('click', () => {
        resetGame();
        document.getElementById('gameOverlay').style.display = 'none';
    });

    document.getElementById('restartBtn')?.addEventListener('click', () => {
        resetGame();
        document.getElementById('gameOverlay').style.display = 'none';
    });

    document.getElementById('proceedBtn')?.addEventListener('click', () => {
        if (semi1 == "null") semi1 = null;
        if (semi2 == "null") semi2 = null;
        
        if (gametype == "final")
            window.location.href = '#/';
        else
            window.location.href = '#/tournament/brackets?semi1=' + semi1 + '&semi2=' + semi2;
    });

    // Animation loop
    function animate() {
        if (statess.gameOver)
            return ;

        animationFrameId = requestAnimationFrame(animate);

        if (!statess.paused && !statess.gameOver) {
            handleInput();
            updateBall();
        }

        renderer.render(scene, camera);
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

    // Cancel any ongoing animation frame before starting a new one
    if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
    }

    // Reset the game and start the animation
    resetGame();
    animate();
}
