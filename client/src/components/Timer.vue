<template>
  <div>
    <div class="countStyle">
      <div>{{seconds}}</div>
      <div class="emoji">🕑</div>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Timer",
    props: ["seconds"],
  };
</script>