function Board() {
	this.population = [[0,0,0],[1,1,1],[0,0,0]];
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
	};
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
	};
	this.print = function() {
                for(var row = 0; row < this.population.length; row++) {
			var rowStr = "";
                        for(var col = 0; col < this.population[row].length; col++) {
				var cellValue = this.population[row][col];
				rowStr = rowStr + " " + cellValue;
			}
			console.log(rowStr);
		}
	}
}

exports.board = new Board();
