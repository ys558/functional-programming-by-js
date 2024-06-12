type Either<L, R> = {
  map: <U>(fn: (value: R) => U) => Either<L, U>;
  fold: <U>(leftFn: (left: L) => U, rightFn: (right: R) => U) => U;
};

const Left = <L, R>(value: L): Either<L, R> => ({
  map: <U>(_fn: (value: R) => U): Either<L, U> => Left<L, U>(value),
  fold: <U>(leftFn: (left: L) => U, _rightFn: (right: R) => U): U =>
    leftFn(value),
});

const Right = <L, R>(value: R): Either<L, R> => ({
  map: <U>(fn: (value: R) => U): Either<L, U> => Right<L, U>(fn(value)),
  fold: <U>(_leftFn: (left: L) => U, rightFn: (right: R) => U): U =>
    rightFn(value),
});

// 使用示例
const either1 = Right<string, number>(5)
  .map((x) => x + 1)
  .map((x) => x * 2)
  .fold(
    (left) => `Error: ${left}`,
    (right) => `Success: ${right}`
  );

console.log(either1); // 输出: Success: 12

const either2 = Left<string, number>("Something went wrong")
  .map((x) => x + 1)
  .map((x) => x * 2)
  .fold(
    (left) => `Error: ${left}`,
    (right) => `Success: ${right}`
  );

console.log(either2); // 输出: Error: Something went wrong
