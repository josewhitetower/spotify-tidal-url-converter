<template>
  <div>
    <h2 class="text-green-500 mt-4">
      <span class="font-bold tracking-wider">{{ title }}</span> by
      <span>{{ artist }}</span>
    </h2>
    <video
      controls
      name="media"
      class="h-16 max-w-md mx-auto w-full mt-4"
      :key="previewUrl"
    >
      <source :src="previewUrl" type="audio/mpeg" />
    </video>
  </div>
</template>

<script>
export default {
  props: ["previewUrl", "title", "artist"]
};
</script>

<style></style>
