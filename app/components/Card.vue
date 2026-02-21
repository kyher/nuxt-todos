<template>
  <div class="card">
    <slot name="header"></slot>
    <slot name="content"></slot>
    <div class="card-actions">
      <slot name="actions"></slot>
    </div>
  </div>
</template>

<script setup></script>

<style scoped>
.card {
  border: 1px solid #eee;
  border-radius: 4px;
  padding: 16px;
  margin-bottom: 16px;
}
.card-actions {
  display: flex;
  gap: 0.5rem;
}
</style>
