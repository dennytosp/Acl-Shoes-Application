const customerModel = require("../models/customerModel");
var CustomerModel = require("../models/customerModel");

exports.getListCustomers = async function getListCustomers() {
  return await CustomerModel.find();
};
exports.getCustomersById = async function getCustomersById(id) {
  let custom = await CustomerModel.findById(id);
  return custom;
};

exports.addNew = async function addNewCustomer(cut, res) {
  let saveServices = await cut.save();
  if(saveServices){
    res.redirect("/admin/client");
  }
};
// exports.addNewJson = async function addNewJson(res) {
//   let saveusers = await customerModel.save();
//   if (saveusers) {
//     res.json({
//       //load dc 85%
//       // sau khi mà nó save được thì nó sẽ res.json để mình kiểm tra log có data không á
//       data: {
//         user: usermodel.user,
//         pass: usermodel.pass,
//       },
//     });
//   } else {
//     res.json({ data: {} });
//   }
// };


exports.edit = async function editCustomer(custom) {
  let customEdit = await CustomerModel.findById(custom.id)
  // console.log(customEdit);
  if(customEdit){
    customEdit.fullname = custom.fullname;
    // customEdit.email = custom.email;
    customEdit.pass = custom.pass;

  }
  await customEdit.save()
};

exports.remove = async function removeCustomerById(id) {
  let removeCustom = await CustomerModel.findByIdAndRemove(id)
  return await removeCustom;
};

exports.checkCurrentPassword = async function checkCurrentPassword(pass) {
  let usMod = await customerModel.findOne({pass : pass });
  return usMod;
};
