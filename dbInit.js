const mongoose = require("mongoose");

mongoose
  .connect("mongodb://localhost/vidla", {
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => console.log("Connected to the vidla database"))
  .catch(err => {
    console.log("FATAL ERROR - Failed to connect to the vidla database!!", err);
    process.exit(1);
  });
