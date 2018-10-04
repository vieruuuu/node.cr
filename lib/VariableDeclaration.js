const { parseLiterals } = require("./parseLiterals");
const { EOL } = require("os");

function VariableDeclaration(node, isConst = false, indent = "") {
  let kind = node.kind;
  let results = [];
  if (kind) {
    switch (kind) {
      case "var":
      case "let":
        return VariableDeclaration(node.declarations, false, indent);
      case "const":
        return VariableDeclaration(node.declarations, true, indent);
      default:
        break;
    }
  } else {
    let nodesLen = node.length;
    for (let i = 0; i < nodesLen; i++) {
      const declaration = node[i];
      if (
        isConst &&
        declaration.id.name.charAt(0) !==
          declaration.id.name.charAt(0).toUpperCase()
      ) {
        throw "constants need to start with an UPPERCASE letter";
      } else if (
        !isConst &&
        declaration.id.name.charAt(0) ===
          declaration.id.name.charAt(0).toUpperCase()
      ) {
        throw "variables must not start with an UPPERCASE letter";
      }
      results.push(
        `${indent + declaration.id.name} = ${parseLiterals(
          declaration.init,
          declaration
        )}`
      );
    }
    return results.join(EOL) + EOL;
  }
}

module.exports = {
  VariableDeclaration
};
