// 函数组合 compose 实质上就是传进来若干个函数, 再嵌套执行:
const compose = (f, g) => (x) => f(g(x));

const id = (x) => x;

const add1 = (x) => x + 1;
const mul2 = (x) => x * 2;

const add1ThenMul2 = compose(mul2, add1);

// 执行从右往左执行, add1ThenMul2命名也是从右往左定义
console.log(add1ThenMul2(3)); // 8

// 验证组合性
const add1ThenMul2ThenId = compose(id, add1ThenMul2);
console.log(add1ThenMul2ThenId(3)); // 8

// 验证单位性
const idThenAdd1 = compose(add1, id);
console.log(idThenAdd1(3)); // 4
