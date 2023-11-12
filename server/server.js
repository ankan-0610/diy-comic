const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const comicRoutes = require("./routes/comicRoutes");

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Routes
app.use("/api", comicRoutes); // Base URL for the comic routes

const mongoose = require("mongoose");

// Database connection
const dbUrl = "your_database_url";
mongoose
  .connect(dbUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to database"))
  .catch((err) => console.error("Database connection error:", err));

const db = mongoose.connection;

db.on("error", console.error.bind(console, "MongoDB connection error:"));
db.once("open", () => {
  console.log("Connected to the database");
});

const port = process.env.PORT || 5000;
// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
