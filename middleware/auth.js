// const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { getUser } = require("../db/user");

// Login Function
module.exports = async function(req, res, next) {
  // check if client has a jwt token
  const token = req.header("x-auth-token");

  // return 401 error if token does not exist
  if (!token) return res.status(401).send("Unauthorized");

  // verify the token
  try {
    let user = await jwt.verify(token, "iwasalittlepenguinzombie619");
    req.user = await getUser(user._id);
    next();
  } catch (error) {
    res.status(400).send("Invalid Authentication Token!");
  }
  // check if the email and password match in the databaese
};
