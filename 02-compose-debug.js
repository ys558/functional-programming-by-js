const debug = (label) => (value) => {
  console.log(`${label}:`, value);
  return value;
};

const compose = (...fns) => {
  const execute = (initialArray) => {
    return initialArray.map((item) =>
      fns.reduce((value, fn) => fn(value), item),
    );
  };

  return { execute };
};

const toUpperCase = (str) => str.toUpperCase();
const increment = (n) => n + 1;
const createGreeting = (name) => `Hello, ${name}!`;

const toUpperCaseName = (obj) => ({ ...obj, name: toUpperCase(obj.name) });
const incrementAge = (obj) => ({ ...obj, age: increment(obj.age) });
const addGreeting = (obj) => ({ ...obj, greeting: createGreeting(obj.name) });

const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

const composed = compose(
  toUpperCaseName,
  debug("After toUpperCaseName"),
  incrementAge,
  debug("After incrementAge"),
  addGreeting,
  debug("After addGreeting"),
);

const result = composed.execute(people);
console.log(result);
