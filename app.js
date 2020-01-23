//Require NPM Dependencies
require("./dbInit");
const express = require("express");
const app = express();

// Require Local Dependencies
const genreRoutes = require("./routes/genre");
const movieRoutes = require("./routes/movie");
const userRoutes = require("./routes/user");
const authRoutes = require("./routes/auth");

//configure middleware
app.use(express.json());
app.use("/api/genres", genreRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/users", userRoutes);
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
  res.send("Hello Node!");
});

//Start Server
const port = process.env.PORT || 2000;
app.listen(port, console.log(`Server started on port ${port}`));
