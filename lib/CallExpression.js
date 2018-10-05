const {
  isConsoleLog,
  isConsolePretty,
  isRequire,
  isEnum,
  isString,
  isToString,
  isParseInt,
  isParseFloat,
  isNumber
} = require("./specialCases");
const { formatArguments } = require("./formatArguments");
const reservedRequires = require("./reserverdRequires");
const { EOL: eol } = require("os");

function uniq(a) {
  return Array.from(new Set(a));
}

function CallExpression(_expression, EOL = eol, prev = null, indent) {
  let expression = _expression;
  let args = formatArguments(expression.arguments);
  let result = indent 
  if (isConsoleLog(expression.callee)) {
    result +=  "puts" + args + EOL;
  } else if (isConsolePretty(expression.callee)) {
    result +=  "pp" + args + EOL;
  } else if (isRequire(expression.callee)) {
    let moduleName = expression.arguments[0].value;
    if (reservedRequires.includes(moduleName)) {
      let _module = require(`./snippets/${moduleName}/${moduleName}`);
      global.snippets.push(_module.snippet);
      global.modules = uniq(global.modules.concat(_module.modules));
      if (prev) {
        result +=  _module.name;
      } else {
        result +=  "";
      }
    }
  } else if (isEnum(expression.callee)) {
    result +=  `:${expression.arguments[0].value}`;
  } else if (isString(expression.callee)) {
    result +=  `${require("./parseLiterals").parseLiterals(
      expression.arguments[0]
    )}.to_s()`;
  } else if (isToString(expression.callee)) {
    result +=  `${require("./parseLiterals").parseLiterals(
      expression.callee.object
    )}.to_s()`;
  } else if (isParseInt(expression.callee)) {
    let radix;
    try {
      radix = require("./parseLiterals").parseLiterals(expression.arguments[1]);
    } catch (err) {
      radix = 10;
    }
    result +=  `${require("./parseLiterals").parseLiterals(
      expression.arguments[0]
    )}.to_i?(${radix}, strict: false)`;
  } else if (isParseFloat(expression.callee)) {
    result +=  `${require("./parseLiterals").parseLiterals(
      expression.arguments[0]
    )}.to_f()`;
  } else if (isNumber(expression.callee)) {
    result +=  `${require("./parseLiterals").parseLiterals(
      expression.arguments[0]
    )}.to_i?(10, strict: true)`;
  } else if (expression.callee.type === "MemberExpression") {
    result +=  (
      require("./MemberExpression").MemberExpression(expression.callee) +
      args +
      EOL
    );
  } else if (expression.callee.type === "Identifier") {
    result +=  expression.callee.name + args + EOL;
  }
  return result
}

module.exports = {
  CallExpression
};
