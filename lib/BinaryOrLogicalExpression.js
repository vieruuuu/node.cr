const { parseLiterals } = require("./parseLiterals");

module.exports = {
  BinaryOrLogicalExpression(expression) {
    let left = parseLiterals(expression.left);
    let right = parseLiterals(expression.right);
    let operator = expression.operator;

    switch (operator) {
      case "^":
        operator = "**";
        break;

      default:
        break;
    }

    return `(${left} ${operator} ${right})`;
  }
};
