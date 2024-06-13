import fs from "fs";
import { pipe as compose } from "./02-compose02-reduce.js";

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

  join<U>(this: CatIO<CatIO<U>>): CatIO<U> {
    return this.#effect();
  }

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

const catCmd = compose(readFile, print);

const result = catCmd("package.json").flatMap(print).run();
console.log(result);
