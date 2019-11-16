<template>
  <a class="rounded shadow-lg max-w-sm text-left mr-4 block" :href="track.url">
    <img class="w-full rounded-t" :src="track.album.cover" alt />
    <div class="py-2 px-4">
      <h2 class="tracking-wider font-bold text-green-700">{{track.title}}</h2>
      <div class="flex justify-between">
        <span class="tracking-wider text-green-500">{{track.artist}}</span>
        <span class="text-green-300 ml-2">{{track.album.name}}</span>
      </div>
    </div>
  </a>
</template>

<script>
export default {
  props: ["track"]
};
</script>

<style>
</style>