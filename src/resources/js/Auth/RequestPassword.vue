<script setup>
import GuestLayout from '../components/GuestLayout.vue';
import AuthService from "@/services/AuthService";
import { ref } from 'vue';
import { getError } from '@/utils/helpers.js';

const form = ref({
  email: ''
})

const errors = ref({})

function forgotPassword() {
  AuthService.forgotPassword(form.value)
    .then(() => {
      //TODO メール送信通知
      console.log('成功')
    })
    .catch((error) => {
      errors.value = getError(error)
    })
}

</script>

<template>
  <GuestLayout title="新しいパスワードのリクエスト">
    <form class="space-y-6" @submit.prevent="forgotPassword">
      <div>
        <div class="mt-2">
          <label for="email" class="block text-sm font-medium leading-6 text-gray-900 dark:text-white">メールアドレス</label>
          <div class="mt-2">
            <template v-if="errors?.email">
                <div v-for="error in errors.email" class="text-sm text-red-700 m-1" role="alert">
                  {{ error }}
                </div>
              </template>
            <input v-model="form.email" id="email" name="email" type="email" autocomplete="email" required
              class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-gray-600 sm:text-sm sm:leading-6" />
          </div>
        </div>
        <div class="my-8">
          <router-link :to="{ name: 'login' }" class="text-sm text-indigo-600 hover:text-indigo-500">
            ログイン画面へ戻る
          </router-link>
        </div>
      </div>

      <div>
        <button type="submit"
          class="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          送信
        </button>
      </div>
    </form>
  </GuestLayout>
</template>
