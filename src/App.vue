<template>
  <CreateTask @add-task="addTask" /><br /><br />
  <div v-bind:key="task" v-for="(task, index) in tasks">
    <input type="checkbox" />
    {{ task }}
    <button v-on:click="removeTask(index)">x</button>
  </div>
</template>

<script>
import CreateTask from "./components/CreateTask.vue";

export default {
  name: "App",
  components: {
    CreateTask,
  },
  data() {
    return {
      tasks: [],
    };
  },
  mounted() {
    if (localStorage.getItem("tasks")) {
      try {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
      } catch (e) {
        localStorage.removeItem("tasks");
      }
    }
  //   this._keyListener = function (e) {
  //     if (e.altKey && e.keyCode === 65) {
  //       this.addTask("hello");
  //     }
  //   };
  //   document.addEventListener("keydown", this._keyListener.bind(this));
  // },
  // beforeDestroy() {
  //   document.removeEventListener("keydown", this._keyListener);
  },
  methods: {
    addTask(e) {
      this.tasks.push(e);
      this.saveTasks();
    },
    removeTask(e) {
      this.tasks.splice(e, 1);
      this.saveTasks();
    },
    saveTasks() {
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem("tasks", parsed);
    },
  },
};
</script>
