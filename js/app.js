
let allEnemies = [];

let allItems = [];


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
    this.x += Math.round(dt * this.bugSpeed);
    // console.log("bX: " + this.x + " , y: " + this.y);
    if (this.x >= 900) {
        this.x = -200;
        this.speed();
    }

};

Enemy.prototype.speed = function() {
    let speed = Math.floor(Math.random() * 300) + 200;
    setTimeout( () => {
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
        this.health = Number($(".health").text());
        this.points = Number($(".points").text());
        this.audio = {
            bug: new Audio('audio/bug.wav'),
            door: new Audio('audio/door.wav'),
            key: new Audio('audio/key.wav'),
            heart: new Audio('audio/heart.wav'),
            gem: new Audio('audio/gem.wav')
        }
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
                console.log("x: " + this.x);
                break;

            case "right":
                if (this.x >= 707) {
                    break;
                }
                this.x += 101;
                console.log("x: " + this.x);
                break;

            case "up":
                if (this.y === -27) {
                    break;
                }
                this.y -= 85;
                console.log("y: " + this.y);
                break;

            case "down":
                if (this.y === 483) {
                        break;
                    }
                this.y += 85;
                console.log("y: " + this.y);
                break;
        }
    }

    update(dt) {
        // Player coallision with bug, returned to starting position
        allEnemies.forEach( (bug) => {
            if (Math.round(bug.x) < this.x && Math.round(bug.x) > this.x - 100) {
                if (Math.round(bug.y === this.y)) {
                    this.audio.bug.play();
                    this.health -=1;
                    $(".health").text(this.health);
                    this.x = 0;
                    this.y = 483;
                }
            }
        });

        allItems.forEach( (item) => {
            if ( item.x === this.x ) {
                if (Math.round(item.y === this.y)) {
                    this.collectItems(item.item);
                    item.x = -200;
                }
            }
        });

        allItems.in
        // Player enters water, returned to starting position
        if (this.y === -27 ) {
            this.x = 0;
            this.y = 483;
            console.log("One point");
        }
    }

    collectItems(item) {
            switch (item) {
                case "key": {
                    this.audio.key.play();
                    this.points += 50;
                    $(".points").text(this.points);
                    $(".key").text(Number($(".key").text()) + 1 );
                    break;
                }
                case "star": {
                    this.audio.gem.play();
                    this.points += 100;
                    $(".points").text(this.points);
                    $(".star").text(Number($(".star").text()) + 1 );
                    break;
                }
                case "gem-blue": {
                    this.audio.gem.play();
                    this.points += 150;
                    $(".points").text(this.points);
                    $(".gem-blue").text(Number($(".gem-blue").text()) + 1 );
                    break;
                }
                case "gem-green": {
                    this.audio.gem.play();
                    this.points += 250;
                    $(".points").text(this.points);
                    $(".gem-green").text(Number($(".gem-green").text()) + 1 );
                    break;
                }
                case "gem-orange": {
                    this.audio.gem.play();
                    this.points += 500;
                    $(".points").text(this.points);
                    $(".gem-orange").text(Number($(".gem-orange").text()) + 1 );
                    break;
                }
                case "heart": {
                    this.audio.heart.play();
                    this.health += 1;
                    $(".health").text(this.health);
                    $(".health").text(Number($(".health").text()) );
                    break;
                }
            }
    }

}

class Item {
    constructor(sprite, x, y, item) {
        this.sprite = sprite;
        this.x = x;
        this.y = y;
        this.item = item;
        allItems.push(this);
    }

    update(dt) {

    }

    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
}

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
let key = new Item('images/key.png', 404, 313, "key");
let star = new Item('images/star.png', 303, 143, "star");
let gemBlue = new Item('images/gem-blue.png', 101, 143, "gem-blue");
let gemGreen = new Item('images/gem-green.png', 202, 143, "gem-green");
let gemOrange = new Item('images/gem-orange.png', 404, 143, "gem-orange");
let heart = new Item('images/heart.png', 404, 228, "heart");

let enemy1 = new Enemy(-100, 58);
let enemy2 = new Enemy(-100, 58);
let enemy3 = new Enemy(-200, 143);
let enemy4 = new Enemy(-200, 143);
let enemy5 = new Enemy(-200, 228);
let enemy6 = new Enemy(-300, 228);
let enemy7 = new Enemy(-398, 313);
let enemy8 = new Enemy(-398, 313);



let player = new Player('images/horn-girl.png', 0, 483);

// Adds selected caracter image for points
$(".caracter-points img:nth-child(2)").attr("src", player.sprite);

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
