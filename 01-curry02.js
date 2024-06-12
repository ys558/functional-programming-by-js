// -------- traditional function start --------
const log = (level, message) => {
  console.log(`[${level}] ${message}`);
};

// 使用日志函数
log("INFO", "This is an informational message."); // [INFO] This is an informational message.
log("ERROR", "This is an error message."); // [ERROR] This is an error message.
// -------- traditional function end --------

// -------- curry function start --------
const curryLog = (level) => (message) => {
  console.log(`[${level}] ${message}`);
};

// partial application: pass the log type first
const infoLog = curryLog("INFO");
const errorLog = curryLog("ERROR");

console.log(infoLog); // [Function (anonymous)]

// when calling, passing the message according diff log type,
// only focus on the "message" we want to log
infoLog("This is an informational message."); // [INFO] This is an informational message.
errorLog("This is an error message."); // [ERROR] This is an error message.
// -------- curry function end --------
