<template>
  <div
    class="cell"
    :class="background"
    @mousedown="toggleBackground"
    @mouseup="toggleBackground"
  >{{face}}</div>
</template>

<script>
  // import GameStates from "../assets/utils/GameStates.js";

  export default {
    name: "ResetButton",
    props: ["face"],
    data() {
      return {
        background: "default",
      };
    },
    methods: {
      resetGame: function () {},
      toggleBackground: function () {
        this.background = this.background === "default" ? "revealed" : "default";
      },
    },
  };
</script>

<style scoped>
</style>