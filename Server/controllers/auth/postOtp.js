const clientData = require("../../stytchClient");
const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const postOtp = async (req, res, next) => {
  try {
    const client = clientData();
    const { method_id, code, email, password } = req.body;
    const encryptedPassword = await bcrypt.hash(password, 10);

    const response = await client.otps.authenticate({
      method_id,
      code,
    });
    if (response) {
      await User.findOneAndUpdate(
        { mail: email.toLowerCase() },
        { password: encryptedPassword }
      );
      return res.status(200).send("OTP-Varify Successfully");
    }
  } catch (error) {
    console.log({ error });
    if (error.status_code === 401) {
      return res.status(500).send("Your OTP Expired or used!");
    }
    return res.status(500).send("WRONG OTP! Try again for change password!");
  }
};

module.exports = postOtp;
