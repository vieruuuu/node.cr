const { EOL } = require("os");
const parseBody = require("./parseBody");
const parseLiterals = require("./parseLiterals");

function SwitchCase(nodes) {
  for (let i = 0; i < nodes.length; i++) {
    const node = nodes[i];
    node.consequent.forEach(item => {
      console.log(item.type);
    });
    let test = node.test ? parseLiterals(node.test) : "";
    let body = node.consequent.length
      ? parseBody(node.consequent, ["BreakStatement"])
      : "";
    console.log(body);
  }
  return "";
}

module.exports = SwitchCase;
