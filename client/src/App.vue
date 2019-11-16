<template>
  <div class="h-screen bg-gray-100 px-4">
    <h1
      class="text-xl md:text-3xl lg:text-3xl font-sans font-bold text-center pt-12 text-green-600"
    >Spotify-Tidal URL Converter</h1>
    <div class="text-center">
      <SearchForm @submit="handleSubmit" :is-loading="isLoading" />
      <TrackPreview :preview-url="previewUrl" v-if="previewUrl" :title="title" :artist="artist" />
      <TracksList :tracks="tracks" />
    </div>
  </div>
</template>

<script>
const API_URL = "https://jt-spotify-tidal-url-converter.herokuapp.com/api";
import SearchForm from "./components/SearchForm";
import TracksList from "./components/TracksList";
import TrackPreview from "./components/TrackPreview";
export default {
  components: {
    SearchForm,
    TracksList,
    TrackPreview
  },
  data: () => ({
    tracks: [],
    previewUrl: "",
    title: "",
    artist: "",
    isLoading: false
  }),
  methods: {
    async handleSubmit(spotifyUrl) {
      this.isLoading = true;
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ url: spotifyUrl })
        });

        const data = await response.json();
        if (data.tracks) {
          this.tracks = [...data.tracks];
          this.previewUrl = data.preview_url;
          this.title = data.title;
          this.artist = data.artist;
          this.isLoading = false;
        } else {
          throw new Error("Track not found");
        }
      } catch (error) {
        this.isLoading = false;
        console.log(error.message);
      }
    }
  }
};
</script>

<style>
</style>