var CategoryModel = require("../models/categoryModel");

exports.getListCategories = async function getListCategories() {
  return await CategoryModel.find();
};
exports.getCategoriesById = async function getCategoriesById(id) {
  let categ = await CategoryModel.findById(id);
  // categ = { ...categ, id: categ._id };
  return categ;
};

exports.addNew = async function addNewCategory(cat, res) {
  let saveServices = await cat.save();
  if(saveServices){
    res.redirect("/category");
  }
};

exports.edit = async function editCategory(categ) {
  let categEdit = await CategoryModel.findById(categ.id)
  // console.log(categEdit);
  if(categEdit){
    categEdit.nameCategory = categ.nameCategory;
  }
  await categEdit.save()
};

exports.remove = async function removeCategoryById(id) {
  let removeCateg = await CategoryModel.findByIdAndRemove(id)
  return await removeCateg;
};
