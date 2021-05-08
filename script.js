let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;

let snake = [];
snake[0] = {
    y: 8 * box,
    x: 8 * box
}

let direction = "right";

let food = {
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

let score = 0;
document.getElementById("placar").innerHTML = score;

let level = 1;
document.getElementById("nivel").innerHTML = level;

function createBG() {
    context.fillStyle = "lightgreen";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

function createSnake() {
    for (count = 0; count < snake.length; count++) {
        context.fillStyle = "green";
        context.fillRect(snake[count].x, snake[count].y, box, box);
    }
}

function drawFood() {
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
}

document.addEventListener('keydown', update);

function update(event) {
    if (event.keyCode == 37 && direction != "right") {
        direction = "left";
    }

    if (event.keyCode == 39 && direction != "left") {
        direction = "right";
    }

    if (event.keyCode == 38 && direction != "down") {
        direction = "up";
    }

    if (event.keyCode == 40 && direction != "up") {
        direction = "down";
    }
}

function playGame() {
    if (snake[0].x > 15 * box && direction == "right") {
        snake[0].x = 0;
    }

    if (snake[0].x < 0 && direction == "left") {
        snake[0].x = 16 * box;
    }

    if (snake[0].y > 15 * box && direction == "down") {
        snake[0].y = 0;
    }

    if (snake[0].y < 0 && direction == "up") {
        snake[0].y = 16 * box;
    }

    for (count = 1; count < snake.length; count++) {
        if (snake[0].x == snake[count].x && snake[0].y == snake[count].y) {
            clearInterval(game);
            alert("Game Over");
        }

    }

    createBG();
    createSnake();
    drawFood();

    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    if (direction == 'right') {
        snakeX += box;
    }

    if (direction == 'left') {
        snakeX -= box;
    }

    if (direction == 'up') {
        snakeY -= box;
    }

    if (direction == 'down') {
        snakeY += box;
    }

    if (snakeX != food.x || snakeY != food.y) {
        snake.pop();
    } else {
        food.x = Math.floor(Math.random() * 15 + 1) * box;
        food.y = Math.floor(Math.random() * 15 + 1) * box;
        score = score + 1;
        document.getElementById("placar").innerHTML = score;

        if (score >= 10) {
            game = setInterval(playGame, 250);
            incrementLevel();
        } else if (score >= 20) {
            game = setInterval(playGame, 200);
            incrementLevel();
        } else if (score >= 30) {
            game = setInterval(playGame, 150);
            incrementLevel()
        }
    }

    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(playGame, 300);

function incrementLevel() {
    level = level + 1;
    console.log(level);
    document.getElementById("nivel").innerHTML = level;
}

