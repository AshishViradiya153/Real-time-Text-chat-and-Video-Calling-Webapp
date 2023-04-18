const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const clientData = require("../../stytchClient");

const postForgetPassword = async (req, res) => {
  try {
    const { mail, password } = req.body;
    console.log(
      "🚀 ~ file: postForgetPassword.js:4 ~ postForgetPassword ~ mail, password:",
      mail,
      password
    );
    const UserExist = await User.findOne({
      mail: mail.toLowerCase(),
    });
    if (!UserExist) {
      return res
        .status(404)
        .send(
          `Your ${mail} has been not found. Plaese check requested mail address.`
        );
    } else {
      try {
        const client = clientData();
        const param = { email: mail };
        const response = await client.otps.email.send(param);
        return res.status(200).send(response);
      } catch (error) {
        console.error(error);
        return res.status(400).send("Something Wrong with Your EmailId ");
      }
    }
  } catch (error) {
    return res.status(500).send("Something wrong, please try again🙂");
  }
};
module.exports = postForgetPassword;
