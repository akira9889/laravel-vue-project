<script setup>
import { computed } from 'vue';
import store from './store';

const logout = async () => {
  await store.dispatch('auth/logout')
}

const user = computed(() => store.state.auth.user)

</script>

<template>
    <div class="text-center">
      <h1 class="mt-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
        Welcome {{ user?.name }}
      </h1>
      <div class="mt-16 flex items-center justify-center">
        <button type="button"
          class="rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          @click="logout">
          Log out
        </button>
        <router-link :to="{ name: 'login' }"
          class="bg-indigo-600 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm">ログインページ
        </router-link>
        <router-link :to="{ name: 'dashboard' }"
          class="bg-indigo-600 text-white group flex w-full items-center rounded-md px-2 py-2 text-sm">ダッシュボード
        </router-link>
      </div>
    </div>
</template>
