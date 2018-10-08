const { EOL } = require("os");
const defaultIndent = "\t";
const parseLiterals = require("./parseLiterals");
const SwitchCase = require("./SwitchCase");

function SwitchStatement(node, indent) {
  let discriminant = parseLiterals(node.discriminant);
  let body = SwitchCase(node.cases, indent + defaultIndent);
  
  return ''
}

module.exports = SwitchStatement;
