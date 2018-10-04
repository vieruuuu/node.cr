module.exports = {
  parseBody(parsed, indent = "") {
    const parsedLen = parsed.length;
    let finalCode = "";

    for (let i = 0; i < parsedLen; i++) {
      const node = parsed[i];
      const type = node.type;
      finalCode += indent;
      if (type === "ExpressionStatement") {
        finalCode += require("./ExpressionStatement").ExpressionStatement(node);
      } else if (type === "VariableDeclaration") {
        finalCode += require("./VariableDeclaration").VariableDeclaration(node);
      } else if (type === "IfStatement") {
        finalCode += require("./IfStatement").IfStatement(node, indent);
      } else if (type === "FunctionDeclaration") {
        finalCode += require("./FunctionDeclaration").FunctionDeclaration(
          node,
          indent
        );
      } else {
        throw `error, unknown type ${type} at parseBody()`;
      }
    }

    return finalCode;
  }
};
