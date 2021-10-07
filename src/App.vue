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
      v-on:change="saveTasks" 
    />
    <input 
      type="text" 
      v-model="task.name" 
      v-on:change="saveTasks" 
    />
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
      taskId: 0,
    };  
  },
  mounted() {
    if (localStorage.taskId) {
      try {
        this.tasks = JSON.parse(localStorage.getItem("tasks"));
        this.taskId = localStorage.taskId;
      } catch (e) {
        localStorage.removeItem("tasks");
      }
    }
    this._keyListener = function (e) {
      if (e.keyCode == 32) {
        let nextUncheck = this.tasks.findIndex((task) => task.status == false);
        if (nextUncheck > -1) {
          this.tasks[nextUncheck++].status = true;
        }
      }
    };
    document.addEventListener("keydown", this._keyListener.bind(this));
  },
  beforeDestroy() {
    document.removeEventListener("keydown", this._keyListener);
  },
  methods: {
    addTask(e) {
      let taskObject = { id: this.taskId++, name: e, status: false };
      this.tasks.push(taskObject);
      this.saveTasks();
    },
    removeTask(e) {
      this.tasks.splice(e, 1);
      this.saveTasks();
    },
    saveTasks() {
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem("tasks", parsed);
      localStorage.taskId = this.taskId;
      console.log("saved");
    },
  },
};
// API NEXT / FETCH VS AXIOS
</script>
