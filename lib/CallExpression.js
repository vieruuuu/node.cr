const {
  isConsoleLog,
  isConsolePretty,
  isRequire,
  isEnum
} = require("./specialCases");
const { formatArguments } = require("./formatArguments");
const reservedRequires = require("./reserverdRequires");
const { EOL: eol } = require("os");

function uniq(a) {
  return Array.from(new Set(a));
}

function CallExpression(_expression, EOL = eol, prev = null) {
  let expression = _expression;
  let args = formatArguments(expression.arguments);
  if (isConsoleLog(expression.callee)) {
    return "puts" + args + EOL;
  } else if (isConsolePretty(expression.callee)) {
    return "pp" + args + EOL;
  } else if (isRequire(expression.callee)) {
    let moduleName = expression.arguments[0].value;
    if (reservedRequires.includes(moduleName)) {
      let _module = require(`./snippets/${moduleName}/${moduleName}`);
      global.snippets.push(_module.snippet);
      global.modules = uniq(global.modules.concat(_module.modules));
      if (prev) {
        return _module.name;
      } else {
        return "";
      }
    }
  } else if (isEnum(expression.callee)) {
    return `:${expression.arguments[0].value}`;
  } else if (expression.callee.type === "MemberExpression") {
    return (
      require("./MemberExpression").MemberExpression(expression.callee) +
      args +
      EOL
    );
  } else if (expression.callee.type === "Identifier") {
    return expression.callee.name + args + EOL;
  }
}

module.exports = {
  CallExpression
};
