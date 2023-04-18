const User = require("../../models/user");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const postRegister = async (req, res) => {
  try {
    const { username, mail, password } = req.body;
    console.log(
      "🚀 ~ file: postRegister.js:8 ~ postRegister ~ username, mail, password",
      username,
      mail,
      password
    );

    const userIsExistes = await User.exists({ mail });

    if (userIsExistes) {
      return res.status(403).send("Email alread in use :(");
    }

    const encryptedPassword = await bcrypt.hash(password, 10);

    await User.create({
      username,
      mail,
      password: encryptedPassword,
    })
      .then((user) => {
        jwt.sign(
          { userId: user._id, mail: user.mail },
          process.env.JWT_SECRET_KEY,
          {
            expiresIn: process.env.JWT_EXPIRES_IN,
          },
          (err, token) => {
            if (err) throw err;
            return res.status(201).json({
              userDetails: {
                username: user.username,
                mail: user.mail,
              },
              token,
            });
          }
        );
      })
      .catch(() => {
        return res
          .status(400)
          .send("Invalid credentials. Please try again... :)");
      });
  } catch (error) {
    return res.status(500).send("Something wrong, please try again🙂");
  }
};

module.exports = postRegister;
