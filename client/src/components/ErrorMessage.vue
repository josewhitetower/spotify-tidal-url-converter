<template>
  <div
    class="mt-8 bg-red-400 text-white p-3 text-left text-xs rounded max-w-xs wi-full mx-auto relative"
  >
    {{message}}
    <span
      class="absolute mr-2 mt-px right-0 top-0 font-bold cursor-pointer"
      @click="handleClick"
    >x</span>
  </div>
</template>

<script>
export default {
  props: ["message"],
  methods: {
    handleClick() {
      this.$emit("close");
    }
  }
};
</script>

<style>
</style>