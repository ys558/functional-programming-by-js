const add = (a, b) => a + b;
const multiply = (a, b) => a * b;

const operate = (operator, args) => args.reduce(operator);

const numbers = [2, 3, 4];

// 函数式编程的核心：将函数作为参数传递给另一个函数，并使用函数组合来处理数据:
const sumResult = operate(add, numbers);
console.log(sumResult); // 输出：9

const productResult = operate(multiply, numbers);
console.log(productResult); // 输出：24
