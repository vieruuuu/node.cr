const parseLiterals = require("./parseLiterals");

function MemberExpression(expression) {
  let obj = parseLiterals(expression.object, true);
  let prop = parseLiterals(expression.property);
  let computed = expression.computed;
  switch (prop) {
    case "length":
      if (!computed) {
        prop = "size()";
      }
      break;

    default:
      break;
  }

  return obj + (computed ? "[" : ".") + prop + (computed ? "]" : "");
}

module.exports = MemberExpression;
