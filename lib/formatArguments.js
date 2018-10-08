const parseLiterals = require("./parseLiterals");

function formatArguments(args) {
  let argsLen = args.length;
  let result = "(";
  let results = [];
  for (let i = 0; i < argsLen; i++) {
    const arg = args[i];
    results.push(parseLiterals(arg));
  }
  result += results.join(", ") + ")";
  return result;
}

module.exports = formatArguments;
