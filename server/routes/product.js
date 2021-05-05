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
  let list = await productController.getListProduct();
  res.render("product", { listTable: list, title: "Product List" });
});

// GET ALL-ITEM
router.get("/all-item", auth.authenticate, async function (req, res, next) {
  let list = await productController.getListProduct();
  res.render("all-item", { list: list, title: "All Product" });
});

// GET FORM-PRODUCT và truyền loại product lên form
router.get("/form-product", auth.authenticate, async function (req, res, next) {
  let prodData = await categoryController.getListCategories();
  res.render("form-product", { prodData, title: "Form Product" });
});

// Thêm Product
router.post("/form-product", middle, async function (req, res, next) {
  let { body } = req;
  if (req.file) {
    let imgUrl = req.file.originalname;
    body = { ...body, image: imgUrl };
  }
  await productController.addNew(body, res);
  res.redirect("/product");
});

// GET Data từ Table lên Form (Product)
router.get(
  "/form-edit-product/:id",
  auth.authenticate,
  async function (req, res, next) {
    let id = req.params.id;
    let prod = await productController.getProductById(id);
    let prodDataEdit = await categoryController.getListCategories();
    res.render("form-edit-product", {
      prodGetData: prod,
      prodDataEdit,
      title: "Edit Product",
    });
  }
);

// Hàm chỉnh sửa Product
router.post("/form-edit-product/:id", middle, async function (req, res, next) {
  let { id } = req.params;
  let { body } = req;
  if (req.file) {
    let imgUrl = req.file.originalname;
    body = { ...body, image: imgUrl };
  }
  await productController.edit(id, body);
  res.redirect("/admin/all-item");
});

// Delete Product
router.delete(
  "/delete/:id",
  auth.authenticate,
  async function (req, res, next) {
    let id = req.params.id;
    await productController.remove(id);
    res.send({ res: true });
  }
);

module.exports = router;
