let header = document.querySelector("header");
let totalWins = 0;

// Enemies our player must avoid
var Enemy = function (line = 1) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.enemyLinesOnYAxis = [230, 147, 63];
    this.x = -100;
    this.y = this.enemyLinesOnYAxis[line - 1];
    this.speed = randomEnemySpeed();
    this.gameFrozen = false;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
const enemyStartPosition = -100;
const enemyEndPosition = 500;

function playerOnRowNum(row) {
    const playerYAxis = [240,156,72];
    return player.y == playerYAxis[row - 1];
}

Enemy.prototype.enemyOnRow = function (row) { 
    return this.y == this.enemyLinesOnYAxis[row - 1];
};

Enemy.prototype.update = function (dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    //reset enemy position when go out of canvas
    if (this.x > enemyEndPosition) {
        this.x = enemyStartPosition;
        this.speed = randomEnemySpeed();
    }

    //Check for collision
    if (!this.gameFrozen) {
        if ((this.enemyOnRow(3) && playerOnRowNum(3)) || (this.enemyOnRow(2) && playerOnRowNum(2)) || (this.enemyOnRow(1) && playerOnRowNum(1))) {
            if (player.x - 78 <= this.x && player.x + 82 >= this.x) {
                this.gameFrozen = true;
                this.gameLost();
            }
        }
    }
};

Enemy.prototype.gameLost = function () {
    this.freezeAllEnemies(2);
    player.freezeAndReset(2);

    totalWins = 0;
    updateScore();
};

Enemy.prototype.freezeAllEnemies = function (seconds) {
    allEnemies.forEach(function (enemy) {
        enemy.speed = 0;
    });
    setTimeout(() => {
        this.unFreezeAllEnemies();
    }, seconds * 1000);
};

Enemy.prototype.unFreezeAllEnemies = function () {
    allEnemies.forEach(function (enemy) {
        enemy.speed = randomEnemySpeed();
    });
    this.gameFrozen = false;
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Construct a Player

const initialXLocation = 203;
const initialYLocation = 408;

var Player = function playerConstructor() {
    this.x = initialXLocation;
    this.y = initialYLocation;
    this.character = 'images/char-boy.png';
    this.disabled = false;
};

Player.prototype.update = function () {

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.character), this.x, this.y);
};

const verticalStep = 84;
const horizontalStep = 100;

Player.prototype.move = function (direction) {
    //this.logPosition();

    switch (direction) {
        case "left":
            this.x -= horizontalStep;
            break;
    
        case "right":
            this.x += horizontalStep;
            break;

        case "up":
            this.y -= verticalStep;
            console.log(this.y);
            break;

        case "down":
            this.y += verticalStep;
            break;
    }
};

const verticalBlocks = 6;
const horizontalBlocks = 5;

const leftEdge = initialXLocation - (horizontalStep * (horizontalBlocks - 1) / 2);
const rightEdge = initialXLocation + (horizontalStep * (horizontalBlocks - 1) / 2);
const topEdge = initialYLocation - (verticalStep * (verticalBlocks - 1));
const bottomEdge = initialYLocation;

Player.prototype.canGo = function (direction) {
    if (this.disabled) return false;

    switch (direction) {
        case "left":
            return this.x > leftEdge;
            break;
    
        case "right":
            return this.x < rightEdge;
            break;

        case "up":
            return this.y > topEdge;
            break;

        case "down":
            return this.y < bottomEdge;
            break;
    }
};

Player.prototype.handleInput = function (direction) {
    if (this.canGo(direction)) this.move(direction);

    if (!this.disabled && this.y == -12) {
        this.gameWin();
        //this.winMessage();
    }
};

Player.prototype.gameWin = function () {
    totalWins++;
    updateScore();
    this.freezeAndReset(2);
    allEnemies[0].freezeAllEnemies(2);
};

Player.prototype.freezeAndReset = function (TimeInSeconds) {
    this.disabled = true;
    setTimeout(() => {
        this.x = initialXLocation;
        this.y = initialYLocation;
        this.disabled = false;
    }, TimeInSeconds * 1000);
};

/* Player.prototype.logPosition = function () { 
    console.log("\nPlayer.x = " + this.x + ", Player.y = " + this.y);
    allEnemies.forEach(function (enemy, index) { 
        console.log(`Enemy${index + 1}.x = ${Math.floor(enemy.x)}, Enemy${index + 1}.y = ${enemy.y}`);
    });
} */

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [new Enemy(1), new Enemy(2), new Enemy(3)];

var player = new Player();

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

function randomEnemySpeed() {
    let minSpeed = 100;
    let maxSpeed = 200;
    return (function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    })(minSpeed, maxSpeed);
}

function updateScore() {
    header.innerText = "Total Consecutive Wins: " + totalWins;
}