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

    if (expression.type === "AssignmentExpression") {
      return `${left} ${operator} ${right}`;

    }

    return `(${left} ${operator} ${right})`;
  }
};
