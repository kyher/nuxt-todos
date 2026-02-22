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
  <div class="todos-page">
    <header class="page-header">
      <h1>Todos</h1>
    </header>

    <section class="add-task">
      <h2>Add Task</h2>
      <form @submit.prevent="addTask" class="task-form">
        <input
          class="input"
          v-model="newTaskTitle"
          placeholder="Title"
          required
        />
        <input
          class="input"
          v-model="newTaskDescription"
          placeholder="Description"
          required
        />
        <button class="submit-btn" type="submit" :disabled="isSubmitting">
          Add Task
        </button>
      </form>
    </section>

    <section class="tasks">
      <h2>Tasks</h2>

      <ul v-if="tasks?.length" class="task-grid">
        <li v-for="task in tasks" :key="task.id" class="task-item">
          <Card>
            <template #header>
              <h3>{{ task.title }}</h3>
            </template>
            <template #content>
              <p>{{ task.description }}</p>
              <p class="status">
                Completed: {{ task.completed ? "✅" : "❌" }}
              </p>
            </template>
            <template #actions>
              <button
                class="action-btn"
                @click="() => toggleTaskCompletion(task.id)"
                :disabled="isDeleting === task.id"
              >
                {{ task.completed ? "Uncomplete" : "Complete" }}
              </button>
              <button
                class="action-btn danger"
                @click="() => deleteTask(task.id)"
                :disabled="isDeleting === task.id"
              >
                Delete
              </button>
            </template>
          </Card>
        </li>
      </ul>

      <p v-else class="no-tasks">No tasks yet.</p>
    </section>
  </div>
</template>

<style scoped>
/* Page container */
.todos-page {
  padding: 1.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
  align-items: center;
}

.page-header h1 {
  margin: 0;
  font-size: 1.75rem;
  text-align: center;
}

.add-task h2 {
  text-align: center;
}

.add-task,
.tasks {
  width: 100%;
  max-width: 1100px;
}

.task-form {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  width: min(720px, 92%);
  margin: 0.5rem auto 1.5rem;
  background: rgba(0, 0, 0, 0.3);
  padding: 2rem;
  border-radius: 8px;
}

.input {
  padding: 0.75rem;
  border: 1px solid #ddd;
  border-radius: 6px;
  width: 100%;
  box-sizing: border-box;
}

.submit-btn {
  padding: 0.75rem 1rem;
  border: none;
  border-radius: 6px;
  background-color: #007bff;
  color: white;
  cursor: pointer;
  align-self: flex-end;
}
.submit-btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

.tasks h2 {
  text-align: center;
  margin-top: 0.5rem;
}

.task-grid {
  display: grid;
  gap: 1rem;
  grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  list-style: none;
  padding: 0;
  margin: 1rem 0 2rem;
  width: 100%;
}

.task-item {
  display: flex;
  justify-content: center;
}

.no-tasks {
  text-align: center;
  color: #666;
}

.action-btn {
  padding: 0.4rem 0.6rem;
  border: none;
  border-radius: 6px;
  background: #0b84ff;
  color: white;
  cursor: pointer;
}
.action-btn.danger {
  background: #dc3545;
}
.action-btn[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Responsive tweaks */
@media (max-width: 640px) {
  .page-header h1 {
    font-size: 1.5rem;
  }
  .submit-btn {
    width: 100%;
    align-self: stretch;
  }
  .task-grid {
    gap: 0.75rem;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .task-form {
    width: min(640px, 92%);
  }
}
</style>
