<template>
  <div class="root-container">
    <nav>
      <ul>
        <li><NuxtLink to="/">Home</NuxtLink></li>
        <li><NuxtLink to="/todos">Todos</NuxtLink></li>
      </ul>
    </nav>
    <slot />
  </div>
</template>

<style>
body {
  font-family: monospace;
  background-color: #2e222b;
  color: white;
}

.root-container {
  padding: 16px;
  border-radius: 4px;
  background-color: #2e222b;
}

nav {
  margin-bottom: 1rem;
  padding: 1rem;
  background: rgba(255, 255, 255, 0.1);
  border-radius: 1rem;
  font-size: x-large;

  ul {
    display: flex;
    gap: 1rem;
    li {
      list-style: none;
      a {
        text-decoration: none;
        color: white;
        font-weight: bold;
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }
}
</style>
