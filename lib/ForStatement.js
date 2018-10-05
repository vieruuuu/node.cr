const { EOL } = require("os");
const defaultIndent = "\t";
const { parseBody } = require("./parseBody");
const { parseLiterals } = require("./parseLiterals");
function ForStatement(node, indent = "") {
  let init = parseBody([node.init], indent + defaultIndent);
  let test = parseLiterals(node.test);
  let update = parseLiterals(node.update);
  let body = parseBody(node.body.body, indent + defaultIndent + defaultIndent);
  return (
    indent +
    "-> {" +
    EOL +
    init +
    EOL +
    indent +
    defaultIndent +
    "while " +
    test +
    EOL +
    body +
    EOL +
    indent +
    defaultIndent +
    defaultIndent +
    update +
    EOL +
    indent +
    defaultIndent +
    "end" +
    EOL +
    indent +
    "}.call" +
    EOL
  );
}

module.exports = {
  ForStatement
};
