String.prototype.extractInnerExpression = function () {
  let i;
  let closingParenthesesNeeded = 1;
  for (
    i = this.indexOf("(");
    i < this.length && closingParenthesesNeeded > 0;
    i++
  ) {
    if (this[i + 1] == "(") ++closingParenthesesNeeded;
    if (this[i + 1] == ")") --closingParenthesesNeeded;
  }
  return this.substring(this.indexOf("(") + 1, i);
};

String.prototype.replaceWithInnerExpressionResult = function (callback) {
  return this.replace(
    `(${this.extractInnerExpression()})`,
    callback(this.extractInnerExpression()).toString()
  );
};

String.prototype.sum = function () {
  return this.split("+")
    .map(Number)
    .reduce((acc, v) => (acc += v))
    .toString();
};

String.prototype.subtract = function () {
  return this.match(/-?\d+(\.\d+)?/g)
    .map(Number)
    .reduce((acc, v) => (acc += v))
    .toString();
};

String.prototype.divide = function () {
  return this.split("/")
    .map(Number)
    .reduce((acc, v) => (acc /= v))
    .toString();
};

String.prototype.multiply = function () {
  return this.split("*")
    .map(Number)
    .reduce((acc, v) => (acc *= v))
    .toString();
};

function calc(expression = "") {
  expression = expression.replace(/\s+/g, "");

  if (expression.includes("("))
    return calc(expression.replaceWithInnerExpressionResult(calc));

  expression = expression.replace(/--/g, "+").replace(/\++/g, "+");

  while (expression.includes("/") || expression.includes("*")) {
    const [microExpression] = expression.match(
      /-?\d+(\.\d+)?(\/|\*)(-|\+)?\d+(\.\d+)?/g
    );
    expression = expression.replace(
      microExpression,
      microExpression.includes("/")
        ? microExpression.divide()
        : microExpression.multiply()
    );
  }

  expression = expression
    .replace(/--/g, "+")
    .replace(/\++/g, "+")
    .replace(/(-\+|\+-)/g, "-");

  while (expression.search(/-?\d+(\.\d+)?(\+|-)\d+(\.\d+)?/g) != -1) {
    const [microExpression] = expression.match(
      /-?\d+(\.\d+)?(\+|-)\d+(\.\d+)?/g
    );
    expression = expression.replace(
      microExpression,
      microExpression.includes("+")
        ? microExpression.sum()
        : microExpression.subtract()
    );
  }

  return Number(expression);
}

calc("(1 - 2) + -(-(-(-4)))");
