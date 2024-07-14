const jwt = require("jsonwebtoken");

module.exports = {
  generateJWT: (uid) =>
    jwt.sign({ uid }, process.env.SECRET_KEY, {
      expiresIn: 0,
    }),
};
