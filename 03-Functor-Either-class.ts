abstract class Either<L, R> {
  abstract map<U>(fn: (value: R) => U): Either<L, U>;
  abstract fold<U>(leftFn: (left: L) => U, rightFn: (right: R) => U): U;
}

class Left<L, R> extends Either<L, R> {
  private value: L;

  constructor(value: L) {
    super();
    this.value = value;
  }

  map<U>(_fn: (value: R) => U): Either<L, U> {
    return new Left<L, U>(this.value);
  }

  fold<U>(leftFn: (left: L) => U, _rightFn: (right: R) => U): U {
    return leftFn(this.value);
  }
}

class Right<L, R> extends Either<L, R> {
  private value: R;

  constructor(value: R) {
    super();
    this.value = value;
  }

  map<U>(fn: (value: R) => U): Either<L, U> {
    return new Right<L, U>(fn(this.value));
  }

  fold<U>(_leftFn: (left: L) => U, rightFn: (right: R) => U): U {
    return rightFn(this.value);
  }
}

// 使用示例
const either1 = new Right<string, number>(5)
  .map((x) => x + 1)
  .map((x) => x * 2)
  .fold(
    (left) => `Error: ${left}`,
    (right) => `Success: ${right}`
  );

console.log(either1); // 输出: Success: 12

const either2 = new Left<string, number>("Something went wrong")
  .map((x) => x + 1)
  .map((x) => x * 2)
  .fold(
    (left) => `Error: ${left}`,
    (right) => `Success: ${right}`
  );

console.log(either2); // 输出: Error: Something went wrong
