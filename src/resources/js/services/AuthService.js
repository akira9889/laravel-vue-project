import axios from "axios";
import store from "@/store";

export const authClient = axios.create({
  baseURL: '/',
});

authClient.interceptors.response.use(
  (response) => {
    return response
  },
  function (error) {
    if (
      error.response &&
      [401, 419].includes(error.response.status) &&
      store.getters["auth/loggedIn"]
    ) {
      store.dispatch("auth/logout");
    }
    return Promise.reject(error);
  }
);

export default {
  async login(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/login", payload);
  },
  logout() {
    return authClient.post("/logout");
  },
  async forgotPassword(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("forgot-password", payload);
  },
  checkAuthStatus() {
    return authClient.get("api/check-auth");
  },
  getCurrentUser() {
    return authClient.get("api/user");
  },
  async resetPassword(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/reset-password", payload);
  },
  // updatePassword(payload) {
  //   return authClient.put("/user/password", payload);
  // },
  async registerUser(payload) {
    await authClient.get("/sanctum/csrf-cookie");
    return authClient.post("/register", payload);
  },
}
