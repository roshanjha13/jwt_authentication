const jwt = require("jsonwebtoken");
const createError = require("http-errors");

module.exports = {
  signAccessToken: (userId) => {
    return new Promise((resolve, reject) => {
      const payload = {};
      const secret = process.env.JWT_ACCESS_SECRET;
      const options = {
        expiresIn: "20s",
        issuer: "sitename.com",
        audience: userId,
      };
      jwt.sign(payload, secret, options, (err, token) => {
        if (err) {
          console.log(err.message);
          reject(createError.InternalServerError());
        }
        resolve(token);
      });
    });
  },
  verifyAccessToken: (req, res, next) => {
    //if auth header present inside the req
    if (!req.headers["authorization"]) return next(createError.Unauthorized());

    const authHeader = req.headers["authorization"];
    //store authHeader inside an array //authheader is token+bearer
    const bearerToken = authHeader.split(" ");
    const token = bearerToken[1];
    jwt.verify(token, process.env.JWT_ACCESS_SECRET, (err, payload) => {
      if (err) {
        // if (err.name === "JsonWebTokenError") {
        //   return next(createError.Unauthorized());
        // } else {
        //   return next(createError.Unauthorized(err.message));
        // }
        const message =
          err.name === "JsonWebTokenError" ? "Unauthorized" : err.message;
        return next(createError.Unauthorized(message));
      }
      req.payload = payload;
      next();
    });
  },
};
