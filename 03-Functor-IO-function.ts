type Effect<T> = () => T;

interface IO<T> {
  map<U>(fn: (value: T) => U): IO<U>;
  run(): T;
}

const IO = <T>(value: T | Effect<T>): IO<T> => {
  const effect: Effect<T> =
    typeof value === "function" ? (value as Effect<T>) : () => value;

  return {
    map<U>(fn: (value: T) => U): IO<U> {
      return IO(() => fn(effect()));
    },
    run(): T {
      return effect();
    },
  };
};

// 使用示例

// 创建一个IO实例，将其包装一个副作用函数
const io = IO(5)
  .map((x) => x + 1)
  .map((x) => x * 2);

// 运行并获取最终的结果
const result = io.run();
console.log(result); // 输出: 12

// 创建一个读取用户输入的IO Functor
const readInput = IO(() => prompt("Enter a value:"));
const p = (x: string) => IO(() => console.log(`You entered: ${x}`));

const app = readInput
  .map((input) => input?.toUpperCase() || "")
  .map((input) => `Hello, ${input}!`)
  .map(p)
  .map((io) => io.run());

app.run(); // 将显示一个提示输入框，然后打印用户输入的值
