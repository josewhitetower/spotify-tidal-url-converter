<template>
  <div class="h-screen bg-gray-100 px-6">
    <h1
      class="text-xl md:text-3xl lg:text-3xl font-sans font-bold text-center pt-4"
    >Spotify-Tidal URL Converter</h1>
    <div class="text-center">
      <SearchForm @submit="handleSubmit" :is-loading="isLoading" />
      <TracksList :tracks="tracks" />
    </div>
  </div>
</template>

<script>
const API_URL = "http://192.168.178.55:9000/api";
import SearchForm from "./components/SearchForm";
import TracksList from "./components/TracksList";
export default {
  components: {
    SearchForm,
    TracksList
  },
  data: () => ({
    tracks: [],
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