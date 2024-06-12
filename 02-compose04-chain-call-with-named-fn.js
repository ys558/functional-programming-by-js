const composePipe = (...fns) => {
  const execute = (initialValue) => {
    return fns.reduce((value, fn) => fn(value), initialValue);
  };
  return { execute };
};

// 示例函数
const toUpperCase = (x) => x.toUpperCase();
const exclaim = (x) => x + "!";
const reverse = (x) => x.split("").reverse().join("");

// 创建组合函数
const result = composePipe(toUpperCase, exclaim, reverse).execute("hello");

console.log(result); // 输出: !OLLEH
