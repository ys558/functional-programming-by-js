// compose 函数实现
// 1. 不限传进来函数的个数
// 2. reduceRight 和上一个例子 compose-base.js 执行顺序一致, 从右往左执行:
const compose =
  (...fns) =>
  (x) =>
    fns.reduceRight((acc, fn) => fn(acc), x);

// reduce 函数实现
const reduce = (fn, initial) => (arr) => {
  let acc = initial;
  for (let i = 0; i < arr.length; i++) {
    acc = fn(acc, arr[i]);
  }
  return acc;
};

const debug = (label) => (value) => {
  console.log(`${label}:`, value);
  return value;
};

// 第1个例子中的其他函数
const toUpperCase = (x) => x.toUpperCase();
const exclaim = (x) => `${x}!`;

// 执行顺序: toUpperCase -> debug -> exclaim
const shout = compose(exclaim, debug("after toUpperCase"), toUpperCase);

// 测试第1个例子
console.log(shout("hello")); // "HELLO!"

// 第2个例子中的其他函数
const head = (x) => x[0];
const reverse = reduce((acc, x) => [x, ...acc], []);

// 测试第2个例子
const arg = ["jumpkick", "roundhouse", "uppercut"];
const lastUpper = compose(toUpperCase, head, reverse);
console.log(lastUpper(arg)); // "UPPERCUT"

const loudLastUpper = compose(exclaim, toUpperCase, head, reverse);
console.log(loudLastUpper(arg)); // "UPPERCUT!"
