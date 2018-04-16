// Enemies our player must avoid
var Enemy = function enemyConstructor(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

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

var Player = function playerConstructor(x = 203, y = 408, character = characters[0]) {
    this.x = x;
    this.y = y;
    this.character = character;
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

Player.prototype.withinHorizontalRange = function () { 
    return true;
}

Player.prototype.withinVerticalRange = function () { 
    return true;
}

Player.prototype.handleInput = function (key) {
    if (key === "left" && this.withinHorizontalRange()) { 
        this.move("left");
    } else if (key === "right" && this.withinHorizontalRange()) {
        this.move("right");
    } else if (key === "up" && this.withinVerticalRange()) {
        this.move("up");
    } else if (key === "down" && this.withinVerticalRange()) {
        this.move("down");
    }
};


// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

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
