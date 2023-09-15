<script setup>
import { computed } from 'vue';
import store from './store';

const user = computed(() => store.state.auth.user)


</script>

<template>
  ダッシュボード {{ user?.name }}<br>
  <router-link :to="{ name: 'mypage' }" class="block h-[100vh] w-[100vw] bg-red-100">マイページ</router-link>
</template>
