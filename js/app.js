var Game = require('./game.js');

let game = new Game();
document.addEventListener('keydown', function(event) { game.turnFurry(event); });
game.showFurry();
game.showCoin();
game.startGame();