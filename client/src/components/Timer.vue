<template>
  <div class="timer">{{seconds}}</div>
</template>

<script>
  export default {
    name: "Timer",
    props: ["seconds"],
  };
</script>

<style scoped>
  .timer {
    font-size: 35px;
  }
</style>