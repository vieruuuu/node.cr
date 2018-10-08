const { EOL } = require("os");
const defaultIndent = "\t";
const parseBody = require("./parseBody");
const parseLiterals = require("./parseLiterals");

function SwitchCase(nodes, indent = "") {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    node.consequent.forEach(item => {
      console.log(item.type)
    });
    let test = node.test ? parseLiterals(node.test) : '';
    let body = node.consequent.length ? parseBody(node.consequent, indent + defaultIndent, ['BreakStatement']) : '';
    console.log(body)
    
  }
  return '';
}

module.exports = SwitchCase;
