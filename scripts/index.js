// let grid = document.querySelector(".game-area"); //this is the gameboard div searched for (flexbox)
let scoreElement = document.querySelector(".score"); // SCORE DISPLAY ELEMENT
let highScoreElement = document.querySelector(".high-score");

let appleIndex = 0;
let currentIndex = 0;
let currentSnake = [2, 1, 0]; // a list of the current positions in terms of the divs, from e.g from 0-99
let direction = 1; // +1 aka right, -1 aka left, +boardwidth e.g +10 aka down, -boardwidth e.g -10 aka up
let score = 0;
let speed = 12;
let intervalTime = 300;
let interval = 0;
let boardsize = null; // initialising the boardsize so it can be changed later

let width = 30; // Change width to dynamically fit within the container if needed
let grid = document.querySelector(".game-area");
grid.style.gridTemplateColumns = `repeat(${width}, 1fr)`;
grid.style.gridTemplateRows = `repeat(${width}, 1fr)`;


// Get high score from local storage

let highScore = localStorage.getItem("high-score") || 0;
highScoreElement.innerText = `High Score: ${highScore}`;



document.addEventListener("DOMContentLoaded", function () { // on page load generates the game + board (currently this doesnt allow for dynamic sizing of gameboard, but can be changed)
    document.addEventListener("keyup", control);
    createBoard(width);
    startGame();

    console.log("Game Initialized");
    

    const replayButton = document.getElementById("replay-btn");
    replayButton.addEventListener("click", function () {
        replayGame();
    });
});

// Function to reset and replay the game
function replayGame() {
    clearInterval(interval); // stop the current game loop

    // Clear the board (remove snake and apple from all squares)
    let squares = document.querySelectorAll(".game-area div");
    squares.forEach((square) => {
        square.classList.remove("snake");
        square.classList.remove("apple");
    });

    // Reset the game variables
    score = 0;
    direction = 1;
    intervalTime = 300; // reset the interval time
    scoreElement.innerText = `Score: ${score}`;

    // Restart the game
    startGame(); 
}




function createBoard(boardwidth = 30){
    boardsize = boardwidth * boardwidth;
    // popup.style.display = "none";
    for (let i = 0; i < boardsize; i++) {
        let div = document.createElement("div");
        grid.appendChild(div);
    }
}


function startGame() {
    let squares = document.querySelectorAll(".game-area div");
    randomApple(squares);
    direction = 1;
    score = 0; // Reset score
    scoreElement.innerText = `Score: ${score}`;
    highScoreElement.innerText = `High Score: ${highScore}`;
    currentSnake = [2, 1, 0];
    currentIndex = 0;
    currentSnake.forEach((index) => squares[index].classList.add("snake"));
    interval = setInterval(moveOutcome, intervalTime);
}


// This function defines what happens when you move the snake

function moveOutcome() {
    let squares = document.querySelectorAll(".game-area div");
    if (checkForHits(squares)) {
        alert("Game Over! Press Replay button to play again.");
        return clearInterval(interval);
    } else {
        moveSnake(squares);
    }
}


function moveSnake(squares) {
    let tail = currentSnake.pop(); // removes tail
    squares[tail].classList.remove("snake");
    currentSnake.unshift(currentSnake[0] + direction); // puts tail on front of snake to shift it one `forwards`
    // movement ends here
    eatApple(squares, tail); // if its on an apple, append to both front and back of snake so its longer
    squares[currentSnake[0]].classList.add("snake");
}

// Collision

function checkForHits(squares) {
    if (
        (currentSnake[0] + width >= width * width && direction === width) ||
        (currentSnake[0] % width === width - 1 && direction === 1) ||
        (currentSnake[0] % width === 0 && direction === -1) ||
        (currentSnake[0] - width < 0 && direction === -width) ||
        squares[currentSnake[0] + direction].classList.contains("snake")
    ) {
        return true;
    } else {
        return false;
    }
    
}

// UPDATE THE SCORE WHEN THE SNAKE EATS


function eatApple(squares, tail) {
    if (squares[currentSnake[0]].classList.contains("apple")) {
        squares[currentSnake[0]].classList.remove("apple");
        squares[tail].classList.add("snake");
        currentSnake.push(tail);
        randomApple(squares);
        score++;
        highScore = score >= highScore ? score : highScore;
        localStorage.setItem("high-score", highScore);
        scoreElement.innerText = `Score: ${score}`;
        highScoreElement.innerText = `High Score: ${highScore}`;
        clearInterval(interval);
        intervalTime = intervalTime - speed; 
        interval = setInterval(moveOutcome, intervalTime);
    }
}


// RANDOM APPLE

function randomApple(squares) {
    do {
        appleIndex = Math.floor(Math.random() * squares.length);
    } while (squares[appleIndex].classList.contains("snake")); 
    squares[appleIndex].classList.add("apple");
}


//SET UP CONTROLS

function control(e) {
    if (e.keyCode === 39 && direction !== -1) { // right, but not when going left
        direction = 1;
    } else if (e.keyCode === 38 && direction !== width) { // up, but not when going down
        direction = -width;
    } else if (e.keyCode === 37 && direction !== 1) { // left, but not when going right
        direction = -1;
    } else if (e.keyCode === 40 && direction !== -width) { // down, but not when going up
        direction = width;
    }
}
