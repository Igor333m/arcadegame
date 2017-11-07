// Array full of enemies
let allEnemies = [];
// Item array
let allItems = [];

const gemOrangePoints = $(".gem-orange");
const gemGreenPoints = $(".gem-green");
const gemBluePoints = $(".gem-blue");

// Canvas tiles coordinates
const randomPositionX = [0, 101, 202, 303, 404, 505, 606, 707];
const randomPositionY = [313, 228, 143, 58];

/**
* @description Enemies our player must avoid
* @param {number} x - Player x coordinate
* @param {number} y - Player y coordinate
*/
let Enemy = function(x, y) {

    allEnemies.push(this);
    //this.randomSpeed = this.speed();
    this.bugSpeed = this.speed();

    this.x = x;
    this.y = y;
    // The image/sprite for our enemies
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += Math.round(dt * this.bugSpeed);
    if (this.x >= 900) {
        this.x = -200;
        this.speed();
    }

};

// Set random speed for bugs
Enemy.prototype.speed = function() {
    let speed = Math.floor(Math.random() * 300) + 200;
    setTimeout( () => {
    },100);
    return this.bugSpeed =  speed;
};



// Draw the enemy on the screen
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

/**
* @description Player class
* @constructor
* @param {string} sprite - Player image
* @param {number} x - Player x coordinate
* @param {number} y - Player y coordinate
*/
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
    /**
    * Renders the player
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }
    /**
    * Moves the player using arrow keys
    * @param {string} key - Arrow key pressed
    */
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
    /**
    * Player interaction with bugs, items and water
    */
    update(dt) {
        // Player coallision with bug, lose health, return to starting position
        allEnemies.forEach( (bug) => {
            if (Math.round(bug.x) < this.x && Math.round(bug.x) > this.x - 100) {
                if (Math.round(bug.y === this.y)) {
                    this.audio.bug.play();
                    this.health -=1;
                    if (this.health === 0) {
                        gameOver();
                    }
                    $(".health").text(this.health);
                    this.x = 303;
                    this.y = 483;
                }
            }
        });
        // player collects items and hide items
        allItems.forEach( (item) => {
            if ( item.x === this.x ) {
                if (Math.round(item.y === this.y)) {
                    this.collectItems(item.item);
                    item.x = -200;
                    item.randomizeItems(item.item);
                }
            }
        });

        allItems.in
        // Player enters water, returned to starting position
        if (this.y === -27 ) {
            this.x = 303;
            this.y = 483;
        }
    }
    /**
    * Check what item player collect, play sound, add points
    * @param {string} item
    */
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
                    gemBluePoints.text(Number($(".gem-blue").text()) + 1 );
                    break;
                }
                case "gem-green": {
                    this.audio.gem.play();
                    this.points += 250;
                    $(".points").text(this.points);
                    gemGreenPoints.text(Number($(".gem-green").text()) + 1 );
                    break;
                }
                case "gem-orange": {
                    this.audio.gem.play();
                    this.points += 500;
                    $(".points").text(this.points);
                    gemOrangePoints.text(Number($(".gem-orange").text()) + 1 );
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

/**
* @description Item class
* @constructor
* @param {string} sprite - Item image
* @param {number} x - Item x coordinate
* @param {number} y - Item y coordinate
* @param {string} item - Type of item
*/
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

    /**
    * Renders the player
    */
    render() {
        ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    }

    /**
    * @description After player collects the item, it disappears and show after some time
    * @param {string} item
    */
    randomizeItems(item) {

        switch (item) {
            // Use key to go to next level
            case "key": {
                // TODO: Add new level
                break;
            }
            case "star": {
                setTimeout( () => {
                    this.x = randomPositionX[randomizeItemsX()];
                    this.y = randomPositionY[randomizeItemsY()];
                    console.log(this.y);
                }, 3000);
                break;
            }
            case "gem-blue": {
                setTimeout( () => {
                    this.x = randomPositionX[randomizeItemsX()];
                    this.y = randomPositionY[randomizeItemsY()];
                    console.log(this.y);
                }, 5000);
                break;
            }
            case "gem-green": {
                setTimeout( () => {
                    this.x = randomPositionX[randomizeItemsX()];
                    this.y = randomPositionY[randomizeItemsY()];
                    console.log(this.y);
                }, 7000);
                break;
            }
            case "gem-orange": {
                setTimeout( () => {
                    this.x = randomPositionX[randomizeItemsX()];
                    this.y = 58;
                    console.log(this.y);
                }, 20000);
                break;
            }
            case "heart": {
                setTimeout( () => {
                    this.x = randomPositionX[randomizeItemsX()];
                    this.y = randomPositionY[randomizeItemsY()];
                    console.log(this.y);
                }, 35000);
                break;
            }
        }
    }
}

