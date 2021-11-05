<template>
  <CreateTask @add-task="addTask" />
  <br /><br />
  <div 
    v-bind:key="task" 
    v-for="(task, index) in tasks"
  >
    <input
      type="checkbox" 
      v-model="task.status" 
      v-on:change="changeTaskStatus(task.status)" 
    />
    <input 
      type="text" 
      v-model="task.name" 
      v-on:change="saveTasks" 
    />
    <button v-on:click="removeTask(index)">x</button>
  </div>
  <img v-show="giphyToggle" v-bind:src="giphyImgSrcA" />
  <img v-show="!giphyToggle" v-bind:src="giphyImgSrcB" />
</template>

<script>
import CreateTask from "./components/CreateTask.vue";
import axios from 'axios';

export default {

  name: "App",
  components: {
    CreateTask,
  },

  data() {
    return {
      tasks: [],
      taskId: 0,
      giphyKey: "ifCV6DKdidYXRwUv5d2OEyVIl7Y2Fg8u",
      giphyKeyword: "puppy",
      giphyEndpoint: "http://api.giphy.com/v1/gifs/search?",
      giphyPosition: 0,
      giphyImgSrc: null,
      giphyImgSrcA: null,
      giphyImgSrcB: null,
      giphyToggle: false,
    };  
  },

  mounted() {
    
    this.loadGiphy();

    if (localStorage.taskId) {
      try {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
        this.taskId = localStorage.taskId;
      } catch (e) {
        localStorage.removeItem("tasks");
      }
    }
    // Listen to SPACE key to complete an to-do
    // Problem: this listener is also on while creating a new to-do
    // this._keyListener = function (e) {
    //   if (e.keyCode == 32) {
    //     let nextUncheck = this.tasks.findIndex((task) => task.status == false);
    //     if (nextUncheck > -1) {
    //       this.tasks[nextUncheck].status = !this.tasks[nextUncheck].status;
    //       this.changeTaskStatus(this.tasks[nextUncheck].status);
    //     }
    //   }
    // };
    // document.addEventListener("keydown", this._keyListener.bind(this));
  },

  // Destroy the key event listener
  // beforeDestroy() {
  //   document.removeEventListener("keydown", this._keyListener);
  // },

  methods: {

    addTask(e) {
      let taskObject = { id: this.taskId++, name: e, status: false };
      this.tasks.push(taskObject);
      this.saveTasks();
      console.log("addTask");
    },

    removeTask(e) {
      this.tasks.splice(e, 1);
      this.saveTasks();
      console.log("remoteTask");
    },

    saveTasks() {
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem("tasks", parsed);
      localStorage.taskId = this.taskId;
      console.log("saveTasks");
    },

    changeTaskStatus(e) {
      this.saveTasks();
      if (e) { 
        this.loadGiphy(); 
      }
      console.log("changeTaskStatus");
    },

    async loadGiphy() {
      this.giphyToggle = !this.giphyToggle;
      this.giphyPosition = Math.floor(Math.random() * 100);
      await axios
        .get(this.giphyEndpoint+'q='+this.giphyKeyword+'&limit=1&offset='+this.giphyPosition+'&api_key='+this.giphyKey)
        .then(response => (this.giphyImgSrc = response.data.data[0].images.fixed_height.webp));
      if (this.giphyToggle == false) {
        this.giphyImgSrcA = this.giphyImgSrc;
      } else {
        this.giphyImgSrcB = this.giphyImgSrc;
      }
      console.log("loadGiphy");
    }
  },
};
</script>
