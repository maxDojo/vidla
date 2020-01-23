const { User } = require("../db/user");
const express = require("express");
const router = express.Router();
const jwt = require("jsonwebtoken");

router.post("/", async (req, res) => {
  // validate the request

  let verifiedUser = await User.findOne({ email: req.body.email });
  if (!verifiedUser || verifiedUser == {})
    res.status(400).send("Invalid Username or password");

  //Check if credentials match
  if (verifiedUser.password != req.body.password)
    res.status(400).send("Invalid email or password!");
  else {
    const token = await verifiedUser.generateToken();
    res
      .header("x-auth-token", token)
      .status(200)
      .send();
  }
});

module.exports = router;
