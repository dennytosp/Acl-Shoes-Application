var adminModel = require("../models/adminModel");

exports.login = async function login(userad, passad) {
  let usMod = await adminModel.findOne({ userad: userad, passad: passad });
  return usMod;
};
