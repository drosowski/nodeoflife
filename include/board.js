var Board = function(width, height) {
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
		this.activateCell(x, y);
		this.activateCell(x, y+1);
		this.activateCell(x, y+2);
	}

	this.getCell = function(x, y) {
		if(y >= 0 && y < this.population.length && x >= 0 && x < this.population.length) {
			return this.population[x][y];
		}
		
		return 0;
	}

	this.activateCell = function(x, y) {
		this.population[x][y] = 1;
	}

	this.markLiving = function(livingCells) {
		for(var i = 0; i < livingCells.length; i++) {
			this.activateCell(livingCells[i].x, livingCells[i].y);
		}
	}

	this.evolve = function() {
		var newPopulation = [];
		var currentRow, currentColumn = 0;

		for(var row = 0; row < this.population.length; row++) {
			var newRow = [];
			for(var col = 0; col < this.population[row].length; col++) {
				var newCell = this.cellDestiny(row, col);
				newRow.push(newCell);
			}
			newPopulation.push(newRow);
		}

		this.population = newPopulation;
	}

	this.cellDestiny = function(x, y) {
		var currentCell = this.getCell(x, y);
		
		var cellValues = [];
		// the neighbour cells from upper left (y-1, x-1) to lower right (y+1, x+1)
		cellValues.push(this.getCell(x-1, y-1));
		cellValues.push(this.getCell(x, y-1));
		cellValues.push(this.getCell(x+1, y-1));

		cellValues.push(this.getCell(x-1, y));
		cellValues.push(this.getCell(x+1, y));

		cellValues.push(this.getCell(x-1, y+1));
		cellValues.push(this.getCell(x, y+1));
		cellValues.push(this.getCell(x+1, y+1));

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

	this.debug = function() {
		console.log(this.population);
	}
};

module.exports = Board;
