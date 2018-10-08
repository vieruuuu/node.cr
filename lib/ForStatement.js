const { EOL } = require("os");
const defaultIndent = "\t";
const parseBody = require("./parseBody");
const parseLiterals = require("./parseLiterals");
function ForStatement(node, indent = "") {
  let init = node.init ? parseBody([node.init], indent + defaultIndent) : "";
  let test = node.test ? parseLiterals(node.test) : "true";
  let update = node.update ? parseLiterals(node.update) : "";
  let body = parseBody(node.body.body, indent + defaultIndent + defaultIndent);
  return (
    indent +
    "-> {" +
    EOL +
    init +
    indent +
    defaultIndent +
    "while " +
    test +
    EOL +
    body +
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

module.exports = ForStatement;
