var categoryServices = require("./categoryServices");
var convertDate = require("../utilities/convertDate");
const productModel = require("../models/productModel");


exports.getListProduct = async function getListProduct() {
  let prod = await productModel.find().populate("idType");
  return prod;
};

exports.getProductById = async function getProductById(id) {
  let prod = await productModel.findById(id);
  // prod = { ...prod, id: prod._id };
  return prod;
};

exports.addNew = async function addNewProduct(id, res) {
  let prod = new productModel(id)
  return await prod.save();
};

exports.edit = async function editProduct(prod) {
  let prodEdit = await productModel.findById(prod.id)
  // console.log(prodEdit);
  if(prodEdit){
    prodEdit.name = prod.name;
    prodEdit.price = prod.price;
    if (prod.image) {
      prodEdit.image = prod.image;
    }
    prodEdit.description = prod.description;
    prodEdit.startDate = prod.startDate;
    prodEdit.idType = prod.idType;

  }
  await prodEdit.save()
};

exports.remove = async function removeProductById(id) {
  let removeProd = await productModel.findByIdAndRemove(id)
  return await removeProd;
};
exports.getProductByIdSelectedFields = async function getProductByIdSelectedFields(id) {
  let prod = await productModel.find({_id: id}, 'name price')
  return prod;
};
