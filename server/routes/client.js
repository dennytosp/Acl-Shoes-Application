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
  let list = await customerController.getListCustomers();
  res.render("client", { listClient: list, title: "Client List" });
});

router.post("/add-client", async function (req, res, next) {
  let { fullname, email, pass } = req.body;
  const usermodel = new customerModel({
    fullname: fullname,
    email: email,
    pass: pass,
  });

  const saveusers = await usermodel.save();
  if (saveusers) {
    res.json({
      data: {
        fullname: usermodel.fullname,
        email: usermodel.email,
        pass: usermodel.pass,
      },
    });
  } else {
    res.json({ data: {} });
  }
});

// GET FORM-CLIENT
router.get("/form-client", auth.authenticate, function (req, res, next) {
  res.render("form-client", { title: "Form Client" });
});

// Thêm Client
router.post("/form-client", auth.authenticate, async function (req, res, next) {
  let { body } = req;
  await customerController.addNew(body, res);
});

// GET Data từ Table đến Form Edit (Client)
router.get(
  "/form-edit-client/:id",
  auth.authenticate,
  async function (req, res, next) {
    let id = req.params.id;
    let customer = await customerController.getCustomersById(id);
    res.render("form-edit-client", {
      clientGetData: customer,
      title: "Edit Client",
    });
  }
);

// Hàm chỉnh sửa Client
router.post("/form-edit-client/:id", middle, async function (req, res, next) {
  let { id } = req.params;
  let { body } = req;
  await customerController.edit(id, body);
  res.redirect("/client");
});

router.delete(
  "/delete/:id",
  auth.authenticate,
  async function (req, res, next) {
    let id = req.params.id;
    await customerController.remove(id);
    res.send({ res: true });
  }
);

module.exports = router;
