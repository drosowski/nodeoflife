var sys = require('sys');
var http = require('http');
var uuidGen = require('node-uuid');
var swig  = require('swig');

var Board = require('./board.js');

swig.init({
  autoescape: false,
  root: '.'
});
var tmpl = swig.compileFile('/Users/danielrosowski/Development/spielwiese/gameoflife/js/index.html');

var sessions = {};

http.createServer(function (req, res) {
	// startgame sets board dimension and starts the game
	if(urlContains(req, 'startgame')) {
		var width = parseParam(req, "width");
		var height = parseParam(req, "height");
		var id = parseParam(req, "id");

		var board = new Board(width, height);
		board.placeLWS(5,5);
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
}).listen(9090);
sys.puts("Server running...");

function parseParam(request, name) {
	var param = require('url').parse(request.url, true).query[name];
	return param;
}

function urlContains(request, string) {
	return (request.url.indexOf(string) > -1);
}
