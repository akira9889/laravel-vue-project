<script setup>
import GuestLayout from '../components/GuestLayout.vue';
import AuthService from "@/services/AuthService";
import { ref } from 'vue';
import { getError } from '@/utils/helpers.js';
import { useRoute } from 'vue-router';
import { useRouter } from 'vue-router';

const route = useRoute();
const param = route.query;

const form = ref({
  password: '',
  password_confirmation: '',
  ...param
});

const errors = ref({});

const showPassword = ref(false);

const router = useRouter();

function resetPassword() {
  AuthService.resetPassword(form.value)
    .then(() => {
      router.push({name: 'login'})
    })
    .catch((error) => {
      errors.value = getError(error)
    });
}

</script>

<template>
  <GuestLayout title="新しいパスワードの設定">
    <form class="space-y-6" @submit.prevent="resetPassword">
      <div>
        <div>
            <div class="flex items-center justify-between">
              <template v-if="errors?.email">
                  <div v-for="error in errors.email" class="text-sm text-red-700 m-1" role="alert">
                    {{ error }}
                  </div>
                </template>
            </div>
            <label for="password" class="block text-sm font-medium leading-6 text-gray-900">パスワード</label>
            <div class="mt-2 relative">
              <input v-model="form.password" id="password" name="password" :type="showPassword ? 'text' : 'password'"
                required
                class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
              <button v-show="form.password" @click="showPassword = !showPassword" type="button"
                class="absolute inset-y-0 right-0 px-3 flex items-center text-sm leading-5">
                <font-awesome-icon v-if="showPassword" :icon="['far', 'eye-slash']" />
                <font-awesome-icon v-else-if="!showPassword" :icon="['far', 'eye']" />
              </button>
              <template v-if="errors?.password">
                <div v-for="error in errors.password" class="text-sm text-red-700 m-1" role="alert">
                  {{ error }}
                </div>
              </template>
            </div>
          </div>

          <div>
            <div class="flex items-center justify-between">
              <label for="password" class="block text-sm font-medium leading-6 text-gray-900">パスワード確認</label>
            </div>
            <div class="mt-2">
              <input v-model="form.password_confirmation" id="password_confirmation" name="password_confirmation"
                type="password" required
                class="block w-full rounded-md border-0 p-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-1 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
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
