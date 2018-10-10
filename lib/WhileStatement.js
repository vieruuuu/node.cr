const { EOL } = require("os");
const parseBody = require("./parseBody");
const parseLiterals = require("./parseLiterals");
function WhileStatement(node) {
  let test = parseLiterals(node.test);
  let body = parseBody(node.body.body);
  return "while " + test + EOL + body + "end" + EOL;
}

module.exports = WhileStatement;
