type Effect<T> = () => Promise<T>;

interface AsyncIO<T> {
  map<U>(fn: (value: T) => U): AsyncIO<U>;
  run(): Promise<T>;
}

const AsyncIO = <T>(effect: Effect<T>): AsyncIO<T> => {
  if (typeof effect !== "function") {
    throw new TypeError("AsyncIO expects a function");
  }

  return {
    map<U>(fn: (value: T) => U): AsyncIO<U> {
      return AsyncIO(async () => {
        const result = await effect();
        return fn(result);
      });
    },
    run(): Promise<T> {
      return effect();
    },
  };
};

AsyncIO.of = <T>(value: T | Effect<T>): AsyncIO<T> => {
  return AsyncIO(async () => {
    if (typeof value === "function") {
      return await (value as Effect<T>)();
    } else {
      return value;
    }
  });
};

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
