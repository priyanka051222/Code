/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (s) {
  function evaluate(values, ops) {
    let val2 = values.pop();
    let val1 = values.pop();
    let op = ops.pop();
    values.push(applyOp(val1, val2, op));
  }

  function applyOp(a, b, op) {
    switch (op) {
      case "+":
        return a + b;
      case "-":
        return a - b;
      case "*":
        return a * b;
      case "/":
        return a / b;
    }
  }

  function precedence(token) {
    if (token === "+" || token === "-") return 1;

    if (token === "/" || token === "*") return 2;

    return 0;
  }

  var tokens = s.split("");
  var ops = [];
  var values = [];
  var i = 0;

  for (i = 0; i < tokens.length; i++) {
    if (tokens[i] === " ") {
      continue;
    } else if (tokens[i] === "(") {
      ops.push(tokens[i]);
    } else if (!isNaN(parseInt(tokens[i], 10))) {
      var val = 0;
      // There may be more than one
      // digits in number.
      while (i < tokens.length && !isNaN(parseInt(tokens[i], 10))) {
        val = val * 10 + Number(tokens[i]);
        i++;
      }
      values.push(val);
      i--;
    } else if (tokens[i] === ")") {
      while (ops.length !== 0 && ops[ops.length - 1] !== "(") {
        evaluate(values, ops);
      }
      // pop opening brace.
      if (ops.length !== 0) ops.pop();
    }

    // Current token is an operator.
    else {
      // While top of 'ops' has same or greater
      // precedence to current token, which
      // is an operator. Apply operator on top
      // of 'ops' to top two elements in values stack.
      while (
        ops.length !== 0 &&
        precedence(ops[ops.length - 1]) >= precedence(tokens[i])
      ) {
        evaluate(values, ops);
      }

      // Push current token to 'ops'.
      ops.push(tokens[i]);
    }
  }

  // Entire expression has been parsed at this
  // point, apply remaining ops to remaining
  // values.
  while (ops.length !== 0) {
    evaluate(values, ops);
  }
  return values.pop();
};

console.log(calculate("11+21+1"));
console.log(calculate("100*(1+22)"));
console.log(calculate("100* (2+12)/14"));
console.log(calculate("100 * 2 + 12"));
