function MemberExpression(expression) {
  let obj = require("./parseLiterals")(expression.object, true);
  let prop = expression.property.name;

  switch (prop) {
    case 'length':
        prop = 'size()'
      break;
  
    default:
      break;
  }

  return obj + "." + prop;
}

module.exports = MemberExpression;
