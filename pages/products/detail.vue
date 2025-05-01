<script setup>
const route = useRoute()
</script>

<template>
  <div class="container mx-auto p-4">
    <h1>{{ route.query.id }}</h1>
  </div>
</template>