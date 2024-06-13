import fs from "fs";

class CatIO<T> {
  #effect: () => T;

  constructor(fn: () => T) {
    if (typeof fn !== "function") {
      throw new TypeError("CatIO expects a function");
    }
    this.#effect = fn;
  }

  static of<T>(value: T): CatIO<T> {
    return new CatIO(() => value);
  }

  map<U>(fn: (value: T) => U): CatIO<U> {
    return new CatIO(() => fn(this.#effect()));
  }

  // 增加 join 方法, 直接获取私有变量 #effect 的值
  join<U>(this: CatIO<CatIO<U>>): CatIO<U> {
    return this.#effect();
  }

  // 增加 flatMap 方法, 直接调用 map 方法, 再调用 join 方法, 获取 U 类型的值
  flatMap<U>(fn: (value: T) => CatIO<U>): CatIO<U> {
    return this.map(fn).join();
  }

  run(): T {
    return this.#effect();
  }
}

// 调用示例:
const readFile = (filename: string): CatIO<string> => {
  return new CatIO(() => {
    return fs.readFileSync(filename, "utf-8");
  });
};

const print = (x: string): CatIO<string> => {
  return new CatIO(() => {
    console.log(x); // 打印文件内容
    return x;
  });
};

const result = readFile("package.json").flatMap(print).run();
console.log(result);
