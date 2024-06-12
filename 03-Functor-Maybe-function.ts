const Maybe = <T>(value: T) => ({
  map: <U>(fn: (value: T) => U | null): ReturnType<typeof Maybe<U | null>> =>
    Maybe(fn(value)),
  extract: <U>(fn: (value: T) => U): U => fn(value),
});

// 使用示例
const m = Maybe<string | null>(null)
  .map((x) => x?.toUpperCase() || null)
  .extract((x) => x);

console.log(m); // null

const m1 = Maybe("hello world")
  .map((x) => x.toUpperCase())
  .extract((x) => x);

console.log(m1); // 'HELLO WORLD'
