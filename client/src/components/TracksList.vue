<template>
  <div
    v-if="tracks.length > 0"
    class="bg-white flex mt-10 overflow-auto py-12 rounded shadow-lg px-4 items-center"
  >
    <div v-for="track in tracks" :key="track.url" class="flex-shrink-0">
      <Track :track="track" />
    </div>
  </div>
</template>

<script>
import Track from "./Track";

export default {
  components: {
    Track
  },
  props: ["tracks"]
};
</script>

<style>
</style>