// Define your routes
const express = require("express");
const Tidal = require("tidal-api-wrapper");
const Spotify = require("../spotify");
const router = express.Router();

// Routes go here.
router.get("/", async (req, res) => {
  const track = await Spotify.getData(
    "https://open.spotify.com/track/257SoE95qEweGItCB9Q5rE?si=jx-q14okRWWhvPk6XZ7LJg"
  );

  const tidal = new Tidal();
  tidal
    .search(track.name, "tracks", 1)
    .then(track => {
      res.json({ url: track[0].url });
    })
    .catch(err => {
      console.log(err);
    });
});

// Use localhost:9000/api followed by the required path.

module.exports = router;
