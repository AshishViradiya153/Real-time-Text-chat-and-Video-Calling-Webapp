const router = require("express").Router();
const authControllers = require("../controllers/auth/authControllers");
const Joi = require("joi");
const validator = require("express-joi-validation").createValidator({});

const registerSchema = Joi.object({
  username: Joi.string().min(3).max(12).trim().required().alphanum(),
  password: Joi.string().min(6).max(15).trim().required(),
  mail: Joi.string().email().required().trim().lowercase(),
});

const LoginSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});
const ForgetPasswordSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  mail: Joi.string().email().required(),
});
const OtpSchema = Joi.object({
  password: Joi.string().min(6).max(12).required(),
  email: Joi.string().email().required(),
  code: Joi.string().required(),
  method_id: Joi.string().required(),
});
const OtpRegisterSchema = Joi.object({
  username: Joi.string().min(3).max(12).trim().required().alphanum(),
  mail: Joi.string().email().required(),
  password: Joi.string().min(6).max(12).required(),
});

router.post(
  "/register",
  validator.body(registerSchema),
  authControllers.controller.postRegister
);

router.post(
  "/login",
  validator.body(LoginSchema),
  authControllers.controller.postLogin
);

router.post(
  "/forgetPass",
  validator.body(ForgetPasswordSchema),
  authControllers.controller.postForgetPassword
);
router.post(
  "/verify-Otp",
  validator.body(OtpSchema),
  authControllers.controller.postOtp
);

router.post(
  "/verifyRegister-Otp",
  validator.body(OtpRegisterSchema),
  authControllers.controller.postRegisterOtp
);

module.exports = router;
