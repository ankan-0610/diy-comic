// comicRoutes.js

const express = require("express");
const router = express.Router();
const comicController = require("../controllers/comicController");

// Define routes and link them to controller functions
router.get("/comics", comicController.getAllComics);
router.get("/comics/:id", comicController.getComicById);
router.post("/comics", comicController.createComic);
router.get("/comics/:id/share", comicController.getShareableLink); // New route for generating a shareable link

module.exports = router;
