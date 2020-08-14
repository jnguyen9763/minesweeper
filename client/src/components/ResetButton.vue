<template>
  <div
    class="cell"
    :class="background"
    @mousedown="toggleBackground"
    @mouseup="toggleBackground"
    @click="resetGame"
  >{{face}}</div>
</template>

<script>
  // import GameStates from "../assets/utils/GameStates.js";

  export default {
    name: "ResetButton",
    props: ["face", "resetGame"],
    data() {
      return {
        background: "default",
      };
    },
    methods: {
      toggleBackground: function () {
        this.background = this.background === "default" ? "revealed" : "default";
      },
    },
  };
</script>