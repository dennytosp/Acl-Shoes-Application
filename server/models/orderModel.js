const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const orderSchema = new Schema({
  foodbill: { type: ObjectId, required: true },
  published: { type: String, required: true },
  totalprice: { type: String, required: true },
  _idUser: { type: Schema.Types.ObjectId, ref: "Customer" },
});

module.exports = mongoose.model("Order", orderSchema);
