var express = require("express");
var router = express.Router();
var auth = require("../utilities/authen");
var cartController = require("../controllers/orderController");
var auth = require("../utilities/authen");

router.get("/", auth.authenticate, async function (req, res, next) {
  let cartList = await cartController.cartlist();
  res.render("order", { Cart: cartList, title: "Order List" });
});

router.post("/add-cart", function (req, res, next) {
  let { body, params } = req;

  cartController.addCart(body, res);
});

module.exports = router;
