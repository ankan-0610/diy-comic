const mongoose = require("mongoose");

const ComicSchema = new mongoose.Schema({
  title: String,
  panels: [String],
});

const ComicModel = mongoose.model("Comic", ComicSchema);

// Example of save operation
const newComic = new ComicModel({
  title: "My First Comic",
  panels: ["Image1", "Image2"],
});
newComic
  .save()
  .then(() => console.log("Comic saved"))
  .catch((err) => console.error("Error saving comic:", err));

const Comic = mongoose.model("Comic", comicSchema);

module.exports = Comic;
