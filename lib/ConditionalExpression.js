const parseLiterals = require("./parseLiterals");
const { EOL } = require("os");
function ConditionalExpression(node) {
  let test = parseLiterals(node.test);
  let consequent = parseLiterals(node.consequent);
  let alternate = parseLiterals(node.alternate);
  return test + " ? " + consequent + " : " + alternate + EOL;
}

module.exports = ConditionalExpression;
