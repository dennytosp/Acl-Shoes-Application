var categoryServices = require("../services/categoryServices");
var categoryModel = require("../models/categoryModel");

exports.getListCategories = async function getListCategories() {
  return await categoryServices.getListCategories();
};
exports.getCategoriesById = async function getCategoriesById(id) {
  return await categoryServices.getCategoriesById(id);
};
exports.addNew = async function addNewCategory(params, res) {
  let { nameCategory } = params;
  const modelCategory = new categoryModel({
    nameCategory: nameCategory,
  });
  // Tạo mới một sản phẩm
  await categoryServices.addNew(modelCategory, res);
};

exports.edit = async function editCategory(id, params) {
  let { nameCategory } = params;
  let prod = {
    id,
    nameCategory,
  };
  await categoryServices.edit(prod);
};

exports.remove = async function removeCategoryById(id) {
  await categoryServices.remove(id);
};
