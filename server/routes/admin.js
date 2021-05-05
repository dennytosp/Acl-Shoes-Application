var express = require("express");
var router = express.Router();
var auth = require("../utilities/authen");
var productController = require("../controllers/productController");

router.get("/", auth.authenticate, async function (req, res, next) {
  res.render("dashboard", { title: "Home" });
});

router.get("/dashboard-horiz", auth.authenticate, function (req, res, next) {
  res.render("dashboard-horiz", { title: "Horizontal slidebar" });
});

// GET FORM-ADMIN
router.get("/form-admin", auth.authenticate, function (req, res, next) {
  res.render("form-admin", { title: "Form Admin" });
});


// GET TABLE ORDER
router.get("/order", auth.authenticate, function (req, res, next) {
  res.render("order", { title: "Order List" });
});

// GET CHART
router.get("/chart", auth.authenticate, function (req, res, next) {
  res.render("chart", { title: "Chart" });
});

// GET RESET PASSWORD
router.get("/reset-pass", auth.authenticate, function (req, res, next) {
  res.render("reset-pass", { title: "Reset Password" });
});

// GET LOCK SCREEN
router.get("/screen-lock", auth.authenticate, function (req, res, next) {
  res.render("screen-lock", { title: "Lock Screen" });
});




module.exports = router;
