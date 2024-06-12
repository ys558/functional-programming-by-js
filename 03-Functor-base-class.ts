class Container<T> {
  #value: T;

  constructor(value: T) {
    this.#value = value;
  }

  static of<T>(value: T): Container<T> {
    return new Container(value);
  }

  map<U>(fn: (value: T) => U): Container<U> {
    return Container.of(fn(this.#value));
  }

  // extract 方法，用于最终处理和提取值
  extract<U>(fn: (value: T) => U): U {
    return fn(this.#value);
  }
}

// 使用示例
const c = Container.of(3)
  .map((x) => x + 1)
  .map((x) => x * x)
  .extract((x) => x);

console.log(c); // 输出: 16
