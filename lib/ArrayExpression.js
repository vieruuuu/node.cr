let parseLiterals = require('./parseLiterals')

function ArrayExpression(expression) {
    let results = []
    expression.elements.forEach(element => {
        results.push(parseLiterals(element))
    });
    return `[${results.join(', ')}]`
}

module.exports = ArrayExpression