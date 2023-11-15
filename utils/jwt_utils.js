const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.JWT_SECRET;
      const options = {
        expiresIn: "1h",
        issuer: "sitename.com",
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) reject(err);
        resolve(token);
      });
    });
  },
};
