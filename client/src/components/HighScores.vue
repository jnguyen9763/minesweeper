<template>
  <div class="highscores">
    <div class="header">HIGHSCORES</div>
    <div class="table">
      <div class="table-header row">
        <div class="place"></div>
        <div class="name">Name</div>
        <div class="score">Score</div>
      </div>
      <div class="table-body">
        <div
          v-for="(highscore, index) of highscores"
          class="row"
          :class="{'light-gray': index % 2 === 0}"
          :key="index"
        >
          <div class="place">{{index + 1}}.</div>
          <div class="name">{{highscore.name}}</div>
          <div class="score">{{highscore.highscore}}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import axios from "axios";

  export default {
    name: "HighScores",
    data() {
      return {
        highscores: null,
      };
    },
    mounted() {
      axios
        .get("http://localhost:5000/highscores")
        .then((response) => (this.highscores = response.data));
    },
    watch: {
      highscores: function () {
        this.highscores.sort((a, b) => {
          if (a.highscore < b.highscore) {
            return -1;
          } else if (a.highscore > b.highscore) {
            return 1;
          } else if (a.name < b.name) {
            return -1;
          } else if (a.name > b.name) {
            return 1;
          } else {
            return 0;
          }
        });
      },
    },
  };
</script>

<style scoped>
  ::-webkit-scrollbar {
    display: none;
  }

  .highscores {
    width: 560px;
    height: 640px;
    background: url("../assets/images/highscores-panel.svg");
    position: absolute;
    padding: 30px;
  }

  .header {
    height: 80px;
    padding-bottom: 30px;
    line-height: 50px;
    font-size: 45px;
    text-align: center;
  }

  .table {
    width: 500px;
    height: 500px;
  }

  .table-header {
    height: 50px;
    padding: 0.5rem 0;
  }

  .table-body {
    height: 450px;
    overflow-y: scroll;
  }

  .row {
    display: flex;
  }

  .row > div {
    padding: 0.75rem;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .place {
    flex: 1;
  }

  .name {
    flex: 3;
  }

  .score {
    flex: 2;
  }

  .light-gray {
    background-color: #d7dbdd;
  }
</style>