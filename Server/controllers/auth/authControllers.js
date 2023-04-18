const postRegister = require("./postRegister");
const postLogin = require("./postLogin");
const postForgetPassword = require("./postForgetPassword");
const postOtp = require("./postOtp");
const postRegisterOtp = require("./postRegisterOtp");
exports.controller = {
  postRegister,
  postLogin,
  postForgetPassword,
  postOtp,
  postRegisterOtp,
};
