const auth = require("../middleware/auth");
const admin = require("../middleware/admin");
const { validateMovie, validateRating } = require("../middleware/validation");
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

router.post("/", [auth, admin], async (req, res) => {
  let data = req.body;
  let { error } = validateMovie(data);
  error && res.status(400).send(error.details[0].message);

  const response = await addMovie(data);
  !response && res.status(500).send("Failed to add Movie!");
  res.status(201).send(response);
});

// router.post("/:id/rate", auth, async (req, res) => {
//   let validation = validateRating(req.body);
//   !validation && res.status(400).send("Invalid Request!");
//   let newRating = {
//     owner: req.user._id,
//     rating: req.body.rating,
//     date: Date.now()
//   };
//   let movie = await getMovie(req.params.id);
//   let formerRating = movie.rating;
//   console.log(formerRating);
//   formerRating.forEach(rating => {
//     if (rating.owner == req.user._id) {
//       let former = indexOf(rating);
//       formerRating.splice(former, 1);
//     }
//   });
//   let updatedRating = formerRating.push(newRating);
//   let updatedMovie = await updateMovie(req.params.id, updatedRating);
//   res.status(200).send(updatedMovie);
// });

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
