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
    <button class="bg-green-600 h-10 px-2 rounded-r-lg hover:bg-green-400 text-white">Go!</button>
  </form>
</template>

<script>
export default {
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
</style>