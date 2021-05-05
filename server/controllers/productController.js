var productServices = require("../services/productServices");

exports.getListProduct = async function getListProduct() {
  return await productServices.getListProduct();
};

exports.getProductById = async function getProductById(id) {
  return await productServices.getProductById(id);
};

exports.addNew = async function addNewProduct(params) {
  let { image, name, price, description, startDate, idType } = params;
  let prod = {
    image: image,
    name: name,
    price: price,
    description: description,
    startDate: startDate,
    idType: idType,
  };

  // Tạo mới một sản phẩm
  return await productServices.addNew(prod);
};

exports.edit = async function editProduct(id, params) {
  let { image, name, price, description, startDate, idType } = params;
  let prod = {
    id,
    image,
    name,
    price,
    description,
    startDate,
    idType,
  };
  await productServices.edit(prod);
};

exports.remove = async function removeProductById(id) {
  await productServices.remove(id);
};
exports.getProductByIdSelectedFields = async function getProductByIdSelectedFields(id) {
  let prod = await productServices.getProductByIdSelectedFields(id);
  return prod;
};
