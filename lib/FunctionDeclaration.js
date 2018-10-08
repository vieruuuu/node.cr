const formatArguments = require("./formatArguments");
const parseBody = require("./parseBody");
const parseLiterals = require("./parseLiterals");
const { EOL } = require("os");
const defaultIndent = "\t";

function FunctionDeclaration(node, indent) {
  let name = node.id.name;
  let body = "";
  if (node.params) {
    node.params.forEach((param, i) => {
      if (param.type === "Identifier") {
        body +=
          indent + defaultIndent + `${param.name} = arguments[${i}]?` + EOL;
      } else if (param.type === "AssignmentPattern") {
        body +=
          indent +
          defaultIndent +
          `${param.left.name} = arguments[${i}]? || ${parseLiterals(
            param.right
          )}` +
          EOL;
      }
    });
  }
  body += parseBody(node.body.body, indent + defaultIndent);

  return (
    indent + "def " + name + " (*arguments)" + EOL + body + indent + "end" + EOL
  );
}

module.exports = FunctionDeclaration;
