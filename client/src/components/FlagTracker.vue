<template>
  <div>
    <div class="countStyle">
      <div>{{count}}</div>
      <div class="emoji">🚩</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "FlagTracker",
    props: ["count"],
  };
</script>

<style>
  .countStyle {
    font-size: 25px;
    display: flex;
    align-items: flex-end;
  }

  .emoji {
    font-size: 20px;
  }
</style>