// 将 compose03.js 文件改为柯里化
const composeCurry =
  (...fns) =>
  (initialValue) =>
    fns.reduce((value, fn) => fn(value), initialValue);

// 示例函数
const toUpperCase = (x) => x.toUpperCase();
const exclaim = (x) => x + "!";
const reverse = (x) => x.split("").reverse().join("");

const result = composeCurry(toUpperCase, exclaim, reverse)("hello");

console.log(result);
