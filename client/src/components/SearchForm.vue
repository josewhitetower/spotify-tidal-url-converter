<template>
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
</template>

<script>
export default {
  data: () => ({
    spotifyUrl:
      "https://open.spotify.com/track/257SoE95qEweGItCB9Q5rE?si=jx-q14okRWWhvPk6XZ7LJg"
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