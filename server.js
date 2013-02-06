var sys = require('sys');
var http = require('http');

var Board = require('./board.js');
var sessions = {};

var swig  = require('swig');
swig.init({
  autoescape: false,
  root: '.'
});

var uuidGen = require('node-uuid');

var tmpl = swig.compileFile('/Users/danielrosowski/Development/spielwiese/gameoflife/js/index.html');

http.createServer(function (req, res) {
	// subsequent requests evolving the board
	if(req.url.indexOf('population.json') > -1) {
		var id = require('url').parse(req.url, true).query.id
		sessions[id].evolve();
		res.writeHead(200, {'Content-Type': 'text/json'});
		res.write(sessions[id].print());
		res.end();
	}
	// initial request building a board and creating a new session
	else {
		res.writeHead(200, {'Content-Type': 'text/html'});

		var board = new Board(20,20);
		board.placeLWS(5,5);
		var uuid = uuidGen.v4();

		var renderedHtml = tmpl.render({
			population: board.print(),
			uuid: uuid
		});

		res.write(renderedHtml);
		res.end();
		
		sessions[uuid] = board;
	}
}).listen(9090);
sys.puts("Server running...");

