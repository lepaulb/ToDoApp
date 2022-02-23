<template>
  <!-- Create new task -->
  <CreateTask @add-task="addTask" />
  <br /><br />

  <hr class="my-5" />
  Choose reward
  <input type="radio" id="one" value="puppy" v-model="rewardType" checked />
  <label for="one">Puppy</label>
  <input type="radio" id="two" value="sexy man" v-model="rewardType" />
  <label for="two">Sexy man</label>
  <input type="radio" id="three" value="sexy woman" v-model="rewardType" />
  <label for="three">Sexy woman</label>
  <div class="flex items-center">
    <div>
      <div class="h-52">
        <hr class="my-5" />
        <h3>Active tasks</h3>
        <div v-bind:key="activeTask" v-for="(activeTask, index) in activeTasks">
          <input
            type="checkbox"
            v-model="activeTask.status"
            v-on:change="changeTaskStatus(activeTask)"
          />
          <input
            type="text"
            v-model="activeTask.name"
            v-on:change="saveTasks"
          />
          <button v-on:click="removeTask(index)">x</button>
        </div>
      </div>

      <hr class="my-5" />
      <h3>Reward</h3>
        <img v-show="giphyToggle" v-bind:src="giphyImgSrcA" />
        <img v-show="!giphyToggle" v-bind:src="giphyImgSrcB" />

      <hr class="my-5" />
      <h3>Completed tasks</h3>
      <div
        v-bind:key="completedTask"
        v-for="(completedTask, index) in completedTasks"
      >
        <input
          type="checkbox"
          v-model="completedTask.status"
          v-on:change="changeTaskStatus(completedTask)"
        />
        <input
          type="text"
          v-model="completedTask.name"
          v-on:change="saveTasks"
        />
        <button v-on:click="removeTask(index)">x</button>
      </div>
    </div>
  </div>
</template>

<script>
import CreateTask from './components/CreateTask.vue';
import axios from 'axios';

export default {
  name: 'App',
  components: {
    CreateTask
  },

  data() {
    return {
      tasks: [],
      taskId: 0,
      giphyPosition: 0,
      giphyImgSrc: null,
      giphyImgSrcA: null,
      giphyImgSrcB: null,
      giphyToggle: false,
      rewardType: 'puppy',
      giphyTimeout: null
    };
  },

  computed: {
    activeTasks() {
      return this.tasks.filter((task) => !task.status);
    },

    completedTasks() {
      return this.tasks.filter((task) => task.status);
    }
  },

  mounted() {
    this.loadGiphy();

    if (localStorage.taskId) {
      try {
        this.tasks = JSON.parse(localStorage.getItem('tasks'));
        this.taskId = localStorage.taskId;
      } catch (e) {
        localStorage.removeItem('tasks');
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
  watch: {
    rewardType: function (newReward) {
      this.giphyImgSrc = null;
      this.giphyImgSrcA = null;
      this.giphyImgSrcB = null;
      this.giphyToggle = false;
      this.loadGiphy(newReward);
      console.log('changed preloaded giphy to' + newReward);
    }
  },
  methods: {
    addTask(e) {
      let taskObject = { id: this.taskId++, name: e, status: false };
      this.tasks.push(taskObject);
      this.saveTasks();
      console.log('addTask');
    },

    removeTask(e) {
      this.tasks.splice(e, 1);
      this.saveTasks();
      console.log('remoteTask');
    },

    saveTasks() {
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', parsed);
      localStorage.taskId = this.taskId;
      console.log('saveTasks');
    },

    changeTaskStatus(e) {
      clearTimeout(this.giphyTimeout);
      this.saveTasks();
      console.log('changeTaskStatus');
      if (e.status) {
        this.loadGiphy(this.rewardType);
      }
    },

    hideGiphy() {
      this.giphyToggle
        ? this.giphyTimeout = setTimeout(() => {
          this.giphyImgSrcA = '';
        }, 4000)
        : this.giphyTimeout = setTimeout(() => {
          this.giphyImgSrcB = '';
        }, 4000);
    },

    async loadGiphy(type = 'puppy') {
      this.giphyToggle = !this.giphyToggle;
      this.giphyPosition = Math.floor(Math.random() * 100);

      const response = await axios.get(
        'http://api.giphy.com/v1/gifs/search?' +
          'q=' +
          type +
          '&limit=1&offset=' +
          this.giphyPosition +
          '&api_key=ifCV6DKdidYXRwUv5d2OEyVIl7Y2Fg8u'
      );

      this.giphyImgSrc = response.data.data[0].images.fixed_height.webp;

      if (this.giphyToggle == false) {
        this.giphyImgSrcA = this.giphyImgSrc;
      } else {
        this.giphyImgSrcB = this.giphyImgSrc;
      }
      this.hideGiphy();
      console.log('loadGiphy');
    }
  }
};
</script>
