var runner = require("../node_modules/qunit");
runner.run({
    code : "include/board.js",
    tests : ["tests/cellrulestests.js",
    	"tests/boardtests.js"]
});
