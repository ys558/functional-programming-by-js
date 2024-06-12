const Container = <T>(value: T) => ({
  map: <U>(fn: (value: T) => U) => Container(fn(value)),
  extract: <U>(fn: (value: T) => U): U => fn(value),
});

// 使用示例
const c = Container(3)
  .map((x) => x + 1)
  .map((x) => x * x)
  .extract((x) => x);

console.log(c); // 输出: 16
