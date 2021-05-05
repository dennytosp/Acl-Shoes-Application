var userServices = require("../services/userServices");

exports.login = async function login(username, password) {
  return await userServices.login(username, password);
};
exports.loginU = async function login(username,) {
  return await userServices.login(username);
};
exports.screenlock = async function screenlock(password) {
  return await userServices.screenlock(password);
};

// exports.getListUser = async function getListUser() {
//   return await userServices.getListUser();
// };
// exports.getUserById = async function getUserById(id) {
//   return await userServices.getUserById(id);
// };

// exports.addNew = async function addNewUser(params) {
//   let { email, password } = params;
//   let us = {
//     email: email,
//     password: password,
//   };

//   // Tạo mới một sản phẩm
//   await userServices.addNew(us);
// };

// exports.edit = async function editProduct(id, params) {
//   let { email, password } = params;
//   let us = {
//     id,
//     email,
//     password,
//   };
//   await userServices.edit(us);
// };

// exports.remove = async function removeUserById(id) {
//   await userServices.remove(id);
// };
