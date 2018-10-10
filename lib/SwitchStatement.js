const { EOL } = require("os");
const parseLiterals = require("./parseLiterals");
const SwitchCase = require("./SwitchCase");

function SwitchStatement(node) {
  let discriminant = parseLiterals(node.discriminant);
  let body = SwitchCase(node.cases);

  return "";
}

module.exports = SwitchStatement;
