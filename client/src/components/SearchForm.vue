<template>
  <form class="flex justify-center mt-8" @submit.prevent="handleSubmit">
    <input
      type="url"
      placeholder="Enter URL..."
      required
      pattern="https://open.spotify.com/track/.*"
      class="h-10 px-4 rounded-l-lg max-w-lg w-full"
      v-model="spotifyUrl"
    />
    <span v-if="isLoading" class="loader"></span>
    <button v-else class="bg-green-600 h-10 px-2 rounded-r-lg hover:bg-green-400 text-white">Go!</button>
  </form>
</template>

<script>
export default {
  props: ["isLoading"],
  data: () => ({
    spotifyUrl: ""
  }),
  methods: {
    handleSubmit() {
      this.$emit("submit", this.spotifyUrl);
      this.spotifyUrl = "";
    }
  }
};
</script>

<style>
/* Center the loader */
.loader {
  width: 25px;
  height: 25px;
  margin: 7px 0 0 -35px;
  border: 4px solid #f3f3f3;
  border-radius: 50%;
  border-top: 4px solid #38a169;
  -webkit-animation: spin 1.2s linear infinite;
  animation: spin 1.2s linear infinite;
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
</style>