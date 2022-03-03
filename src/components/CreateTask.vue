<template>
  <input
    type="text"
    ref="taskinput"
    v-model="task"
    v-on:keyup.enter="createTask"
    v-on:keyup.esc="removeFocus"
  />
  <button @click="createTask">Create</button>
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
