var Board = require('./board.js');
var board = new Board();

setInterval(function() {
	board.print();
	board.evolve();
}, 1000);
