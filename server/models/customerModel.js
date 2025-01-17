const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const ObjectId = Schema.ObjectId;

const userSchema = new Schema({
  id: { type: ObjectId },
  fullname: { type: String},
  email: { type: String, required: true, unique: true },
  pass: { type: String, required: true },
});

module.exports = mongoose.model("Customer", userSchema);
