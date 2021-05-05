var adminServices = require("../services/adminServices");

exports.login = async function login(userad, passad) {
  return await adminServices.login(userad, passad);
};