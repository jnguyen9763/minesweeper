<template>
  <div class="win-screen">
    <h1>You won!</h1>
    <div class="emoji">⭐</div>
    <h2>
      You only took {{seconds}}
      <span v-if="single">second</span>
      <span v-else>seconds</span> to complete the game.
    </h2>
    <hr />
    <form @submit.prevent="onSubmitHandler">
      <label for="name">
        <h2>Enter your name to save your highscore</h2>
      </label>
      <br />
      <input type="text" id="name" name="name" v-model="name" required />
      <br />
      <input type="submit" id="submit" value="Submit" />
    </form>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "WinScreen",
    props: ["seconds"],
    data() {
      return {
        name: "",
        single: this.seconds === 1,
      };
    },
    methods: {
      onSubmitHandler: function () {
        axios
          .post("http://localhost:5000/highscores", {
            name: this.name,
            highscore: this.seconds,
          })
          .then(() => {
            this.name = "";
          });
      },
    },
    watch: {
      name: function () {
        console.log(this.name);
      },
    },
  };
</script>

<style scoped>
  .win-screen {
    width: 560px;
    height: 640px;
    background: url("../assets/images/win-screen.svg");
    position: absolute;
    padding: 15px 30px;
    text-align: center;
  }

  .win-screen > * {
    margin: 2rem 0;
  }

  form > * {
    margin: 0.5rem 0;
    font-family: "Press Start 2P", cursive;
  }

  .emoji {
    font-size: 100px;
  }

  #name {
    width: 75%;
    line-height: 2rem;
    font-size: 1.5rem;
    text-align: center;
    padding: 0.25rem;
    background-color: #e5e7e9;
    border: 5px #a6acaf solid;
  }

  #submit {
    font-size: 1.5rem;
    background-color: #cacfd2;
    border: 3px #000000 solid;
    padding: 0.5rem 1rem;
  }
</style>