<script setup>
// fetch tasks (keep SSR for initial render) and get the refresh function
const { data: tasks, refresh } = await useFetch("/api/tasks/get");

const newTaskTitle = ref("");
const newTaskDescription = ref("");
const isSubmitting = ref(false);
const isDeleting = ref(null);

// Use client-side $fetch for POST to avoid any server-side double-execution
async function addTask() {
  if (isSubmitting.value) return;
  isSubmitting.value = true;
  try {
    await $fetch("/api/tasks/post", {
      method: "POST",
      body: {
        title: newTaskTitle.value,
        description: newTaskDescription.value,
      },
    });

    newTaskTitle.value = "";
    newTaskDescription.value = "";

    // revalidate the initial fetch
    await refresh();
  } finally {
    isSubmitting.value = false;
  }
}

async function deleteTask(id) {
  if (isDeleting.value === id) return;
  isDeleting.value = id;
  try {
    await $fetch(`/api/tasks/${id}`, {
      method: "DELETE",
    });
    await refresh();
  } finally {
    isDeleting.value = null;
  }
}

async function toggleTaskCompletion(id) {
  const task = tasks.value.find((task) => task.id === id);
  if (!task) return;

  await $fetch(`/api/tasks/${id}`, {
    method: "PATCH",
  });
  await refresh();
}
</script>
<template>
  <h1>Todos</h1>
  <form @submit.prevent="addTask">
    <input v-model="newTaskTitle" placeholder="Title" required />
    <input v-model="newTaskDescription" placeholder="Description" required />
    <button type="submit">Add Task</button>
  </form>
  <ul v-if="tasks?.length">
    <li v-for="task in tasks" :key="task.id">
      <Card>
        <template #header>
          <h2>{{ task.title }}</h2>
        </template>
        <template #content>
          <p>{{ task.description }}</p>
          <p>Completed: {{ task.completed ? "✅" : "❌" }}</p>
        </template>
        <template #actions>
          <button
            @click="() => toggleTaskCompletion(task.id)"
            :disabled="isDeleting === task.id"
          >
            {{ task.completed ? "Uncomplete" : "Complete" }}
          </button>
          <button
            @click="() => deleteTask(task.id)"
            :disabled="isDeleting === task.id"
          >
            Delete
          </button>
        </template>
      </Card>
    </li>
  </ul>
  <p v-else>No tasks yet.</p>
</template>

<style scoped>
li {
  list-style-type: none;
}
form {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  width: 25vw;
  margin: 0 auto;
  input {
    padding: 0.5rem;
    border: 1px solid #ccc;
    border-radius: 4px;
  }
}
button {
  padding: 0.5rem;
  border: none;
  border-radius: 4px;
  background-color: #007bff;
  color: white;
  cursor: pointer;

  &:hover {
    background-color: darken(#007bff, 10%);
  }
}
</style>
