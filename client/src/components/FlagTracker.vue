<template>
  <div class="flagTracker">
    <div>{{count}}</div>
    <div class="emoji">🚩</div>
  </div>
</template>

<script>
  export default {
    name: "FlagTracker",
    props: ["count"],
  };
</script>

<style scoped>
  .flagTracker {
    font-size: 35px;
    display: flex;
    align-items: flex-end;
  }

  .emoji {
    font-size: 30px;
  }
</style>