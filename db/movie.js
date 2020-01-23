const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  plot: String,
  rating: Number,
  stock: Number
});

const Movie = mongoose.model("Movie", movieSchema);

function getMovie(id = undefined) {
  if (id === undefined) {
    try {
      return Movie.find();
    } catch (ex) {
      console.log(ex);
      return false;
    }
  } else {
    try {
      return Movie.findById(id);
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}

function addMovie(data) {
  try {
    const movie = new Movie(data);
    return movie.save();
  } catch (ex) {
    console.log(ex);
    return false;
  }
}

function deleteMovie(id) {
  try {
    return Movie.findByIdAndDelete(id);
  } catch (ex) {
    console.log(ex);
    return false;
  }
}

async function updateMovie(id, data) {
  try {
    await Movie.findByIdAndUpdate(id, { $set: data });
    return Movie.findById(id);
  } catch (ex) {
    console.log(ex);
    return false;
  }
}

module.exports = {
  getMovie,
  addMovie,
  deleteMovie,
  updateMovie
};
