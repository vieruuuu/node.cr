const parseLiterals = require("./parseLiterals");

function BinaryOrLogicalExpression(expression, indent = "") {
  let left = parseLiterals(expression.left);
  let right = parseLiterals(expression.right);
  let operator = expression.operator;

  switch (operator) {
    default:
      break;
  }

  if (expression.type === "AssignmentExpression") {
    return indent + `${left} ${operator} ${right}`;
  }

  return `(${left} ${operator} ${right})`;
}

module.exports = BinaryOrLogicalExpression;
