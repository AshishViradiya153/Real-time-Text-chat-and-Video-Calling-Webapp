const clientData = require("../../stytchClient");
const User = require("../../models/user");
const postRegisterOtp = async (req, res, next) => {
  try {
    const { username, mail, password } = req.body;
    console.log(
      "🚀 ~ file: postRegisterOtp.js:8 ~ postRegisterOtp ~ method_id, code, username, mail, password:",
      username,
      mail,
      password
    );
    const userIsExistes = await User.exists({ mail });
    console.log(
      "🚀 ~ file: postRegisterOtp.js:13 ~ postRegisterOtp ~ userIsExistes:",
      userIsExistes
    );

    if (userIsExistes) {
      return res.status(403).send("Email alread in use :(");
    } else {
      try {
        const client = clientData();
        const param = { email: mail, signup_template_id: "register" };
        const response = await client.otps.email.loginOrCreate(param);

        return res.status(200).send(response);
      } catch (error) {
        console.error(error);
        return res.status(400).send("Something Wrong with Your EmailId ");
      }
    }
  } catch (error) {
    console.log({ error });
    return res.status(500).send("Something wrong, please try again🙂");
  }
};

module.exports = postRegisterOtp;