/**
* @description When health reach 0, show end game modal with won points, keys, stars and gems
*/
function gameOver() {
    $("#winPoints").text(player.points);
    $("#winKeys").text($(".key").text());
    $("#winStars").text($(".star").text());
    $("#winGems").text( Number(gemBluePoints.text()) + Number(gemGreenPoints.text()) +  Number(gemOrangePoints.text()) );
    $(".modal").show();
    // Trigger checker transition using jQuery Transit plugin
    $(".checker").transition({
        "background-position": "-7980px 0",
        transition: "background 1s steps(38)"});

}

/**
* @description Get random number for randomPositionX, to to set new x for items
* @returns {number} Random number between 0 and 7
*/
function randomizeItemsX() {
    return Math.floor(Math.random() * 7);
}

/**
* @description Get random number for randomPositionY, to to set new y for items
* @returns {number} Random number between 0 and 3
*/
function randomizeItemsY() {
    return Math.floor(Math.random() * 3);
}

// Restart button
let restartClick = $(".restart").click(function() {
    restartGame();
});

/**
* @descripton Restarts the game, hides the modal
* @returns {undefined}
*/
function restartGame() {
    allEnemies = [];
    allItems = [];
    player.health = 3;
    player.points = 0;
    $(".points").text(0);
    $(".key").text(0);
    $(".star").text(0);
    $(".gem-blue").text(0);
    $(".gem-green").text(0);
    $(".gem-orange").text(0);
    $(".modal").hide();
    // Set win checker to start position
    $(".checker").transition({
        "background-position": "0 0"});
    // Add key, heart, star and gems to the game
    setTimeout( () => {
        key = new Item('images/key.png', 404, 313, "key");
    }, 30000);
    setTimeout( () => {
        gemOrange = new Item('images/gem-orange.png', 404, 58, "gem-orange");
    }, 15000);
    star = new Item('images/star.png', 303, 143, "star");
    gemBlue = new Item('images/gem-blue.png', 101, 143, "gem-blue");
    gemGreen = new Item('images/gem-green.png', 202, 143, "gem-green");
    heart = new Item('images/heart.png', 404, 228, "heart");

    // Add enemies to the game
    enemy1 = new Enemy(-100, 58);
    enemy2 = new Enemy(-100, 58);
    enemy3 = new Enemy(-200, 143);
    enemy4 = new Enemy(-200, 143);
    enemy5 = new Enemy(-200, 228);
    enemy6 = new Enemy(-300, 228);
    enemy7 = new Enemy(-398, 313);
    enemy8 = new Enemy(-398, 313);
}

// All objects
let enemy1;
let enemy2;
let enemy3;
let enemy4;
let enemy5;
let enemy6;
let enemy7;
let enemy8;

let key;
let star;
let gemBlue;
let gemGreen;
let gemOrange;
let heart;

// Add player to the game
let player = new Player('images/horn-girl.png', 303, 483);

// This listens for arrow keys
document.addEventListener('keyup', function(e) {
    let allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});

restartGame();