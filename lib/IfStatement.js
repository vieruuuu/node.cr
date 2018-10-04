const { parseLiterals } = require("./parseLiterals");
const { parseBody } = require("./parseBody");
const { EOL } = require("os");
const defaultIndent = "\t";
function IfStatement(node, indent = "") {
  let test = parseLiterals(node.test);
  let consequent = parseBody(node.consequent.body, indent + defaultIndent);
  let alternate = "";
  if (node.alternate) {
    alternate += "else" + EOL;
    if (node.alternate.type === "BlockStatement") {
      alternate += parseBody(node.alternate.body, indent + defaultIndent);
    } else if (node.alternate.type === "IfStatement") {
      alternate += IfStatement(node.alternate, indent + defaultIndent);
    } else {
      throw node.alternate.type + " eroare nebuna la un if";
    }
  }
  if (alternate) {
    alternate = indent + alternate + EOL;
  }
  let ceva =
    indent + "if " + test + EOL + consequent + EOL + alternate + indent + "end" + EOL;
  return ceva;
}

module.exports = {
  IfStatement
};
