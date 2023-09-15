<script setup>
import { onMounted } from 'vue';
import store from '../store';

onMounted(() => {
  store.dispatch('auth/getCurrentUser')
})
</script>

<template>
  <div class="min-h-[100vh] bg-gray-200 flex">
    <div class="flex-1">
      <!-- Content -->
      <main class="p-6">
        <router-view></router-view>
      </main>
      <!-- Content -->
    </div>
  </div>
</template>


<style scoped>
</style>
