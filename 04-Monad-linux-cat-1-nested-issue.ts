import { pipe as compose } from "./02-compose02-reduce.js";
import fs from "fs";

class CatIO<T> {
  effect: () => T;
  constructor(fn) {
    this.effect = fn;
  }

  static of(value) {
    return new CatIO(() => value);
  }
  map<N>(fn: (value: T) => N): CatIO<N> {
    return new CatIO(() => fn(this.effect()));
  }
}

// 调用示例:
const readFile = (filename) => {
  return new CatIO(() => {
    return fs.readFileSync(filename, "utf-8");
  });
};

const print = (x) => {
  return new CatIO(() => {
    return x;
  });
};

const catCmd = compose(readFile, print);

// CatIO(CatIO(x)) cos of every CatIO(x) just return the functor container, so we just return the value, but it will not follow the functor pattern, effect() should be the private variable.
const result = catCmd("package.json").effect().effect();
console.log(result);
/**
{
  "name": "functional_programming",
  "version": "1.0.0",
  "main": "Functor.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "description": "",
  "dependencies": {
    "@mostly-adequate/support": "^2.0.1",
    "fp-ts": "^2.16.6",
    "immutable": "^4.3.6"
  },
  "type": "module"
}
 */
