<template>
  <div class="h-screen bg-gray-100 px-4">
    <h1
      class="text-xl md:text-3xl lg:text-3xl font-sans font-bold text-center pt-12 text-green-500"
    >Spotify-Tidal URL Converter</h1>
    <div class="text-center">
      <SearchForm @submit="handleSubmit" :is-loading="isLoading" />
      <TrackPreview :preview-url="previewUrl" v-if="title" :title="title" :artist="artist" />
      <TracksList :tracks="tracks" />
      <ErrorMessage :message="errorMessage" v-if="errorMessage" @close="handleClose" />
    </div>
  </div>
</template>

<script>
import { API_URL } from "./constants";
import SearchForm from "./components/SearchForm";
import TracksList from "./components/TracksList";
import TrackPreview from "./components/TrackPreview";
import ErrorMessage from "./components/ErrorMessage";
export default {
  components: {
    SearchForm,
    TracksList,
    TrackPreview,
    ErrorMessage
  },

  data: () => ({
    tracks: [],
    previewUrl: "",
    title: "",
    artist: "",
    errorMessage: "",
    isLoading: false
  }),

  methods: {
    async handleSubmit(spotifyUrl) {
      this.isLoading = true;
      this.tracks = [];
      this.title = "";
      this.errorMessage = "";
      try {
        const response = await fetch(API_URL, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ url: spotifyUrl })
        }).catch(e => {
          this.isLoading = false;
          this.errorMessage = e.message;
        });

        const data = await response.json();
        if (data.tracks) {
          console.log(data)
          this.tracks = [...data.tracks];
          this.previewUrl = data.preview_url;
          this.title = data.title;
          this.artist = data.message;
          this.isLoading = false;
        } else {
          throw new Error("Track not found");
        }
      } catch (error) {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    },

    handleClose() {
      this.errorMessage = "";
    }
  }
};
</script>

<style></style>
