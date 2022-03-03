<template>
  <input
    type="text"
    ref="taskinput"
    placeholder="Something epic you'll do"
    v-model="task"
    v-on:keyup.enter="createTask"
    v-on:keyup.esc="removeFocus"
    class="w-96 border-0 outline-0 text-lg"
  />
  <button @click="createTask"
    class="
    text-white px-5 py-1 rounded-lg border-0 text-lg
    bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 cursor-pointer
    "
  >Add</button>
</template>

<script>
export default {
  name: 'CreateTask',
  emits: ['add-task'],
  data() {
    return {
      task: null
    };
  },
  methods: {
    createTask() {
      if (this.task) {
        this.$emit('add-task', this.task);
        this.task = '';
      }
    },
    removeFocus() {
      this.$refs.taskinput.blur();
    }
  }
};
</script>
