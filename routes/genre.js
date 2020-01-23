const admin = require("../middleware/admin");
const auth = require("../middleware/auth");
const { validateGenre } = require("../middleware/validation");
const { getGenre, addGenre, deleteGenre, updateGenre } = require("../db/genre");
const express = require("express");
const router = express.Router();

// Show one genre
router.get("/", async (req, res) => {
  const response = await getGenre();
  !response && res.status(500).send("Could not retrieve genres!");
  res.status(200).send(response);
});

// Show all genre
router.get("/:id", async (req, res) => {
  const response = await getGenre(req.params.id);
  !response && res.status(404).send("Could not retrieve genre!");
  res.status(200).send(response);
});

// add Genre
router.post("/", [auth, admin], async (req, res) => {
  let data = req.body;
  let { error } = validateGenre(data);
  error && res.status(400).send(error.details[0].message);

  const response = await addGenre(data);
  !response && res.status(500).send("Failed to add Genre!");
  res.status(201).send(response);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const response = await deleteGenre(req.params.id);
  !response && res.status(404).send("Operation Failed!");
  res.status(200).send(response);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const data = req.body;
  const response = await updateGenre(req.params.id, req.body);
  !response && res.status(400).send("Update Failed");
  res.status(200).send(response);
});

module.exports = router;
