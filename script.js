const gameArea = document.getElementById('game-area');
const scoreDisplay = document.getElementById('score');
const livesDisplay = document.getElementById('lives');
const gameOverScreen = document.getElementById('game-over');
const finalScoreDisplay = document.getElementById('final-score');
const restartButton = document.getElementById('restart-button');

let player; // Declare player as a variable
let score = 0;
let lives = 3;
let gameInterval;
let objectSpeed = 5;

// Function to move player with mouse
function movePlayer(e) {
  const rect = gameArea.getBoundingClientRect();
  const playerX = e.clientX - rect.left - player.offsetWidth / 2;
  if (playerX >= 0 && playerX <= gameArea.offsetWidth - player.offsetWidth) {
    player.style.left = `${playerX}px`;
  }
}

// Attach event listener for player movement
function attachPlayerMovement() {
  gameArea.addEventListener('mousemove', movePlayer);
}

// Create falling objects
function createFallingObject() {
  const object = document.createElement('div');
  object.classList.add('falling-object');
  object.style.left = `${Math.random() * (gameArea.offsetWidth - 30)}px`;
  gameArea.appendChild(object);

  let objectY = 0;
  const fallInterval = setInterval(() => {
    objectY += objectSpeed;
    object.style.top = `${objectY}px`;

    // Check for collision
    if (
      objectY + 30 >= gameArea.offsetHeight - 50 &&
      object.offsetLeft + 30 >= player.offsetLeft &&
      object.offsetLeft <= player.offsetLeft + 50
    ) {
      loseLife();
      clearInterval(fallInterval);
      object.remove();
    }

    // Remove object if it goes off screen
    if (objectY >= gameArea.offsetHeight) {
      clearInterval(fallInterval);
      object.remove();
      increaseScore();
    }
  }, 20);
}

// Increase score
function increaseScore() {
  score++;
  scoreDisplay.textContent = score;
  if (score % 10 === 0) {
    objectSpeed += 0.5; // Increase difficulty
  }
}

// Lose life
function loseLife() {
  lives--;
  livesDisplay.textContent = lives;
  if (lives === 0) {
    endGame();
  }
}

// End game
function endGame() {
  clearInterval(gameInterval);
  gameOverScreen.classList.add('visible');
  finalScoreDisplay.textContent = score;
}

// Restart game
restartButton.addEventListener('click', () => {
  score = 0;
  lives = 3;
  objectSpeed = 2;
  scoreDisplay.textContent = score;
  livesDisplay.textContent = lives;
  gameOverScreen.classList.remove('visible');
  gameArea.innerHTML = '<div id="player"></div>'; // Recreate the player element
  player = document.getElementById('player'); // Reassign the player element
  attachPlayerMovement(); // Reattach the event listener
  startGame();
});

// Start game
function startGame() {
  gameInterval = setInterval(createFallingObject, 1000);
}

// Initialize the game
function initializeGame() {
  player = document.getElementById('player'); // Assign the player element
  attachPlayerMovement(); // Attach the event listener
  startGame();
}

initializeGame();
