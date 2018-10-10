global.modules = [];
global.snippets = [];
const babelParser = require("@babel/parser");
const fs = require("fs");
const { join } = require("path");
const generate = require("./lib/finalCodeGenerator");
const file = fs.readFileSync(process.argv[2]);
const parsed = babelParser.parse(file.toString()).program.body;
let code = generate(parsed);

console.log(code);
