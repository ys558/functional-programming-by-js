class Maybe<T> {
  #value: T;
  constructor(value) {
    this.#value = value;
  }
  static of<T>(value: T): Maybe<T> {
    return new Maybe(value);
  }

  map<U>(fn: (value: T) => U | null): Maybe<U | null> {
    return this.isNone() ? Maybe.of(null) : Maybe.of(fn(this.#value));
  }

  extract<U>(fn: (value: T) => U): U {
    return fn(this.#value);
  }

  isNone(): boolean {
    return this.#value === null || this.#value === undefined;
  }
}

const m = Maybe.of<string | null>(null)
  .map((x) => x?.toUpperCase())
  .extract((x) => x);

console.log(m);

const m1 = Maybe.of("hello")
  .map((x) => x.toUpperCase())
  .extract((x) => x);

console.log(m1);
