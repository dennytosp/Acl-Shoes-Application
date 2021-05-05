var express = require("express");
var router = express.Router();
var auth = require("../utilities/authen");
var upload = require("../utilities/upload");
var productController = require("../controllers/productController");
var categoryController = require("../controllers/categoryController");
var customerController = require("../controllers/customerController");
var customerModel = require("../models/customerModel");
var middle = [auth.authenticate, upload.single("image")];

router.get("/", auth.authenticate, async function (req, res, next) {
  let listCateg = await categoryController.getListCategories();
  res.render("category", { listCateg: listCateg, title: "Category List" });
});

// GET FORM CATEGORY
router.get(
  "/form-category",
  auth.authenticate,
  async function (req, res, next) {
    res.render("form-category", { title: "Form Category" });
  }
);

// GET Data từ Table đến Form Edit (Category)
router.get(
  "/form-edit-category/:id",
  auth.authenticate,
  async function (req, res, next) {
    let id = req.params.id;
    let categ = await categoryController.getCategoriesById(id);
    res.render("form-edit-category", {
      categGetData: categ,
      title: "Edit Category",
    });
  }
);

// Hàm chỉnh sửa Category
router.post("/form-edit-category/:id", middle, async function (req, res, next) {
  let { id } = req.params;
  let { body } = req;
  await categoryController.edit(id, body);
  res.redirect("/category");
});

// Thêm Category
router.post(
  "/form-category",
  auth.authenticate,
  async function (req, res, next) {
    let { body } = req;
    await categoryController.addNew(body, res);
  }
);

// Delete Category
router.delete(
  "/delete/:id",
  auth.authenticate,
  async function (req, res, next) {
    let id = req.params.id;
    await categoryController.remove(id);
    res.send({ res: true });
  }
);

module.exports = router;
