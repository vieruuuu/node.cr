const { formatArguments } = require("./formatArguments");
const { parseBody } = require("./parseBody");
const { EOL } = require("os");
const defaultIndent = "\t";

function FunctionDeclaration(node, indent) {
  let name = node.id.name;
  let params = node.params.length ? formatArguments(node.params) : "";
  let body = parseBody(node.body.body, indent + defaultIndent);

  return indent + "def " + name + " " + params + EOL + body + indent + "end" + EOL;
}

module.exports = { FunctionDeclaration };
