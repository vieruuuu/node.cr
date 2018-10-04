module.exports = {
  name: "NODE_COMPAT_CHALK",
  modules: ["colorize"],
  snippet: require("fs")
    .readFileSync("./lib/snippets/chalk/chalk.cr")
    .toString()
};
