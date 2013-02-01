test("board tests", function() {
	deepEqual(board.population, [[0,0,0],[1,1,1],[0,0,0]]);
	board.evolve();
	deepEqual(board.population, [[0,1,0],[0,1,0],[0,1,0]]);
});

