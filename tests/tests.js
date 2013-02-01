test("board tests", function() {
	var Board = require('../board.js');
	var board = new Board();

	deepEqual(board.population, [[0,0,0],[1,1,1],[0,0,0]]);
	board.evolve();
	deepEqual(board.population, [[0,1,0],[0,1,0],[0,1,0]]);
});

