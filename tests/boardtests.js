var Board = require('../board.js');
var board;

QUnit.module( "Board tests, ..." ,{
	setup: function() {
		var Board = require('../board.js');
		board = new Board(3,3);
	}
});

test("...mark living", function() {
	var livingCells = [];
	livingCells.push({x: 1, y: 0});
	livingCells.push({x: 1, y: 1});
	livingCells.push({x: 1, y: 2});

	board.markLiving(livingCells);

	deepEqual(board.population, [[0,1,0],[0,1,0],[0,1,0]]);
});

