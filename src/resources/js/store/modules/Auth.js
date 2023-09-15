import router from "@/router";
import AuthService from "@/services/AuthService";
import { getError } from "@/utils/helpers";

export const namespaced = true

export const state = {
  user: null,
  isLoggedIn: JSON.parse(localStorage.getItem('isLoggedIn')) || false,
  loading: false,
  error: null,
};

export const actions = {
  async getCurrentUser({ commit }) {
    try {
      const { data } = await AuthService.getCurrentUser()
      commit('setUser', data);
    } catch (error) {
      dispatch('logout')
    }
  },
  async registerUser({ commit }, form) {
    try {
      const { data } = await AuthService.registerUser(form)
      commit('setUser', data);
      commit('setLoggedIn', true);
      router.push('/dashboard');
    } catch (error) {
      commit('setError', getError(error));
    }
  },
  async login({ commit }, form) {
    try {
      const { data } = await AuthService.login(form)
      commit('setUser', data);
      commit('setLoggedIn', true);
    } catch (error) {
      commit('setUser', null)
      commit('setLoggedIn', false);
      commit('setError', getError(error));
    }
  },
  async logout({ commit }) {
    try {
      await AuthService.logout();
      commit('setUser', null);
      commit('setLoggedIn', false);
      router.push('/login');
    } catch (error) {
      commit('setError', error);
    }
  },
}

export const mutations = {
  setUser(state, user) {
    state.user = user
  },
  setLoading(state, loading) {
    state.loading = loading
  },
  setError(state, error) {
    state.error = error
  },
  setLoggedIn(state, value) {
    state.isLoggedIn = value
    localStorage.setItem('isLoggedIn', value);
  }
};

export const getters = {
  authUser: (state) => {
    return state.user;
  },
  error: (state) => {
    return state.error;
  },
  loading: (state) => {
    return state.loading;
  },
  loggedIn: (state) => {
    return state.isLoggedIn;
  },
};
