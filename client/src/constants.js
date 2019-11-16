export const API_URL =
  process.env.NODE_ENV === "production"
    ? "https://jt-spotify-tidal-url-converter.herokuapp.com/api"
    : "http://localhost:9000/api";
