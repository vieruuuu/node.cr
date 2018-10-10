const parseLiterals = require("./parseLiterals");
const parseBody = require("./parseBody");
const { EOL } = require("os");
function IfStatement(node) {
  let test = parseLiterals(node.test);
  let consequent = parseBody(node.consequent.body);
  let alternate = "";
  if (node.alternate) {
    alternate += "else" + EOL;
    if (node.alternate.type === "BlockStatement") {
      alternate += parseBody(node.alternate.body);
    } else if (node.alternate.type === "IfStatement") {
      alternate += IfStatement(node.alternate);
    } else {
      throw node.alternate.type + " eroare nebuna la un if";
    }
  }
  if (alternate) {
    alternate = alternate + EOL;
  }
  return "if " + test + EOL + consequent + EOL + alternate + "end" + EOL;
}

module.exports = IfStatement;
