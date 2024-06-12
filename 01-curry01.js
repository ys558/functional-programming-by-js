const curryAdd = (a) => (b) => a + b;

const addFive = curryAdd(5);

// curry vantage: partial call fn
console.log(addFive(10)); // 输出：15
