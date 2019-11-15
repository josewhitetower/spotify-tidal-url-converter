<template>
  <div class="h-screen bg-gray-100">
    <h1
      class="text-xl md:text-3xl lg:text-3xl font-sans font-bold text-center pt-4"
    >Spotify-Tidal URL Converter</h1>
    <div>
      <form class="text-center mt-8" @submit.prevent="submit">
        <input type="text" placeholder="Enter URL..." required class="h-8 px-2" v-model="url" />
        <button>Send</button>
      </form>
    </div>
  </div>
</template>

<script>
export default {
  data: () => ({
    url: ""
  }),
  methods: {
    submit() {
      alert(this.url);
      this.url = "";
    }
  }
};
</script>

<style>
</style>