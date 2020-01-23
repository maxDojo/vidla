const jwt = require("jsonwebtoken");
const { User } = require("../db/user");

// Login Function
module.exports = function(req, res, next) {
  // check if customer has a jwt token
  const token = req.header("x-auth-token");

  // return 401 error if token does not exist
  if (!token) return res.status(401).send("Unauthorized");

  // verify the token
  try {
    const user = jwt.verify(token, "iwasalittlepenguinzombie619");
    req.user = user;
    next();
  } catch (error) {
    res.status(400).send("Invalid Authentication Token!");
  }

  // check if the email and password match in the databaese
};
