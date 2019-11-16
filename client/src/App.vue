<template>
  <div class="h-screen bg-gray-100 px-6">
    <h1
      class="text-xl md:text-3xl lg:text-3xl font-sans font-bold text-center pt-4"
    >Spotify-Tidal URL Converter</h1>
    <div class="text-center">
      <form class="flex justify-center mt-8" @submit.prevent="handleSubmit">
        <input
          type="text"
          placeholder="Enter URL..."
          required
          class="h-10 px-4 rounded-l-lg"
          v-model="spotifyUrl"
        />
        <button class="bg-green-600 h-10 px-2 rounded-r-lg hover:bg-green-400 text-white">Convert</button>
      </form>
      <div
        v-if="isLoading || tidalUrl"
        class="mt-10 shadow-lg bg-white rounded py-12 text-green-600 hover:text-green-400 flex justify-center"
      >
        <div v-if="isLoading" class="loader m-0"></div>
        <a
          :href="tidalUrl"
          class="animate-bottom break-all"
          v-if="tidalUrl && !isLoading"
        >{{tidalUrl}}</a>
      </div>
    </div>
  </div>
</template>

<script>
const API_URL = "http://192.168.178.55:9000/api";
export default {
  data: () => ({
    spotifyUrl: "",
    tidalUrl: "",
    isLoading: false
  }),
  methods: {
    async handleSubmit() {
      this.isLoading = true;
      const response = await fetch(API_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ url: this.spotifyUrl })
      });

      const data = await response.json();
      if (data) {
        this.tidalUrl = data.url;
        this.spotifyUrl = "";
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