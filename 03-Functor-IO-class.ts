class IO<T> {
  #effect: () => T;

  constructor(effect: () => T) {
    if (typeof effect !== "function") {
      throw new TypeError("IO expects a function");
    }
    this.#effect = effect;
  }

  // map method to transform the value inside IO
  map<U>(fn: (value: T) => U): IO<U> {
    return IO.of(() => fn(this.#effect()));
  }

  // run method to execute the effect
  run(): T {
    return this.#effect();
  }

  // static of method to create an IO instance
  static of<T>(value: T | (() => T)): IO<T> {
    return new IO(
      typeof value === "function" ? (value as () => T) : () => value
    );
  }
}

// --------------示例使用-------------------

// 创建一个IO实例，将其包装一个副作用函数
const io = IO.of(5)
  .map((x) => x + 1)
  .map((x) => x * 2);

// 运行并获取最终的结果
const result = io.run();
console.log(result); // 输出: 12

// 创建一个读取用户输入的IO Functor
const readInput = IO.of(() => prompt("Enter a value:"));
const p = (x: string) => IO.of(() => console.log(`You entered: ${x}`));

const app = readInput
  .map((input) => input?.toUpperCase() || "")
  .map((input) => `Hello, ${input}!`)
  .map(p)
  .map((io) => io.run());

app.run(); // 将显示一个提示输入框，然后打印用户输入的值
