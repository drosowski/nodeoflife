var Board = function(height, width) {
	this.height = height;
	this.width = width;
	this.population = [];

	for(var y = 0; y < height; y++) {
		var row = [];	
		for(var x = 0; x < width; x++) {
			row.push(0);
		}
		this.population.push(row);
	}	

	this.placeBlinker = function(x, y) {
		this.population[y][x] = 1;	
		this.population[y][x+1] = 1;	
		this.population[y][x+2] = 1;	
	}

	this.placeLWS = function(x, y) {
		this.population[y][x+1] = 1;
		this.population[y][x+2] = 1;
		this.population[y][x+3] = 1;
		this.population[y][x+4] = 1;

		this.population[y+1][x] = 1;
		this.population[y+1][x+4] = 1;
		this.population[y+2][x+4] = 1;
		this.population[y+3][x] = 1;
		this.population[y+3][x+3] = 1;
	}

	this.markLiving = function(livingCells) {
		for(var i = 0; i < livingCells.length; i++) {
			this.population[livingCells[i].x][livingCells[i].y] = 1;
		}
	}

	this.evolve = function() {
		var newPopulation = [];
		var currentRow, currentColumn = 0;

		for(var row = 0; row < this.population.length; row++) {
			var newRow = [];
			for(var col = 0; col < this.population[row].length; col++) {
				var newCell = this.cellDestiny(col, row);
				newRow.push(newCell);
			}
			newPopulation.push(newRow);
		}

		this.population = newPopulation;
	}

	this.cellDestiny = function(x, y) {
		var currentCell = this.population[y][x];
		
		var cellValues = [];
		// the neighbour cells from upper left (y-1, x-1) to lower right (y+1, x+1)
		if(y > 0 && x > 0) {
			cellValues.push(this.population[y-1][x-1]);
		}
		if(y > 0) {
			cellValues.push(this.population[y-1][x]);
			cellValues.push(this.population[y-1][x+1]);
		}
		if(x > 0) {
			cellValues.push(this.population[y][x-1]);
			if(y+1 < this.population.length) {
				cellValues.push(this.population[y+1][x-1]);
			}
		}
		cellValues.push(this.population[y][x+1]);
		if(y+1 < this.population.length) {
			cellValues.push(this.population[y+1][x]);
			cellValues.push(this.population[y+1][x+1]);
		}

		var livingCellCount = cellValues.filter(function(value) { return value == 1 }).length;

		if(currentCell == 1) {
			if(livingCellCount > 3 || livingCellCount <= 1) {
				return 0;
			}
			else if(livingCellCount >= 2) {
				return 1;
			}
		}	
		else if(currentCell == 0) {
			if(livingCellCount == 3) {
				return 1;
			}
			else {
				return 0;
			}
		}
	}

	this.print = function() {
		return JSON.stringify(this.population);
	}
};

module.exports = Board;
