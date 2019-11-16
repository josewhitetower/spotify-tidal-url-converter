// Define your routes
const express = require("express");
const Tidal = require("tidal-api-wrapper");
const Spotify = require("../spotify");
const router = express.Router();

// Routes go here.
router.post("/", async (req, res) => {
  const url = req.body.url;
  if (url) {
    const spotifyTrack = await Spotify.getData(url).catch(error => {
      res.status(400).json({ message: error.message });
    });
    if (spotifyTrack) {
      const tidal = new Tidal();
      tidal
        .search(spotifyTrack.name, "tracks", 1)
        .then(tidalTrack => {
          if (Array.isArray(tidalTrack)) {
            const url = tidalTrack[0].url;
            if (url) {
              res.status(200).json({ url });
            } else {
              res.status(404).json({ message: "Track not found" });
            }
          }
        })
        .catch(() => {
          res.status(500).json({ message: "Internal Server Error" });
        });
    }
  }
});

// Use localhost:9000/api followed by the required path.

module.exports = router;
