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
      const { preview_url, name, artists } = spotifyTrack;
      const tidal = new Tidal();
      console.log(name);
      tidal
        .search(spotifyTrack.name, "tracks", 25)
        .then(tidalTracks => {
          if (Array.isArray(tidalTracks)) {
            const tracks = tidalTracks.map(track => {
              const { url, title, artist, album } = track;
              const coverBaseURL = "https://resources.tidal.com/images/";
              const albumCover =
                coverBaseURL + album.cover.replace(/-/g, "/") + "/320x320.jpg";
              if (url) {
                const newTrack = {
                  url,
                  title,
                  artist: artist.name,
                  album: { title: album.title, cover: albumCover }
                };
                return newTrack;
              }
            });

            if (tracks.length > 0) {
              console.log(tracks);
              res.status(200).json({
                tracks,
                preview_url: preview_url ? preview_url : "",
                title: name ? name : "",
                artist: artists[0] && artists[0].name ? artists[0].name : ""
              });
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
