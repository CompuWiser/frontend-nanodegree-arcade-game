function randomEnemySpeed() {
    let minSpeed = 100;
    let maxSpeed = 200;
    return (function (min, max) {
        return Math.floor(Math.random() * (max - min + 1)) + min;
    })(minSpeed, maxSpeed);
}

// Enemies our player must avoid
var Enemy = function enemyConstructor(line = 1, speed = randomEnemySpeed()) {
    // Variables applied63, 147, 230 to each of our instances go here,
    // we've provided one for you to get started
    const enemyLines = [63, 147, 230];

    this.x = -100;
    this.y = enemyLines[line-1];
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += this.speed * dt;

    if (this.x > 500) {
        this.x = -100;
        this.speed = randomEnemySpeed();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const characters = [
    'images/char-boy.png',
    'images/char-cat-girl.png',
    'images/char-horn-girl.png',
    'images/char-pink-girl.png',
    'images/char-princess-girl.png'
];

/* function getRandomCharacter() {
    let randomIndex = Math.floor(Math.random() * characters.length - 1);
    console.log(randomIndex);
    console.log(characters[randomIndex]);
    return characters[randomIndex];
} */

const initialXLocation = 203;
const initialYLocation = 408;

var Player = function playerConstructor() {
    this.x = initialXLocation;
    this.y = initialYLocation;
    this.character = characters[0];
    //this.character = getRandomCharacter();
    this.gameWon = false;
};

Player.prototype.update = function () { 

};

Player.prototype.render = function () {
    ctx.drawImage(Resources.get(this.character), this.x, this.y);
};

const verticalStep = 84;
const horizontalStep = 100;

Player.prototype.move = function (direction) {
    switch (direction) {
        case "left":
            this.x -= horizontalStep;
            break;
    
        case "right":
            this.x += horizontalStep;
            break;

        case "up":
            this.y -= verticalStep;
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
    if (this.gameWon) return false;

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
}

/* Player.prototype.logPosition = function () { 
    console.log("x = " + this.x + ", y = " + this.y);
} */

Player.prototype.gameWin = function () {
    this.gameWon = true;
    setTimeout(() => {
        this.resetPlayerPosition();
        this.gameWon = false;
    }, 2000);
}

Player.prototype.resetPlayerPosition = function () {
    this.x = initialXLocation;
    this.y = initialYLocation;
}

Player.prototype.handleInput = function (key) {
    if (key === "left" && this.canGo("left")) { 
        this.move("left");
    } else if (key === "right" && this.canGo("right")) {
        this.move("right");
    } else if (key === "up" && this.canGo("up")) {
        this.move("up");
    } else if (key === "down" && this.canGo("down")) {
        this.move("down");
    }

    if (this.y < 0) {
        this.gameWin();
    }

    //this.logPosition();
};


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
