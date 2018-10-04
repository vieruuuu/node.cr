const { EOL } = require("os");
const defaultIndent = "\t";
function ForStatement(node, indent = "") {
  let init = require("./parseBody").parseBody(
    [node.init],
    indent + defaultIndent
  );
  let test = require("./parseLiterals").parseLiterals(node.test);
  let update = require("./parseLiterals").parseLiterals(node.update);
  let body = require("./parseBody").parseBody(node.body.body);
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
    indent +
    defaultIndent +
    defaultIndent +
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
