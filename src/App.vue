<template>
  <div class="mt-10 mb-5 text-lg">
    <!-- Create new task -->
    <CreateTask @add-task="addTask" />
  </div>
    My reward:
    <input type="radio" id="one" value="puppy" v-model="rewardType" checked />
    <label for="one">Puppy</label>
    <input type="radio" id="two" value="sexy man" v-model="rewardType" />
    <label for="two">Sexy man</label>
    <input type="radio" id="three" value="sexy woman" v-model="rewardType" />
  <div class="flex text-lg my-10">
    <div class="w-3/6">
     Stuff to do
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
    <div class="w-3/6">
      Stuff completed
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
  <!-- <div class="absolute inset-0 bg-red-500" v-show="(giphyImgSrcA != '' || giphyImgSrcB != '') && !giphyToggle"> -->
    <img v-show="giphyToggle" v-bind:src="giphyImgSrcA" />
    <img v-show="!giphyToggle" v-bind:src="giphyImgSrcB" />
  <!-- </div> -->
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

    // Load the first gif
    this.loadGiphy();

    // Load stored tasks
    try {
      this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    } catch (e) {
      localStorage.removeItem('tasks');
    }

  },

  watch: {
    rewardType: function (newReward) {
      clearTimeout(this.giphyTimeout);
      this.giphyImgSrc = null;
      this.giphyImgSrcA = null;
      this.giphyImgSrcB = null;
      this.giphyToggle = false;
      this.loadGiphy(newReward);
      console.log('changed preloaded giphy to ' + newReward);
    }
  },
  methods: {
    addTask(e) {
      let taskObject = { name: e, status: false, created: Date.now() };
      this.tasks.push(taskObject);
      this.saveTasks();
      console.log('addTask');
    },

    removeTask(e) {
      this.tasks.splice(e, 1);
      console.log('removeTask');
      this.saveTasks();
    },

    saveTasks() {
      const parsed = JSON.stringify(this.tasks);
      localStorage.setItem('tasks', parsed);
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
      this.giphyTimeout = setTimeout(() => {
        if ( this.giphyToggle ) {
          this.giphyImgSrcA = '';
        } else {
          this.giphyImgSrcB = '';
        }
      }, 4000 );
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
