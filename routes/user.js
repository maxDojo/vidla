const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { validateUser } = require("../middleware/validation");
const { getUser, addUser, deleteUser, updateUser } = require("../db/user");
const express = require("express");
const router = express.Router();

router.get("/", auth, async (req, res) => {
  const response = await getUser();
  !response && res.status(500).send("Could not retrieve Users!");
  res.status(200).send(response);
});

router.get("/:id", async (req, res) => {
  const response = await getUser(req.params.id);
  !response && res.status(404).send("Could not retrieve User!");
  res.status(200).send(response);
});

router.post("/", async (req, res) => {
  let data = req.body;
  let { error } = validateUser(data);
  error && res.status(400).send(error.details[0].message);

  const response = await addUser(data);
  !response && res.status(500).send("Failed to add User!");
  res.status(201).send(response);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const response = await deleteUser(req.params.id);
  !response && res.status(404).send("Operation Failed!");
  res.status(200).send(response);
});

router.put("/:id", auth, async (req, res) => {
  const data = req.body;
  const response = await updateUser(req.params.id, data);
  !response && res.status(400).send("Update Failed");
  res.status(200).send(response);
});

module.exports = router;
