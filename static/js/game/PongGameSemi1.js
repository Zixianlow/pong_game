import * as THREE from 'https://unpkg.com/three@latest/build/three.module.js';

export function initPongGameSemi1(player1 = null, player2 = null, semi1 = null, semi2 = null, gametype = null) {
    // Game states
    console.log("PONG GAME SEMI 1 INITIALISE");
    let isTournament = false;
    if (player1 != null && player2 != null) isTournament = true;

    const states = {
        paused: false,
        gameOver: false,
        scores: { player1: 0, player2: 0 },
        paddleSpeed: 0.1,
        ballSpeed: { x: 0.05, y: 0.05 }
    };
    
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
    const debounceTime = 100;

    // Function to reset the game states and scene
    function resetGame() {
        // Reset game states
        states.paused = false;
        states.gameOver = false;
        states.scores.player1 = 0;
        states.scores.player2 = 0;

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
    }

    paddle1 = createPaddle(-7);
    paddle2 = createPaddle(7);
    ball = createBall();
    centerLine = createCenterLine();
    wall = createWall(3);
    wall2 = createWall(-3)

    // Add new objects to the scene
    scene.add(paddle1, paddle2, ball, centerLine, wall, wall2);
    //resetBall();

    function createPaddle(x) {
        const geometry = new THREE.BoxGeometry(0.5, 2, 0.5);
        const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
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

    function resetBall(type) {
        ball.position.set(0, 0, 0);
        if (type == 1){
            states.ballSpeed.x = 0.05;
            states.ballSpeed.y = 0.05;
        }
        else{
            states.ballSpeed.x = -0.05;
            states.ballSpeed.y = -0.05;
        }
    }

    function updateScore(player) {
        if (player === 1) states.scores.player1 += 5;
        else states.scores.player2 += 5;

        document.getElementById('player1Score').textContent = states.scores.player1;
        document.getElementById('player2Score').textContent = states.scores.player2;

        if (states.scores.player1 >= 11 || states.scores.player2 >= 11) {
            states.gameOver = true;
            endGame();
        } else {
            if (player === 1) resetBall(1);
            else resetBall(2);
        }
    }

    function endGame() {
        states.paused = true;
        states.gameOver = true;
        clearInterval(gameLoopInterval);

        const p1 = player1 ? player1 : 'Player 1';
        const p2 = player2 ? player2 : 'Player 2';
        const winner = states.scores.player1 > states.scores.player2 ? p1 : p2;
        const overlay = document.getElementById('gameOverlay');
        const message = document.getElementById('overlayMessage');
        
        if (gametype == 'semi1') semi1 = winner;
        if (gametype == 'semi2') semi2 = winner;

        if (overlay.style.display != 'flex'){
            message.textContent = `${winner} Wins!`;
            overlay.style.display = 'flex';
        }
        
    }

    function handleInput() {
        // Player 1 controls (W/S)
        if (keys['KeyW'] && paddle1.position.y < 2) paddle1.position.y += states.paddleSpeed;
        if (keys['KeyS'] && paddle1.position.y > -2) paddle1.position.y -= states.paddleSpeed;

        // Player 2 controls (Arrow Up/Down)
        if (keys['ArrowUp'] && paddle2.position.y < 2) paddle2.position.y += states.paddleSpeed;
        if (keys['ArrowDown'] && paddle2.position.y > -2) paddle2.position.y -= states.paddleSpeed;
    }

    function updateBall() {
        if (states.gameOver) {
            states.paused = true
            clearInterval(gameLoopInterval); // Stop the loop when game is over or paused
            return;
        }
        
        ball.position.x += states.ballSpeed.x;
        ball.position.y += states.ballSpeed.y;

        // Wall collisions
        if (ball.position.y >= 2.85 || ball.position.y <= -2.85) {
            states.ballSpeed.y *= -1;
        }

        // Paddle collisions
        if (ball.position.x <= -6.85 && ball.position.x >= -7.0) {
            if (ball.position.y <= paddle1.position.y + 1 &&
                ball.position.y >= paddle1.position.y - 1) {
                states.ballSpeed.x *= -1.05; // Increase speed slightly
                states.ballSpeed.y = (ball.position.y - paddle1.position.y) * 0.5; // Add spin
            }
        }

        if (ball.position.x >= 6.85 && ball.position.x <= 7.0) {
            if (ball.position.y <= paddle2.position.y + 1 &&
                ball.position.y >= paddle2.position.y - 1) {
                states.ballSpeed.x *= -1.05; // Increase speed slightly
                states.ballSpeed.y = (ball.position.y - paddle2.position.y) * 0.5; // Add spin
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
        states.paused = !states.paused;
        const btn = document.getElementById('pauseBtn');
        btn.innerHTML = states.paused ?
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

    //function cleanupAfterGame() {
        // Example cleanup: Remove canvas and overlay
        //const gameContainer = document.getElementById('gameContainer');
        //const gameCanvas = document.getElementById('pongCanvas');
        //const gameOverlay = document.getElementById('gameOverlay');

        // Remove canvas and game overlay from DOM
        //gameContainer.removeChild(gameCanvas);
        //gameContainer.removeChild(gameOverlay);
        
        // You can also clear any other global state or imported modules as needed.
    //}

    document.getElementById('proceedBtn')?.addEventListener('click', () => {
        if (semi1 == "null") semi1 = null;
        if (semi2 == "null") semi2 = null;
        
        if (gametype == "final")
            window.location.href = '#/';
        else
            window.location.href = '#/tournament/brackets?semi1=' + semi1 + '&semi2=' + semi2;
        
        //cleanupAfterGame();
    });


    let gameLoopInterval;
    // Animation loop
    function animate() {
        const interval = 1000 / 60; // Run at 60 FPS
        gameLoopInterval = setInterval(() => {
            if (states.gameOver) {
                states.paused = true;
                clearInterval(gameLoopInterval); // Stop the loop when game is over or paused
                return;
            }

            if (!states.paused && !states.gameOver) {
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

    // Reset the game and start the animation
    //resetGame();
    animate();
}
