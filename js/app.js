// Enemies our player must avoid
var Enemy = function(x,y,speed) {
    //position of enemy
    this.x = x;
    this.y = y;
    //speed of enemy
    this.speed = speed;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    this.x += dt*this.speed;
    if (this.x > 600){
      this.x = -100;
    }
// sets collision on objects
    if (player.x < this.x + 38 && player.x +38 > this.x && player.y === this.y -10){
      player.x = 202;
      player.y = 383;
      //set lives when colliding
      player.lives -= 1;
      //set the points logic
      player.score === 0 ? player.score = 0 : player.score -= 50
    }
    //displaying the score when game is over and reset it
    if (player.lives === 0){
      alert (`Game Over, You'r score is ${player.score}`)
      player.lives = 3;
      player.score = 0;
    }
};


// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x , this.y);
};



// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(x,y) {
  this.sprite = 'images/char-boy.png';
  //starting player position
  this.x = x;
  this.y = y;
  this.lives = 3;
  this.score = 0;
};

Player.prototype.handleInput = function(key) {
  switch (key) {
        case 'up':
            this.y < 0 ? this.y = this.y : this.y -= 83;
            break;
        case 'down':
            this.y > 300 ? this.y = this.y : this.y += 83;
            break;
        case 'left':
            this.x < 100 ? this.x = this.x : this.x -= 101;
            break;
        case 'right':
            this.x > 400 ? this.x = this.x : this.x += 101;
            break;

    }
};

Player.prototype.update = function(){
  scoreBoard.innerHTML = `<span style = color:red>Lives: ${player.lives} </span> \\\\\b <span style = color:green>Score: ${player.score} </span>`;
};


Player.prototype.render = function(x,y) {
  ctx.drawImage(Resources.get(this.sprite),this.x,this.y);
  //when player gets to the water
  if (this.y === -32) {
      this.x = 202;
      this.y = 383;
      player.score += 50
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var player = new Player(202,383);
var allEnemies = [];
var scoreBoard = document.createElement('h1');
document.body.appendChild(scoreBoard);

//create enemies on the map
(function(){
  var position = -22;
      //set enemy's position and speed
  for (var x = 0; x<3; x++){
    var newEnemy = new Enemy(0 , position +=83 , (Math.random() * (3-1) + 1) * 70)
    allEnemies.push(newEnemy)
    };
})();


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
