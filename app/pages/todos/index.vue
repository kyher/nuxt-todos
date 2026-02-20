<script setup>
const { data: tasks } = await useFetch("/api/tasks");
</script>
<template>
  <h1>Todos</h1>
  <ul v-if="tasks?.length">
    <li v-for="task in tasks" :key="task.id">
      {{ task.title }} ({{ task.description }})
    </li>
  </ul>
  <p v-else>No tasks yet.</p>
</template>
