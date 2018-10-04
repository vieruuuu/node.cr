const { CallExpression } = require("./CallExpression");

module.exports = {
  ExpressionStatement(node) {
    if (node.expression.type === "CallExpression") {
      return CallExpression(node.expression);
    }
  }
};
