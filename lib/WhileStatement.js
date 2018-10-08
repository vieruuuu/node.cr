const { EOL } = require("os");
const defaultIndent = "\t";
const parseBody = require("./parseBody");
const parseLiterals = require("./parseLiterals");
function WhileStatement(node, indent = "") {
  let test = parseLiterals(node.test);
  let body = parseBody(node.body.body, indent + defaultIndent);
  return indent + "while " + test + EOL + body + indent + "end" + EOL;
}

module.exports = WhileStatement;
