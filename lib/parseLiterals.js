const { EOL } = require("os");

function parseLiterals(literal, prev = null, newLine = false) {
  let result = "";
  if (
    literal === null ||
    literal.type === null ||
    literal.type === "NullLiteral"
  ) {
    result = "nil";
  } else if (literal.type === "NumericLiteral") {
    result = literal.value;
  } else if (literal.type === "BooleanLiteral") {
    result = literal.value;
  } else if (literal.type === "StringLiteral") {
    if (literal.value.length === 1) {
      result = `'${literal.value}'`;
    } else {
      result = `"${literal.value}"`;
    }
  } else if (literal.type === "SequenceExpression") {
    literal.expressions.forEach(expr => {
      //i dont know if prev=true will break anything
      result += parseLiterals(expr, true, false);
    });
  } else if (literal.type === "UpdateExpression") {
    let operator = literal.operator;
    switch (operator) {
      case "++":
        operator = "+";
        break;
      case "--":
        operator = "-";
        break;
      default:
        break;
    }
    result = `${literal.argument.name} ${operator}= 1`;
  } else if (literal.type === "MemberExpression") {
    result = require("./MemberExpression")(literal);
  } else if (literal.type === "ConditionalExpression") {
    result = require("./ConditionalExpression")(literal);
  } else if (literal.type === "ArrayExpression") {
    result = require("./ArrayExpression")(literal);
  } else if (literal.type === "CallExpression") {
    result = require("./CallExpression")(literal, "", prev);
  } else if (literal.type === "Identifier" && literal.name) {
    if (literal.name === "undefined") {
      throw "don't use undefined, use null";
    }
    result = literal.name;
  } else if (
    literal.type === "BinaryExpression" ||
    literal.type === "LogicalExpression" ||
    literal.type === "AssignmentExpression"
  ) {
    result = require("./BinaryOrLogicalExpression")(literal);
  } else {
    throw `unsupported literal( ${literal.type} ) rn`;
  }
  return result + (newLine ? EOL : "");
}

module.exports = parseLiterals;
