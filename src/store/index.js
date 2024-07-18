import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    users: [],
    usersData: [],
  },
  mutations: {
    loadUsers(state, users) {
      state.users = users;
    },
    addUser(state, newUser) {
      state.usersData.push(newUser);
      localStorage.setItem("usersData", JSON.stringify(state.usersData));
    },
    initializeStore(state) {
      if (localStorage.getItem("usersData")) {
        state.usersData = JSON.parse(localStorage.getItem("usersData"));
      }
    },
  },
  actions: {
    loadUsers({ commit }) {
      axios.get("https://fakestoreapi.com/users?limit=100").then((response) => {
        commit("loadUsers", response.data);
      });
    },
    createUser({ commit }, newUser) {
      axios
        .post("https://fakestoreapi.com/users", newUser)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            commit("addUser", newUser);
          }
        })
        .catch((error) => {
          console.error(error);
        });
    },
    initializeStore({ commit }) {
      commit("initializeStore");
    },
  },
  modules: {},
});
