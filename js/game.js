var Coin = require('./coin.js');
var Furry = require('./furry.js');

function Game() {
  this.board = document.querySelectorAll('#board div');
  this.scoreBoard = document.querySelector('#score strong');
  this.furry = new Furry();
  this.coin = new Coin();
  this.score = 0;
  this.idSetInterval = undefined;
}

Game.prototype.index = function(x,y) {
  return x + (y * 10);
}

Game.prototype.showFurry = function() {
  this.board[this.index(this.furry.x,this.furry.y)].classList.add('furry');
}

Game.prototype.hideVisibleFurry = function() {
  let element = document.querySelector('div.furry');
  if(element) {
    element.classList.remove('furry');
  }
}

Game.prototype.showCoin = function() {
  this.board[this.index(this.coin.x,this.coin.y)].classList.add('coin');
}

Game.prototype.hideVisibleCoin = function() {
  this.board[this.index(this.coin.x,this.coin.y)].classList.remove('coin');
  // let element = document.querySelector('div.coin');
  // if(element) {
  //   element.classList.remove('coin');
  //}
}

Game.prototype.moveFurry = function(){ 
  movement:{    
  if(this.furry.direction === 'right') {
    this.furry.x = this.furry.x + 1;
  } else if (this.furry.direction === 'left'){
    this.furry.x = this.furry.x - 1;
  } else if (this.furry.direction === 'up'){
    this.furry.y = this.furry.y - 1;
  } else if (this.furry.direction === 'down'){
    this.furry.y = this.furry.y + 1;
  }
  if(this.gameOver()) {
    break movement; //jesli funkcja gameOver zwraca true zastosuj break i przerwij to co w nawiasach klamrowych oznaczone przez etykiete movement
  }                 //mozna uzyc po prostu return;
  this.hideVisibleFurry(); //chowa Furrego
  this.checkCoinCollision(); //sprawdza czy pozycja x i y furrego i coina sa takie same i jesli sa to zwieksza licznik punktow i wymazuje coina i tworzy coina na nowo
  this.showFurry(); //rysuje furrego w nowym miejscu wskazywanym przez jego x i y
  }
}

Game.prototype.turnFurry = function(event) {
  switch (event.which) {
    case 37:
      this.furry.direction = 'left';
      break;
    case 39:
      this.furry.direction = 'right';
      break;
    case 38:
      this.furry.direction = 'up';
      break;
    case 40:
      this.furry.direction = 'down';
      break;
  }
}

Game.prototype.checkCoinCollision = function() {
  if((this.furry.x === this.coin.x) && (this.furry.y === this.coin.y)) { //czy x i y sa takie same dla furry i coin
    this.score++; // jak tak to zwieksz licznik punktow
    this.scoreBoard.textContent = this.score; //wypisz punkty w elemencie HTML (wczesniej - this.board = document.querySelectorAll('#board div');)
    this.hideVisibleCoin(); //schowaj coina - wymazanie klasy
    this.coin = undefined; //obiekt coin na null zeby go wymazac z pamieci
    this.coin = new Coin(); //nowy obiekt coin z losowymi x i y
    this.showCoin(); //dodaj klase do div tak jak wskazuja x i y nowego coina
  }
}

Game.prototype.gameOver = function () {
  if(this.furry.x < 0 || this.furry.x > 9) { //albo wykoleil sie w poziomie
    clearInterval(this.idSetInterval); //zatrzymaj interwal poruszania ktory uruchamia moveFurry
    this.hideVisibleFurry(); //ukryj furrego
    return true; //zwroc true dla game over - to jest sprawdzane przy kazdym ruchu w moveFurry
  } 
  if(this.furry.y < 0 || this.furry.y > 9) { //albo wykoleil sie w pionie
    clearInterval(this.idSetInterval);
    this.hideVisibleFurry();
    return true;
  } 
  return false;
}

Game.prototype.startGame = function() {
  let self = this;
  this.idSetInterval = setInterval(function(){ self.moveFurry(); }, 250);
}

module.exports = Game;