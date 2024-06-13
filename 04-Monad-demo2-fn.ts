import fs from "fs";

// IO effect type
type IO<T> = {
  run: () => T;
  map: <U>(fn: (value: T) => U) => IO<U>;
  flatMap: <U>(fn: (value: T) => IO<U>) => IO<U>;
};

// Helper function to create an IO instance
const CatIO = <T>(effect: () => T): IO<T> => {
  return {
    run: effect,
    map: function <U>(fn: (value: T) => U): IO<U> {
      return CatIO(() => fn(this.run()));
    },
    flatMap: function <U>(fn: (value: T) => IO<U>): IO<U> {
      return this.map(fn).run();
    },
  };
};

// Static `of` method to create an IO instance with a value
CatIO.of = <T>(value: T): IO<T> => {
  return CatIO(() => value);
};

// 调用示例:
const readFile = (filename: string): IO<string> => {
  return CatIO(() => {
    return fs.readFileSync(filename, "utf-8");
  });
};

const print = (x: string): IO<string> => {
  return CatIO(() => {
    console.log(x); // 打印文件内容
    return x;
  });
};

const result = readFile("package.json").flatMap(print).run();
console.log(result);
