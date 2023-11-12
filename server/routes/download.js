const express = require("express");
const router = express.Router();

// Download a comic
router.get("/download/:comicId", async (req, res) => {
  const comicId = req.params.comicId;

  try {
    // Fetch the comic from the database using the ID
    const comic = await Comic.findById(comicId);

    // Logic to generate and send the file as a download
    // Adjust the headers to send the file appropriately
    // res.download('file/path', 'filename');
    res.download("path/to/comics/" + comic.filename, comic.title);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to download comic", error: err.message });
  }
});

module.exports = router;
