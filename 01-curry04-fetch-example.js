// -------- traditional function start --------
const sendRequest = (method, url, data) => {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

// 使用原始函数
sendRequest("POST", "https://jsonplaceholder.typicode.com/todos", {
  key: "value",
}).then((response) => console.log("unused curry:", response));
// -------- traditional function end --------

// -------- curry function start --------
const currySendRequest = (method) => (url) => (data) => {
  return fetch(url, {
    method: method,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  }).then((response) => response.json());
};

// 创建专门的请求函数
const postRequest = currySendRequest("POST");
const getRequest = currySendRequest("GET");

const postToApi = postRequest("https://jsonplaceholder.typicode.com/posts");
const getFromApi = getRequest("https://jsonplaceholder.typicode.com/todos/12");

// 使用专门的请求函数, 只需关注传参的参数, 不需要关注传参的顺序 及 传参方法, 请求 url 等
postToApi({ key: "value" }).then((response) =>
  console.log("POST Response:", response)
);

getFromApi().then((response) => console.log("GET Response:", response));
// -------- curry function end --------
