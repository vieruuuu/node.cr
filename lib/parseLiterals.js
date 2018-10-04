function parseLiterals(literal, prev = null) {
  if (literal.type === "StringLiteral") {
    if (literal.value.length === 1) {
      return `'${literal.value}'`;
    } else {
      return `"${literal.value}"`;
    }
  } else if (literal.type === "NumericLiteral") {
    return literal.value;
  } else if (literal.type === "BooleanLiteral") {
    return literal.value;
  } else if (literal.type === "NullLiteral") {
    return "nil";
  } else if (literal.type === "CallExpression") {
    return require("./CallExpression").CallExpression(literal, "", prev);
  } else if (literal.type === "Identifier" && literal.name) {
    if (literal.name === "undefined") {
      throw "don't use undefined, use null";
    }
    return literal.name;
  } else if (
    literal.type === "BinaryExpression" ||
    literal.type === "LogicalExpression"
  ) {
    return require("./BinaryOrLogicalExpression").BinaryOrLogicalExpression(
      literal
    );
  } else {
    throw `unsupported literal( ${literal.type} ) rn`;
  }
}

module.exports = {
  parseLiterals
};
