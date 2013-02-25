var Grid = function(canvas, height, width, boxSize) {
	this.elements = [];
	this.livingCells = [];
	var that = this;
	
	for(var i = 0; i < height; i++) {
		for(var j = 0; j < width; j++) {
			var x = j * boxSize;
			var y = i * boxSize;

			var rect = canvas.rect(x, y, boxSize, boxSize);
			rect.attr("stroke-width", 0.1)
				.data("x", j)
				.data("y", i)
				.attr("fill", "white")
				.click(function() {
					that.toggle(this);
				});
			this.elements.push(rect);
		}
	}

	this.elementAt = function(x, y) {
		for(var i = 0; i < this.elements.length; i++) {
			if(this.elements[i].data("x") == x && this.elements[i].data("y") == y) {
				return this.elements[i];
			}
		}	
	}	

	this.fill = function(population) {
		for(var i = 0; i < this.elements.length; i++) {
			var fill = (population[this.elements[i].data("x")][this.elements[i].data("y")] == 1);
			if(fill) {
				this.elements[i].attr("stroke-width", 0.1);
				this.elements[i].attr("fill", "black");
			}
			else {
				this.elements[i].attr("stroke-width", 0.1);
				this.elements[i].attr("fill", "white");
			}
		}
	}

	this.toggle = function(node) {
		if(node.attr("fill") == "white") {
			this.livingCells.push({ x: node.data("x"), y: node.data("y") });
			node.attr("fill", "black");
		}
		else {
			for(var i = 0; i < this.livingCells.length; i++) {
				if(this.livingCells[i].x == node.data("x") && this.livingCells[i].y == node.data("y")) {
					this.livingCells.splice(i, 1);
				}
			}
			node.attr("fill", "white");
		}
	}
};

