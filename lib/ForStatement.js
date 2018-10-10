const { EOL } = require("os");
const parseBody = require("./parseBody");
const parseLiterals = require("./parseLiterals");
function ForStatement(node) {
  let init = node.init ? parseBody([node.init]) : "";
  let test = node.test ? parseLiterals(node.test) : "true";
  let update = node.update ? parseLiterals(node.update) : "";
  let body = node.body.body
    ? parseBody(node.body.body)
    : parseBody([node.body]);
  return (
    "-> {" +
    EOL +
    init +
    "while " +
    test +
    EOL +
    body +
    update +
    EOL +
    "end" +
    EOL +
    "}.call" +
    EOL
  );
}

module.exports = ForStatement;
