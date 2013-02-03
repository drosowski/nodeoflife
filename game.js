var Board = require('./board.js');
var board = new Board(20,20);

board.print();
board.placeLWS(5,5);

setInterval(function() {
	board.print();
	board.evolve();
}, 1000);
