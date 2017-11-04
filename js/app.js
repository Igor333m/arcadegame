
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
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x += dt * this.bugSpeed;
    if (this.x >= 900) {
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
                this.x -= 101;
                break;

            case "right":
                if (this.x >= 707) {
                    break;
                }
                this.x += 101;
                break;

            case "up":
                if (this.y === -27) {
                    break;
                }
                this.y -= 85;
                                console.log(this.y);

                break;

            case "down":
                console.log(this.y);

                if (this.y === 483) {
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
let enemy2 = new Enemy(-100, 60);
let enemy3 = new Enemy(-200, 145);
let enemy4 = new Enemy(-200, 145);
let enemy5 = new Enemy(-200, 230);
let enemy6 = new Enemy(-300, 230);
let enemy7 = new Enemy(-200, 325);
let enemy8 = new Enemy(-400, 325);

let player = new Player('images/horn-girl.png', 0, 483);


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
