const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postLogin = async (req, res) => {
  try {
    const { mail, password } = req.body;
    console.log("🚀 ~  mail, password", mail, password);

    await User.findOne({
      mail,
    }).then(async (user) => {
      if (user && (await bcrypt.compare(password, user.password))) {
        jwt.sign(
          { userId: user._id, mail: user.mail },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
          (err, token) => {
            if (err) throw err;
            return res.status(200).json({
              userDetails: {
                _id: user._id,
                username: user.username,
                mail: user.mail,
              },
              token,
            });
          }
        );
      } else {
        return res
          .status(400)
          .send("Invalid credentials. Please try again... :)");
      }
    });
  } catch (error) {
    return res.status(500).send("Something wrong, please try again🙂");
  }
};

module.exports = postLogin;
