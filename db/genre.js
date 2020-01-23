const mongoose = require("mongoose");

const Genre = mongoose.model(
  "Genre",
  mongoose.Schema({ name: { type: String, required: true, unique: true } })
);

function getGenre(id = undefined) {
  if (id === undefined) {
    try {
      return Genre.find();
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    try {
      return Genre.findById(id);
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}

async function addGenre(data) {
  try {
    let genre = new Genre(data);
    await genre.save();
    return genre;
  } catch (ex) {
    console.log(ex);
    return false; //Failed to save for other reasons!
  }
}

function deleteGenre(id) {
  try {
    return Genre.findByIdAndDelete(id);
  } catch (ex) {
    console.log("Failed to Delete \n", ex);
    return false; //Failed to delete
  }
}

async function updateGenre(id, data) {
  try {
    await Genre.findByIdAndUpdate(id, { $set: data });
    return Genre.findById(id);
  } catch (ex) {
    console.log(ex);
    return false;
  }
}

module.exports = {
  getGenre,
  addGenre,
  deleteGenre,
  updateGenre
};
