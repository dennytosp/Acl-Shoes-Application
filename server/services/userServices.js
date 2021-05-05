var userModel = require("../models/userModel");

exports.login = async function login(username, password) {
  let usMod = await userModel.findOne({ username: username, password: password });
  return usMod;
};
exports.loginU = async function login(username,) {
  let usMod = await userModel.findOne({ username: username});
  return usMod;
};
exports.screenlock = async function screenlock(password) {
  let usMod = await userModel.findOne({password: password });
  return usMod;
};
// exports.getListUser = async function getListUser() {
//   let prod = await userModel.find();
//   return prod;
// };

// exports.getUserById = async function getUserById(id) {
//   let prod = await userModel.findById(id);
//   // prod = { ...prod, id: prod._id };
//   return prod;
// };

// exports.addNew = async function addNewProduct(id, res) {
//   let prod = new userModel(id)
//   await prod.save();
// };

// exports.edit = async function editProduct(prod) {
//   let prodEdit = await userModel.findById(prod.id)
//   // console.log(prodEdit);
//   if(prodEdit){
//     prodEdit.email = prod.email;
//     prodEdit.password = prod.password;
//   }
//   await prodEdit.save()
// };

// exports.remove = async function removeProductById(id) {
//   let removeProd = await userModel.findByIdAndRemove(id)
//   return await removeProd;
// };
