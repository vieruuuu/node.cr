const { EOL } = require("os");
const defaultIndent = "\t";
const parseBody = require("./parseBody");
const parseLiterals = require("./parseLiterals");
function DoWhileStatement(node, indent = "") {
  let test = parseLiterals(node.test);
  let body = parseBody(node.body.body, indent + defaultIndent);
  return (
    indent +
    "while true" +
    EOL +
    body +
    EOL +
    indent +
    defaultIndent +
    "break if !" +
    test +
    EOL +
    indent +
    "end" +
    EOL
  );
}

module.exports = DoWhileStatement;
