function MemberExpression(expression) {
  let obj = require("./parseLiterals").parseLiterals(expression.object, true);
  let prop = expression.property.name;

  return obj + "." + prop;
}

module.exports = { MemberExpression };
