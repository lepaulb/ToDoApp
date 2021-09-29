<template>
    <input
      type="text"
      id="taskinput"
      v-model="task"
      v-on:keyup.enter="createTask"
      v-on:keyup.esc="removeFocus"
    >
    <button @click="createTask">Create</button>
</template>

<script>
export default {
  name: 'CreateTask',
  emits: ["add-task"],
  data() {
    return {
      task: "",
    }
  },
  methods: {
    createTask() {
      this.$emit("add-task", this.task);
      this.task = "";
    },
    removeFocus() {
      taskinput.blur();
    }
  }
}
</script>
