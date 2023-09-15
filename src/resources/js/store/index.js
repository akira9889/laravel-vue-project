import { createStore } from "vuex";

import * as auth from './modules/Auth'

const store = createStore({
  modules: {
    auth,
  },
});

export default store;
