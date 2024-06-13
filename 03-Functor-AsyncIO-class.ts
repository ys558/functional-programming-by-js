class AsyncIO<T> {
  private effect: () => Promise<T>;

  constructor(effect: () => Promise<T>) {
    if (typeof effect !== "function") {
      throw new TypeError("AsyncIO expects a function");
    }
    this.effect = effect;
  }

  // map method to transform the value inside AsyncIO
  map<U>(fn: (value: T) => U): AsyncIO<U> {
    return new AsyncIO<U>(async () => {
      const result = await this.effect();
      return fn(result);
    });
  }

  // run method to execute the effect
  async run(): Promise<T> {
    return await this.effect();
  }

  // static of method to create an AsyncIO instance
  static of<T>(value: T | (() => Promise<T>)): AsyncIO<T> {
    return new AsyncIO<T>(async () => {
      if (typeof value === "function") {
        return await (value as () => Promise<T>)();
      } else {
        return value;
      }
    });
  }
}

// 使用示例

// 创建一个AsyncIO实例，将其包装一个异步任务
const fetchData = AsyncIO.of(async () => {
  const response = await fetch("https://jsonplaceholder.typicode.com/todos/1");
  if (!response.ok) {
    throw new Error("Network response was not ok");
  }
  return response.json();
});

// 使用map方法对数据进行转换
const processedData = fetchData.map((data) => ({
  ...data,
  title: data.title.toUpperCase(),
  completed: data.completed ? "Yes" : "No",
}));

// 用顶层 await的方式获取值, 必须模块化导出 export
export const ret = await processedData.run();
console.log(ret); // { userId: 1, id: 1, title: 'DELECTUS AUT AUTEM', completed: 'No' }
