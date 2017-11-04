
let allEnemies = [];

// Enemies our player must avoid
let Enemy = function(x, y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    allEnemies.push(this);
    //this.randomSpeed = this.speed();
    this.bugSpeed = this.speed();

    this.x = x;
    this.y = y;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    console.log(this);

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.bugSpeed;
    if (this.x >= 600) {
        this.x = -200;
        this.speed();
    }

};

Enemy.prototype.speed = function() {
    let speed = Math.floor(Math.random() * 300) + 200;
    setTimeout( () => {
        //bugSpeed = Math.floor(Math.random() * 300) + Math.floor(Math.random() * 70) + 1;
    },100);
    return this.bugSpeed =  speed;
};



// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

class Player {
    constructor(sprite, x, y) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    handleInput(key) {
        
        switch (key) {
            case "left":
                if (this.x === 0) {
                    break;
                }
                this.x -= 100;
                break;

            case "right":
                if (this.x === 400) {
                    break;
                }
                this.x += 100;
                break;

            case "up":
                if (this.y === -25) {
                    break;
                }
                this.y -= 85;
                break;

            case "down":
                if (this.y === 400) {
                        break;
                    }
                this.y += 85;
                break;
        }
    }

    update(dt) {

    }

}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let enemy1 = new Enemy(-100, 60);
let enemy2 = new Enemy(-200, 145);
let enemy3 = new Enemy(-200, 230);

let player = new Player('images/horn-girl.png', 200, 400);


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
