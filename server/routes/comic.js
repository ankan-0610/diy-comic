const express = require("express");
const router = express.Router();
const Comic = require("../models/comic");

// Get all comics
router.get("/", async (req, res) => {
  try {
    const comics = await Comic.find();
    res.json(comics);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to retrieve comics", error: err.message });
  }
});

// Save a new comic
router.post("/", async (req, res) => {
  const { title, panels } = req.body;

  try {
    const newComic = new Comic({ title, panels });
    await newComic.save();
    res.status(201).json(newComic);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to save comic", error: err.message });
  }
});

module.exports = router;
