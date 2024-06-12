const people = [
  { name: "Alice", age: 25 },
  { name: "Bob", age: 30 },
  { name: "Charlie", age: 35 },
];

// ---------传统方法开始-----------
// 传统方法, 必须有 person 参数才能参与, 数据 people 参与到 具体的业务代码中:
const processPerson = (person) => {
  const upperCaseName = person.name.toUpperCase();
  const incrementedAge = person.age + 1;
  const greeting = `Hello, ${upperCaseName}!`;

  return {
    name: upperCaseName,
    age: incrementedAge,
    greeting: greeting,
  };
};
// 传统模式:
const processedPeople = people.map(processPerson);
console.log(processedPeople);
// ---------传统方法结束-----------

// ---------函数式方法开始-----------
// 以下为改用组合模式 compose
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

// Pointfree functions : 摒弃了people 源数据的参与:
const toUpperCaseName = (obj) => ({ ...obj, name: toUpperCase(obj.name) });
const incrementAge = (obj) => ({ ...obj, age: increment(obj.age) });
const addGreeting = (obj) => ({ ...obj, greeting: createGreeting(obj.name) });

const composedPeople = compose(
  toUpperCaseName,
  addGreeting,
  incrementAge,
).execute(people);
console.log(composedPeople);
// ---------函数式方法结束-----------
