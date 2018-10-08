const { EOL } = require("os");
const parseBody = require("./parseBody");

function generate(_code) {
  let code = parseBody(_code);
  let _modules = [];
  let _snippets = [];
  if (global.modules.length) {
    global.modules.forEach(_module => {
      _modules.push(`require "${_module}"`);
    });
    _modules = _modules.join(EOL) + EOL + EOL;
  } else {
    _modules = "";
  }
  if (global.snippets.length) {
    global.snippets.forEach(snippet => {
      _snippets.push(snippet);
    });
    _snippets = _snippets.join(EOL) + EOL + EOL;
  } else {
    _snippets = "";
  }
  return _modules + _snippets + code;
}

module.exports = generate;
