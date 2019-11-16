<template>
  <div class="h-screen bg-gray-100 px-6">
    <h1
      class="text-xl md:text-3xl lg:text-3xl font-sans font-bold text-center pt-4"
    >Spotify-Tidal URL Converter</h1>
    <p>https://open.spotify.com/track/257SoE95qEweGItCB9Q5rE?si=jx-q14okRWWhvPk6XZ7LJg</p>
    <div class="text-center">
      <SearchForm @submit="handleSubmit" />
      <div
        v-if="isLoading || tidalTracks.length > 0"
        class="mt-10 shadow-lg bg-white rounded py-12 text-green-600 hover:text-green-400"
      >
        <div v-if="isLoading" class="loader m-0"></div>
        <div v-for="track in tidalTracks" :key="track.url">
          <a
            :href="track.url"
            class="animate-bottom break-all"
            v-if="track.url && !isLoading"
          >{{track.url}}</a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = "http://192.168.178.55:9000/api";
import SearchForm from "./components/SearchForm";
export default {
  components: {
    SearchForm
  },
  data: () => ({
    tidalTracks: [],
    isLoading: false
  }),
  methods: {
    async handleSubmit(spotifyUrl) {
      this.isLoading = true;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: spotifyUrl })
      });

      const data = await response.json();
      if (data) {
        this.tidalTracks = [...data.tracks];
        this.isLoading = false;
        console.log(data);
      }
    }
  }
};
</script>

<style>
/* Center the loader */
.loader {
  width: 50px;
  height: 50px;
  margin: -75px 0 0 -75px;
  border: 8px solid #f3f3f3;
  border-radius: 50%;
  border-top: 8px solid #38a169;
  -webkit-animation: spin 2s linear infinite;
  animation: spin 2s linear infinite;
}

@-webkit-keyframes spin {
  0% {
    -webkit-transform: rotate(0deg);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}

@keyframes spin {
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
}

/* Add animation to "page content" */
.animate-bottom {
  position: relative;
  -webkit-animation-name: animatebottom;
  -webkit-animation-duration: 1s;
  animation-name: animatebottom;
  animation-duration: 1s;
}

@-webkit-keyframes animatebottom {
  from {
    bottom: -40px;
    opacity: 0;
  }
  to {
    bottom: 0px;
    opacity: 1;
  }
}

@keyframes animatebottom {
  from {
    bottom: -40px;
    opacity: 0;
  }
  to {
    bottom: 0;
    opacity: 1;
  }
}
</style>