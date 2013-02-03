var Board = require('../board.js');
var board;

QUnit.module( "CELL rule tests; cell with ...", {
	setup: function() {
		var Board = require('../board.js');
		board = new Board(3,3);
		board.placeBlinker(0,1);
	}
});

test("...EXACTLY THREE neighbours REVIVES", function() {
	board.evolve();
	deepEqual(board.population, [[0,1,0],[0,1,0],[0,1,0]]);
});

test("...LESS THAN TWO neighbours DIES", function() {
	board.population = [[0,0,0],[0,1,0],[0,1,0]];
	board.evolve();
	deepEqual(board.population, [[0,0,0],[0,0,0],[0,0,0]]);
});

test("...TWO OR THREE neighbours LIVES", function() {
	board.population = [[0,1,0],[1,1,0],[0,0,0]];
	board.evolve();
	deepEqual(board.population, [[1,1,0],[1,1,0],[0,0,0]]);
});

test("...MORE THAN THREE neighbours DIES", function() {
	board.population = [[1,1,1],[1,1,1],[0,0,0]];
	board.evolve();
	deepEqual(board.population, [[1,0,1],[1,0,1],[0,1,0]]);
});
