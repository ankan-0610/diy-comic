// comicController.js
const Comic = require("../models/ComicModel");

exports.getAllComics = async (req, res) => {
  try {
    const comics = await Comic.find();
    res.json(comics);
  } catch (err) {
    res.status(500).json({ message: "Error fetching comics" });
  }
};

exports.getComicById = (req, res) => {
  // Logic to get a specific comic by ID
  const { id } = req.params;
  // Example:
  res.json({ message: `Get comic with ID ${id}` });
};

exports.createComic = async (req, res) => {
  const { title, panels } = req.body;
  try {
    const newComic = new Comic({ title, panels });
    await newComic.save();
    res.json(newComic);
  } catch (err) {
    res.status(500).json({ message: "Error creating comic" });
  }
};
// Add more functions as needed (update, delete, etc.)


exports.shareComic = async (req, res) => {
  const comicId = req.params.id;

  try {
    const comic = await Comic.findById(comicId);
    // Generate a shareable link using this comic's ID
    const shareableLink = `https://diycomicbook.000webhostapp.com//view-comic/${comicId}`;
    res.status(200).json({ shareableLink });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Failed to share comic", error: error.message });
  }
};

// Function to get a shareable link for a specific comic
const getShareableLink = async (req, res) => {
  const comicId = req.params.id;

  try {
    const comic = await Comic.findById(comicId);

    if (!comic) {
      return res.status(404).json({ message: "Comic not found" });
    }

    const shareableLink = `https://yourserverurl.com/comics/${comicId}`;

    res.json({ shareableLink });
  } catch (err) {
    res.status(500).json({ message: "Failed to get shareable link", error: err.message });
  }
};

module.exports = {
  getShareableLink,
};