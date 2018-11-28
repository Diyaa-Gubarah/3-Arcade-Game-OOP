// Enemies our player must avoid
var Enemy = function(x, y, speed) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = x;
    this.y = y;
    this.speed = speed;

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};

/* Update the enemy's position, required method for game
   Parameter: dt, a time delta between ticks */
Enemy.prototype.update = function(dt) {
   /* You should multiply any movement by the dt parameter
    * which will ensure the game runs at the same speed for all computers.
    */
    this.x += this.speed * dt;

    // when off canvas, reset position of enemy to move across again
    if (this.x > 505) {
        this.x = -100;
        this.speed = 100 + Math.floor(Math.random() * 512);
    }

    // Check for collision between player and enemies
    if (player.x < this.x + 60 &&
        player.x + 30 > this.x &&
        player.y < this.y + 25 &&
        player.y + 30 > this.y) {
        // collision detected! between player & enemy, return player to initial location
        player.x = 200;
        player.y = 380;
        collisionEnemy();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x, y, speed, sprite) {
    this.x = x;
    this.y = y;
    this.speed = speed;
    this.sprite = sprite;
};

// Update the player's position, required method for game
Player.prototype.update = function() {
    // Prevent player from moving beyond canvas boundaries
    if (this.y > 380) {
        this.y = 380;
    }

    if (this.x > 400) {
        this.x = 400;
    }

    if (this.x < 0) {
        this.x = 0;
    }

    // Check for player reaching top of canvas and winning the game
    if (this.y < 0) {
      var choice = alert("You Win \nScore : " + scoreValue + "\n\nDo You Want To continue?");
      this.x = 200;
      this.y = 380;
      getConfirmation(choice); // handle user win alret dialog choice
    }
};

// Draw the player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// available player
var selectdMenu = document.querySelector('.menu');
// default value for selected player
var selectdPlayer  = 'images/char-boy.png';
// this event change default value for selectdPlayer to clicked player
selectdMenu.addEventListener('click',function (e) {
  selectdPlayer = e.target.getAttribute('src');
});

// handle selectd player ,call this method in engine.js inside renderEntities()
Player.prototype.getSelectedPlayer = function () {
  this.sprite = selectdPlayer;
};

// handle user keyPress
Player.prototype.handleInput = function(keyPress) {
    switch (keyPress) {
        case 'left':
            this.x -= this.speed + 50;
            break;
        case 'up':
            this.y -= this.speed + 30;
            break;
        case 'right':
            this.x += this.speed + 50;
            break;
        case 'down':
            this.y += this.speed + 30;
            break;
    }
};

var Gifts = function(x ,y ,sprite) {
    this.x = x;
    this.y = y;
    this.sprite = sprite;
};

// Draw the gifts on the screen
Gifts.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// helper method for collect gift
Gifts.prototype.collectGifts = function() {

  if (player.x < this.x + 60 &&
      player.x + 30 > this.x &&
      player.y < this.y + 25 &&
      player.y + 30 > this.y) {
      // collision detected! between player & gifts , collect gifts
      this.x = -600;
      this.y = -600;
      collisionGifts(this.sprite);
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var allEnemies = [];

var player = new Player(200, 380, 50,selectdPlayer);
var enemy;

// Position 'y' where the enemies will are created
var enemyYposition = [60, 145, 230 ,60,145];


// loop throw each element in enemyYposition[] , and set Enemy properties
enemyYposition.forEach(function(posY) {
    enemy = new Enemy(0, posY, 100 + Math.floor(Math.random() * 512));
    allEnemies.push(enemy);
});

var gift; // gift object
var allGifts = []; // array contain all Gift object
// array contain all Gift image we're going to use
var allGiftsImage = [
  'images/gem-blue.png',
  'images/heart.png',
  'images/gem-green.png',
  'images/key.png'
];

// Position 'X' & 'Y' where the gifts will are created
var giftYposition = [60, 145, 240 ,60],
    giftXposition = [100, 10, 60 ,100];

//index to get x,y from [giftYposition,giftXposition]
var count = -1;

// loop throw each element in allGiftsImage[] , and set Gifts properties
allGiftsImage.forEach(function(giftsImage) {
  count++;
  gift = new Gifts(returnX(count), returnY(count), giftsImage);
  allGifts.push(gift);
});

// helper function to return random X position for giftsImage
function returnX(index) {
  var xPosition = giftXposition[index] + Math.floor(Math.random() * 512);
        if (xPosition > 400) {
           xPosition = 400;
        } else if (xPosition < 100) {
           xPosition = 0;
        } else if (xPosition > 100 && xPosition < 200) {
           xPosition = 100;
        } else if (xPosition > 200 && xPosition < 300) {
           xPosition = 200;
        } else if (xPosition > 300 && xPosition < 400) {
           xPosition = 300;
        }
  return xPosition;
}

// helper function to return random Y position for giftsImage
function returnY(index) {
  var yPosition = giftYposition[index] + Math.floor(Math.random() * 512);
        if (yPosition > 240) {
           yPosition = 240;
        } else if (yPosition < 145) {
           yPosition = 60;
        } else if (yPosition > 145 && yPosition < 240) {
           yPosition = 145;
        }
  return yPosition;
}

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

// helper method to handle user win alret dialog choice
function getConfirmation(choice){
       location.reload();
}


var scoreValue = 0; // track current score value
var container = document.querySelector('.container'); // score & heart icon Container
var score = container.querySelector('.score');
var heart = container.querySelector('.heart-icon');
var heartNumber = heart.childElementCount; // track current heart icon count

// helper method handle collision between 'player' & 'gifts' ,update the Score lable & heart icon
function collisionGifts(giftImage) {
  switch (giftImage) {
    case 'images/gem-blue.png':
      scoreValue = 0 ? scoreValue = 1000: scoreValue += 1000;
          score.innerHTML = scoreValue;
        break;
    case 'images/gem-green.png':
      scoreValue = 0 ? scoreValue = 700: scoreValue += 700;
          score.innerHTML = scoreValue;
        break;
    case 'images/heart.png':
          var i = document.createElement("i");
          i.setAttribute('class', "fa fa-heart");
          heart.appendChild(i);
          heartNumber++;
        break;
    case 'images/key.png':
          scoreValue = 0 ? scoreValue = 500: scoreValue += 500;
          score.innerHTML = scoreValue;
        break;
  }
}

// helper method handle collision between 'enemy' & 'player' update the Score lable & heart icon
function collisionEnemy() {
  heartNumber--; // when this method is called thats mean the enemy hit the player & take one heart from

  if (heart.hasChildNodes() &&
               heartNumber > 0) {
     heart.removeChild(heart.childNodes[0]);
     heart.removeChild(heart.childNodes[0]);
 } else {
      alert("oh No!! \nYou Lose \nScore : " + scoreValue + "\n\nPress Ok To Play Again");
      location.reload();
 }
}
