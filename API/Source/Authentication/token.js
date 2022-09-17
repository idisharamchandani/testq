let jwt = require("jsonwebtoken");
const config = require("./global.config");
const UserModel = require("../Models/user");
function verifytoken(req, res, next) {
  //getting token from headers
  var token = req.headers["x-access-token"];
  jwt.verify(
    token,
    config.secretKey,
    {
      algorithm: config.algorithm,
    },
  )
}

module.exports = verifytoken;
