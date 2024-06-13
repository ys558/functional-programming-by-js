type IO<T> = {
  run: () => T;
  map: <U>(fn: (value: T) => U) => IO<U>;
  flatMap: <U>(fn: (value: T) => IO<U>) => IO<U>;
  join: () => IO<any>;
};

// Helper function to create an IO instance
const createIO = <T>(effect: () => T): IO<T> => {
  if (typeof effect !== "function") {
    throw new TypeError("IO expects a function");
  }

  const run = () => effect();

  const map = <U>(fn: (value: T) => U): IO<U> => createIO(() => fn(run()));

  const flatMap = <U>(fn: (value: T) => IO<U>): IO<U> => map(fn).join();

  const join = (): IO<any> => {
    const result = run();
    if (!(result instanceof Object && "run" in result)) {
      throw new TypeError(
        "join expects the wrapped value to be an instance of IO"
      );
    }
    return result as unknown as IO<any>;
  };

  return { run, map, flatMap, join };
};

// Static `of` method to create an IO instance with a value
const IO = {
  of: <T>(value: T): IO<T> => createIO(() => value),
};

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
