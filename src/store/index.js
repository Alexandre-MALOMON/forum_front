import { createStore } from 'vuex'
import Cookies from 'js-cookie';
import createPersistedState from "vuex-persistedstate";

export default createStore({
  plugins: [
    createPersistedState(
      {
        storage: {
          getItem: key => Cookies.get(key),
          setItem: (key, value) => Cookies.set(key, value, { expires: 3, secure: true }),
          removeItem: key => Cookies.remove(key)
        }
      }
    ),
  ],
  state: {
    data: null
  },
  getters: {
  },
  mutations: {
    getData(state, newData) {
      state.data = newData;
    },
  },
  actions: {
  },
  modules: {
  }
})
