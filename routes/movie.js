const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { validateMovie } = require("../middleware/validation");
const { getMovie, addMovie, deleteMovie, updateMovie } = require("../db/movie");
const express = require("express");
const router = express.Router();

router.get("/", async (req, res) => {
  const response = await getMovie();
  !response && res.status(500).send("Could not retrieve Movies!");
  res.status(200).send(response);
});

router.get("/:id", async (req, res) => {
  const response = await getMovie(req.params.id);
  !response && res.status(404).send("Could not retrieve Movie!");
  res.status(200).send(response);
});

router.post("/", async (req, res) => {
  let data = req.body;
  let { error } = validateMovie(data);
  error && res.status(400).send(error.details[0].message);

  const response = await addMovie(data);
  !response && res.status(500).send("Failed to add Movie!");
  res.status(201).send(response);
});

router.delete("/:id", [auth, admin], async (req, res) => {
  const response = await deleteMovie(req.params.id);
  !response && res.status(404).send("Operation Failed!");
  res.status(200).send(response);
});

router.put("/:id", [auth, admin], async (req, res) => {
  const data = req.body;
  const response = await updateMovie(req.params.id, data);
  !response && res.status(400).send("Update Failed");
  res.status(200).send(response);
});

module.exports = router;
