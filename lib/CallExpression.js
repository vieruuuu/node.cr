const {
  isConsoleLog,
  isConsolePretty,
  isRequire,
  isSymbol,
  isString,
  isToString,
  isParseInt,
  isParseFloat,
  isNumber,
  isReplace,
  isConsoleGet,
  isConsoleReadLine,
  isConsolePrint,
  isToUpperCase,
  isToLowerCase,
  isRange,
  isExclusiveRange
} = require("./specialCases");
const formatArguments = require("./formatArguments");
const reservedRequires = require("./reserverdRequires");
const { EOL: eol } = require("os");

function uniq(a) {
  return Array.from(new Set(a));
}

function CallExpression(_expression, EOL = eol, prev = null) {
  let expression = _expression;
  let _args = expression.arguments;
  let args = formatArguments(_args);
  let result;
  if (isConsoleLog(expression.callee)) {
    result = "puts" + args;
  } else if (isConsolePretty(expression.callee)) {
    result = "pp" + args;
  } else if (isConsoleGet(expression.callee)) {
    result = "gets" + args;
  } else if (isConsolePrint(expression.callee)) {
    result = "print" + args;
  } else if (isConsoleReadLine(expression.callee)) {
    result = "read_line" + args;
  } else if (isToUpperCase(expression.callee)) {
    result = `${require("./parseLiterals")(
      expression.callee.object
    )}.upcase()`;
  } else if (isToLowerCase(expression.callee)) {
    result = `${require("./parseLiterals")(
      expression.callee.object
    )}.downcase()`;
  } else if (isRequire(expression.callee)) {
    let moduleName = _args[0].value;
    if (reservedRequires.includes(moduleName)) {
      let _module = require(`./snippets/${moduleName}/${moduleName}`);
      global.snippets.push(_module.snippet);
      global.modules = uniq(global.modules.concat(_module.modules));
      if (prev) {
        result = _module.name;
      } else {
        result = "";
      }
    }
  } else if (isSymbol(expression.callee)) {
    result = `:${_args[0].value}`;
  } else if (isRange(expression.callee) ) {
    result = `(${_args[0].value}..${_args[1].value})`;
  } else if (isExclusiveRange(expression.callee) ) {
    result = `(${_args[0].value}...${_args[1].value})`;
  } else if (isString(expression.callee)) {
    result = `${require("./parseLiterals")(_args[0])}.to_s()`;
  } else if (isToString(expression.callee)) {
    result = `${require("./parseLiterals")(expression.callee.object)}.to_s()`;
  } else if (isReplace(expression.callee)) {
    result = `${require("./parseLiterals")(
      expression.callee.object
    )}.gsub${args}`;
  } else if (isParseInt(expression.callee)) {
    let radix;
    try {
      radix = require("./parseLiterals")(_args[1]);
    } catch (err) {
      radix = 10;
    }
    result = `${require("./parseLiterals")(
      _args[0]
    )}.to_i?(${radix}, strict: false)`;
  } else if (isParseFloat(expression.callee)) {
    result = `${require("./parseLiterals")(_args[0])}.to_f()`;
  } else if (isNumber(expression.callee)) {
    result = `${require("./parseLiterals")(_args[0])}.to_i?(10, strict: true)`;
  } else if (expression.callee.type === "MemberExpression") {
    result = require("./MemberExpression")(expression.callee) + args + EOL;
  } else if (expression.callee.type === "Identifier") {
    result = expression.callee.name + args + EOL;
  }
  return result + EOL;
}

module.exports = CallExpression;
