// -------- traditional function start --------
const checkPermission = (role, resource) => {
  // 假设我们有一些权限检查逻辑
  return role === "admin" || resource === "public";
};

// 使用权限检查函数
console.log(checkPermission("admin", "private")); // true
console.log(checkPermission("user", "public")); // true
console.log(checkPermission("user", "private")); // false
// -------- traditional function end --------

// -------- curry function start --------
const curryCheckPermission = (role) => (resource) =>
  role === "admin" || resource === "public";

// partial process: named function, like "adminCheck", "userCheck", may clear which the role we need to use
const adminCheck = curryCheckPermission("admin");
const userCheck = curryCheckPermission("user");

console.log(adminCheck("private")); // true
console.log(userCheck("public")); // true
console.log(userCheck("private")); // false
// -------- curry function end --------
