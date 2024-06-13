// reduce 符合从左往右的阅读习惯的执行顺序:
export const pipe =
  (...fns) =>
  (x) =>
    fns.reduce((v, f) => f(v), x);

const double = (x) => x * 2;
const increment = (x) => x + 1;
const square = (x) => x * x;
const half = (x) => x / 2;
const decrement = (x) => x - 1;

const pipedFunction = pipe(double, increment, square, half, decrement);

const result = pipedFunction(3); // 计算顺序：double(3) => 6, increment(6) => 7, square(7) => 49, half(49) => 24.5, decrement(24.5) => 23.5
// console.log(result); // 23.5
