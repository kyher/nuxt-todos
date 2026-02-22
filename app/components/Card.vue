<template>
  <div class="card">
    <slot name="header"></slot>
    <div class="card-content">
      <slot name="content"></slot>
      <div class="card-actions">
        <slot name="actions"></slot>
      </div>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  box-sizing: border-box;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.12);
  padding: 1rem;
  width: 100%;
  max-width: 360px;
  min-width: 220px;
  background: rgba(0, 0, 0, 0.35);
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.card-content {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  flex: 1 1 auto;
}

.card-actions {
  display: flex;
  gap: 0.5rem;
  margin-top: 0.5rem;
  justify-content: flex-end;
  flex-wrap: wrap;
}

/* Grid/list parent may arrange cards; ensure cards shrink nicely on narrow viewports */
@media (max-width: 640px) {
  .card {
    max-width: 100%;
    min-width: 0;
    padding: 0.75rem;
    border-radius: 6px;
  }
  .card-actions {
    justify-content: flex-start;
  }
}

@media (min-width: 641px) and (max-width: 1024px) {
  .card {
    width: calc(50% - 1rem);
    max-width: none;
  }
}

@media (min-width: 1025px) {
  /* fixed comfortable width on large screens */
  .card {
    width: 300px;
  }
}
</style>
