const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  email: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },
  role: { type: String, default: "customer" },
  isAdmin: { type: Boolean, default: false }
});

userSchema.methods.generateToken = function() {
  return jwt.sign(
    { _id: this._id, name: this.firstname + " " + this.lastname },
    "iwasalittlepenguinzombie619"
  );
};

const User = mongoose.model("User", userSchema);

function getUser(id = undefined) {
  if (id === undefined) {
    try {
      return User.find();
    } catch (error) {
      console.log(error);
      return false;
    }
  } else {
    try {
      return User.findById(id);
    } catch (ex) {
      console.log(ex);
      return false;
    }
  }
}

async function addUser(data) {
  try {
    let salt = await bcrypt.genSalt(10);
    data.password = await bcrypt.hash(data.password, salt);
    let user = new User(data);
    await user.save();
    return user;
  } catch (ex) {
    console.log(ex);
    return false; //Failed to save for other reasons!
  }
}

function deleteUser(id) {
  try {
    return User.findByIdAndDelete(id);
  } catch (ex) {
    console.log("Failed to Delete \n", ex);
    return false; //Failed to delete
  }
}

async function updateUser(id, data) {
  try {
    await User.findByIdAndUpdate(id, { $set: data });
    return User.findById(id);
  } catch (ex) {
    console.log(ex);
    return false;
  }
}

module.exports = {
  getUser,
  addUser,
  deleteUser,
  User,
  updateUser
};
