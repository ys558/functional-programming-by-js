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
    return new IO(() => fn(this.#effect()));
  }

  // flatMap method to chain IO operations
  flatMap<U>(fn: (value: T) => IO<U>): IO<U> {
    return this.map(fn).join();
  }

  // join method to flatten nested IO
  join<U>(this: IO<IO<U>>): IO<U> {
    const result = this.#effect();
    if (!(result instanceof IO)) {
      throw new TypeError(
        "join expects the wrapped value to be an instance of IO"
      );
    }
    return result;
  }

  // run method to execute the effect
  run(): T {
    return this.#effect();
  }

  // static of method to create an IO instance
  static of<T>(value: T): IO<T> {
    return new IO(() => value);
  }
}

// 使用示例

const readFile = IO.of("File content");
const appendData = (content: string) =>
  IO.of(content + " with additional data");

const program = readFile
  .flatMap((content) => appendData(content))
  .map((content) => content.toUpperCase());

// 运行并获取最终的结果
const result = program.run();
console.log(result); // 输出: 'FILE CONTENT WITH ADDITIONAL DATA'
