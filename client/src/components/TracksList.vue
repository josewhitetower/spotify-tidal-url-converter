<template>
  <div
    v-if="isLoading || tracks.length > 0"
    class="bg-white flex mt-10 overflow-auto py-12 rounded shadow-lg px-4 items-center"
  >
    <div v-if="isLoading" class="loader m-0"></div>
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
  props: ["isLoading", "tracks"]
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
</style>