const { EOL } = require("os");
const parseBody = require("./parseBody");
const parseLiterals = require("./parseLiterals");
function DoWhileStatement(node) {
  let test = parseLiterals(node.test);
  let body = parseBody(node.body.body);
  return "while true" + EOL + body + "break if !" + test + EOL + "end" + EOL;
}

module.exports = DoWhileStatement;
