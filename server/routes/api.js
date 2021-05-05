var express = require("express");
var router = express.Router();
var productController = require("../controllers/productController");
var categoryController = require("../controllers/categoryController");
var customerController = require("../controllers/customerController");
var customerModel = require("../models/customerModel");
var prouserControllerductController = require("../controllers/userController");
var productServices = require("../services/productServices");
var auth = require("../utilities/authen");

//GET JSON SEND (PRODUCT) * GET HOME
router.get("/product", async function (req, res, next) {
  let listProd = await productController.getListProduct();
  res.json(listProd);
});

/* GET detail page */
router.get("/admin/:id", async function (req, res, next) {
  let { id } = req.params;
  let prod = await productController.getProductById(id);
  res.json(prod);
});

//GET JSON SEND (CATEGORY)
router.get("/categSend", async function (req, res, next) {
  let listCateg = await categoryController.getListCategories();
  res.json(listCateg);
});

//GET JSON SEND (CLIENT)
router.get("/client-send", async function (req, res, next) {
  let users = await customerModel.find();
  res.json(users);
});


/* GET detail page */
router.get("/admin/fields/:id", async function (req, res, next) {
  let { id } = req.params;
  let prod = await productController.getProductByIdSelectedFields(id);
  res.json(prod);
});

// Thêm Product
router.post("/form-product", async function (req, res, next) {
  let { body } = req;
  if (req.file) {
    let imgUrl = req.file.originalname;
    body = { ...body, image: imgUrl };
  }
  const prod = await productController.addNew(body, res);
  res.json(prod);
});

router.post("/login", async function (req, res, next) {
  let { username } = req.body;
  let user = await userController.loginU(username);
  if (!user) res.status(401).json({ auth: false, msg: "Not auth" });
  let token = jwt.sign({ user }, process.env.JWT_KEY);
  res.status(200).json({auth: true, token: token})
});

module.exports = router;
