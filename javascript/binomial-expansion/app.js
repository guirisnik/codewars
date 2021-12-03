// The purpose of this kata is to write a program that can do some algebra. Write a function expand that takes in an expression with a single, one character variable, and expands it. The expression is in the form (ax+b)^n where a and b are integers which may be positive or negative, x is any single character variable, and n is a natural number. If a = 1, no coefficient will be placed in front of the variable. If a = -1, a "-" will be placed in front of the variable.

// The expanded form should be returned as a string in the form ax^b+cx^d+ex^f... where a, c, and e are the coefficients of the term, x is the original one character variable that was passed in the original expression and b, d, and f, are the powers that x is being raised to in each term and are in decreasing order. If the coefficient of a term is zero, the term should not be included. If the coefficient of a term is one, the coefficient should not be included. If the coefficient of a term is -1, only the "-" should be included. If the power of the term is 0, only the coefficient should be included. If the power of the term is 1, the caret and power should be excluded.

const validExpression = /\((-?\d+)?[a-z](-|\+)\d+\)\^\d+/g;
const groupedExpression = /\((?<a>-?\d+)?(?<v>[a-z])(?<b>[-+]\d+)\)\^(?<n>\d+)/;

Number.prototype.factorial = function () {
  let accumulator = 1;
  for (let i = Math.floor(this); i > 0; i--) accumulator *= i;
  return accumulator;
};

function binomial(n = 0, k = 0) {
  return n.factorial() / ((n - k).factorial() * k.factorial());
}

function expand(expr) {
  const groupedExpression =
    /\((?<a>-?\d*)?(?<v>[a-z])(?<b>[-+]\d+)\)\^(?<n>\d+)/;
  let { a, v, b, n } = expr.match(groupedExpression).groups;
  n = Number(n);
  a = a == '-' ? -1 : (a ? Number(a) : 1);
  b = Number(b);
  let r = "";

  if (n == 0) return "1";

  for (let i = 0; i <= n; i++) {
    const c = Math.pow(a, n - i) * Math.pow(b, i) * binomial(n, i);
    if (c != 0) {
      if (i * c > 0) r += "+";
      if (c < 0) r += "-";
      if (Math.abs(c) != 1 || n - i == 0) r += Math.abs(c);
      if (n - i > 0) r += v;
      if (n - i > 1) r += `^${n - i}`;
    }
  }

  return r;
}

const expr = [
  '(-n-12)^5'
];

expr.map(expand).forEach(console.log);
