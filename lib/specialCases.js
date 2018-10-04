function isObj(callee) {
  return callee && callee.object;
}

function isConsole(callee) {
  return (
    isObj(callee) &&
    callee.object.type === "Identifier" &&
    callee.object.name === "console" &&
    callee.property.type === "Identifier"
  );
}

function isConsoleLog(callee) {
  return isConsole(callee) && callee.property.name === "log";
}

function isConsolePretty(callee) {
  return isConsole(callee) && callee.property.name === "pretty";
}

function isRequire(callee) {
  return callee && callee.type === "Identifier" && callee.name === "require";
}

function isEnum(callee) {
  return callee && callee.type === "Identifier" && callee.name === "Enum";
}

function isString(callee) {
  return callee && callee.type === "Identifier" && callee.name === "String";
}

function isToString(callee) {
  return (
    isObj(callee) &&
    callee.property.type === "Identifier" &&
    callee.property.name === "toString"
  );
}

function isParseInt(callee) {
  return callee && callee.type === "Identifier" && callee.name === "parseInt";
}

function isParseFloat(callee) {
  return callee && callee.type === "Identifier" && callee.name === "parseFloat";
}

function isNumber(callee) {
  return callee && callee.type === "Identifier" && callee.name === "Number";
}

module.exports = {
  isConsoleLog,
  isConsolePretty,
  isRequire,
  isEnum,
  isString,
  isToString,
  isParseInt,
  isParseFloat,
  isNumber
};
