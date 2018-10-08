const { EOL } = require("os");

function parseBody(parsed, indent = "", ignore = []) {
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
          true,
          indent
        );
        break;
      case "VariableDeclaration":
        finalCode += require("./VariableDeclaration")(node, false, indent);
        break;
      case "IfStatement":
        finalCode += require("./IfStatement")(node, indent);
        break;
      case "WhileStatement":
        finalCode += require("./WhileStatement")(node, indent);
        break;
      case "DoWhileStatement":
        finalCode += require("./DoWhileStatement")(node, indent);
        break;

      case "ForStatement":
        finalCode += require("./ForStatement")(node, indent);
        break;

      case "FunctionDeclaration":
        finalCode += require("./FunctionDeclaration")(node, indent);
        break;

      case "SwitchStatement":
        throw "switch is not ready yet";
        //finalCode += require("./SwitchStatement")(node, indent);
        break;
      case "AssignmentExpression":
        finalCode += require("./BinaryOrLogicalExpression")(node, indent);
        break;
      case "BreakStatement":
        finalCode += indent + "break" + EOL;
        break;

      default:
        throw `error, unknown type ${type} at parseBody()`;
        break;
    }
  }

  return finalCode;
}

module.exports = parseBody;
