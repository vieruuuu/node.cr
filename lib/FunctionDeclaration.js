const formatArguments = require("./formatArguments");
const parseBody = require("./parseBody");
const parseLiterals = require("./parseLiterals");
const { EOL } = require("os");

function FunctionDeclaration(node) {
  let name = node.id.name;
  let body = "";
  if (node.params) {
    node.params.forEach((param, i) => {
      if (param.type === "Identifier") {
        body += `${param.name} = arguments[${i}]?` + EOL;
      } else if (param.type === "AssignmentPattern") {
        body +=
          `${param.left.name} = arguments[${i}]? || ${parseLiterals(
            param.right
          )}` + EOL;
      }
    });
  }
  body += parseBody(node.body.body);

  return "def " + name + "(*arguments)" + EOL + body + "end" + EOL;
}

module.exports = FunctionDeclaration;
