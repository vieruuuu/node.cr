module.exports = {
  parseBody(parsed, indent = "") {
    const parsedLen = parsed.length;
    let finalCode = "";

    for (let i = 0; i < parsedLen; i++) {
      const node = parsed[i];
      const type = node.type;
      if (type === "ExpressionStatement") {
        finalCode += require("./parseLiterals").parseLiterals(
          node.expression,
          null,
          true
        );
      } else if (type === "VariableDeclaration") {
        finalCode += require("./VariableDeclaration").VariableDeclaration(
          node,
          false,
          indent
        );
      } else if (type === "IfStatement") {
        finalCode += require("./IfStatement").IfStatement(node, indent);
      } else if (type === "ForStatement") {
        finalCode += require("./ForStatement").ForStatement(node, indent);
      } else if (type === "FunctionDeclaration") {
        finalCode += require("./FunctionDeclaration").FunctionDeclaration(
          node,
          indent
        );
      } else if (type === "AssignmentExpression") {
        finalCode += require("./BinaryOrLogicalExpression").BinaryOrLogicalExpression(
          node
        );
      } else {
        throw `error, unknown type ${type} at parseBody()`;
      }
    }

    return finalCode;
  }
};
