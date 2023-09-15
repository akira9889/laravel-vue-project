<script setup>
import store from '../store';
import { computed, onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios';

const router = useRouter()
const form = ref({
  email: '',
  password: '',
  remember: false
})
const errors = computed(() => store.getters['auth/error'])


const login = async () => {
  await store.dispatch('auth/login', form.value)
  errors.value = null
  router.push({ name: 'dashboard' });
}
</script>

<template>
  <div class="flex min-h-full flex-1 flex-col justify-center px-6 py-8 lg:px-8">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-6 text-center text-3xl font-bold leading-9 tracking-tight text-gray-900">
        アカウントログイン
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="login">
        <template v-if="errors?.email">
          <div v-for="error in errors.email" class="text-sm text-red-700 m-1" role="alert">
            {{ error }}
          </div>
        </template>
        <div>
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900">メールアドレス</label>
          <div class="mt-2">
            <input v-model="form.email" id="email" name="email" autocomplete="email"
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
          </div>
        </div>

        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">パスワード</label>
          </div>
          <div class="mt-2">
            <input v-model="form.password" id="password" name="password" type="password" autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
            <template v-if="errors?.password">
              <div v-for="error in errors.password" class="text-sm text-red-700 m-1" role="alert">
                {{ error }}
              </div>
            </template>
          </div>
          <div>
            <div class="mt-4 flex items-center">
              <input id="remember-me" name="remember-me" type="checkbox" v-model="form.remember"
                class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
              <label for="remember-me" class="ml-2 block text-sm text-gray-9000">ログイン状態を保持する</label>
            </div>
          </div>
        </div>

        <div>
          <button type="submit"
            class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
            ログイン
          </button>
        </div>
      </form>

    </div>
    <p class="mt-10 text-center text-sm text-gray-500">
      アカウントがない方は
      <router-link :to="{ name: 'signup' }"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">こちら</router-link>
    </p>
    <hr class="mt-4">
    <p class="mt-4 text-center text-sm text-gray-500">
      パスワードを忘れた方は
      <router-link :to="{ name: 'requestPassword' }"
        class="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">こちら</router-link>
    </p>
  </div>
</template>
