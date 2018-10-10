const { EOL } = require("os");

function parseBody(parsed, ignore = []) {
  const parsedLen = parsed.length;
  let finalCode = "";

  for (let i = 0; i < parsedLen; i++) {
    const node = parsed[i];
    const type = node.type;
    if (ignore.includes(type)) continue;
    switch (type) {
      case "ExpressionStatement":
        finalCode += require("./parseLiterals")(
          node.expression,
          null,
          true
        );
        break;
      case "VariableDeclaration":
        finalCode += require("./VariableDeclaration")(node, false);
        break;
      case "IfStatement":
        finalCode += require("./IfStatement")(node);
        break;
      case "WhileStatement":
        finalCode += require("./WhileStatement")(node);
        break;
      case "DoWhileStatement":
        finalCode += require("./DoWhileStatement")(node);
        break;

      case "ForStatement":
        finalCode += require("./ForStatement")(node);
        break;

      case "FunctionDeclaration":
        finalCode += require("./FunctionDeclaration")(node);
        break;

      case "SwitchStatement":
        throw "switch is not ready yet";
        //finalCode += require("./SwitchStatement")(node);
        break;
      case "AssignmentExpression":
        finalCode += require("./BinaryOrLogicalExpression")(node);
        break;
      case "BreakStatement":
        finalCode += "break" + EOL;
        break;

      default:
        throw `error, unknown type ${type} at parseBody()`;
        break;
    }
  }

  return finalCode;
}

module.exports = parseBody;
