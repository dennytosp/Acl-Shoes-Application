var customerServices = require("../services/customerServices");
var customerModel = require("../models/customerModel");

exports.getListCustomers = async function getListCustomers() {
  return await customerServices.getListCustomers();
};

exports.getCustomersById = async function getCustomersById(id) {
  return await customerServices.getCustomersById(id);
};
exports.addNew = async function addNewCustomer(params, res) {
  let { email, pass } = params;
  const modelCustomer = new customerModel({
    email: email,
    pass: pass,
  });
  // Tạo mới một sản phẩm
  await customerServices.addNew(modelCustomer, res);
};

// exports.addNewJson = async function addNewJson(params, res) {
//   let { user, pass } = params;
//   const modelCustomer = new customerModel({
//     user: user,
//     pass: pass,
//   });
//   // Tạo mới một sản phẩm
//   await customerServices.addNewJson(modelCustomer, res);
// };

exports.edit = async function editCustomer(id, params) {
  let { fullname, email, pass } = params;
  let custom = {
    id,
    fullname,
    email,
    pass,
  };
  await customerServices.edit(custom);
};

exports.remove = async function removeCustomerById(id) {
  await customerServices.remove(id);
};
exports.checkCurrentPassword = async function checkCurrentPassword(pass) {
  return await customerServices.checkCurrentPassword(pass);
};
