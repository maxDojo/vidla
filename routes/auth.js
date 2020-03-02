const bcrypt = require("bcryptjs");
const { User } = require("../db/user");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  // validate the request
  const loginMail = req.body.email;
  const loginPass = req.body.password;
  let verifiedUser = await User.findOne({ email: loginMail });
  if (!verifiedUser || verifiedUser == {})
    res.status(400).send("Invalid Email or password");

  //Check if credentials match
  const validCredentials = await bcrypt.compare(
    loginPass,
    verifiedUser.password
  );
  if (!validCredentials) res.status(400).send("Invalid Email or password!");
  else {
    const token = verifiedUser.generateToken();
    res
      .header("x-auth-token", token)
      .status(200)
      .send("Login Successful");
  }
});

module.exports = router;
