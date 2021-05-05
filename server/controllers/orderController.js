var cartServices = require("../services/orderServices");
const Cart = require("../models/orderModel");
exports.cartlist = async function (req, res) {
  return await cartServices.getDataCart();
};
exports.addCart = function addCart(req, res) {
  let { foodbill, totalprice, _idUser,published } = req;

  const cart = new Cart({
    foodbill: foodbill,
    totalprice: totalprice,
    _idUser: _idUser,
    published:published
  });
  cartServices.addCart(cart, res);
};

exports.userslistsend = async (req, res) => {
  let userslist = await Users.find({});
  res.json(userslist);
};
