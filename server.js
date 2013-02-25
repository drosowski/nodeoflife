var sys = require('sys');
var fs = require('fs');
var http = require('http');
var uuidGen = require('node-uuid');
var swig  = require('swig');

var Board = require('./include/board.js');

swig.init({
  autoescape: false,
  root: '.'
});
var tmpl = swig.compileFile('./www/index.html');

var sessions = {};

var port = process.argv[2];
if(!port) {
	sys.puts("Usage: node server.js <port>");
	process.exit(1);
}

http.createServer(function (req, res) {
	// startgame sets board dimension and starts the game
	if(urlContains(req, 'startgame')) {
		var width = parseParam(req, "width");
		var height = parseParam(req, "height");
		var id = parseParam(req, "id");
		var livingCells = parseLivingCells(parseParam(req, "livingCells"));

		var board = new Board(width, height);
		board.markLiving(livingCells);
		sessions[id] = board;
	}
	// subsequent requests evolving the board
	else if(urlContains(req, 'population.json')) {
		var id = parseParam(req, "id");
		sessions[id].evolve();
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.write(sessions[id].print());
		res.end();
	}
	// serve static js file
	else if(urlContains(req, 'grid.js')) {
		fs.readFile('www/js/grid.js', function(error, content) {
                	if (error) {
                		res.writeHead(500);
                		res.end();
                	}
                	else {
				res.writeHead(200, {'Content-Type': 'text/javascript'});
				res.end(content);
                	}
            	});
	}
	// initial request starting new pseudo session
	else {
		res.writeHead(200, {'Content-Type': 'text/html'});

		var uuid = uuidGen.v4();
		var renderedHtml = tmpl.render({
			uuid: uuid
		});

		res.write(renderedHtml);
		res.end();
	}
}).listen(port);
sys.puts("Server listening on " + port + "...");

function parseParam(request, name) {
	var param = require('url').parse(request.url, true).query[name];
	return param;
}

function urlContains(request, string) {
	return (request.url.indexOf(string) > -1);
}

function parseLivingCells(livingCellsString) {
	var livingCells = [];

	if(livingCellsString) {
		var pairs = livingCellsString.split("-");
		for(var i = 0; i < pairs.length; i++) {
			var pair = pairs[i].split(".");
			livingCells.push({ x: pair[0], y: pair[1] });
		}		
	}
	return livingCells;
}
