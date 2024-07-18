import { createStore } from "vuex";
import axios from "axios";

export default createStore({
  state: {
    users: [],
    usersData: [],
    user: [],
  },
  mutations: {
    loadUsers(state, users) {
      state.users = users;
      localStorage.setItem("usersData", JSON.stringify(state.users));
    },
    loadUserID(state, user) {
      state.user = user;
      localStorage.setItem("user", JSON.stringify(user));
    },
    addUser(state, newUser) {
      state.usersData.push(newUser);
      localStorage.setItem("usersData", JSON.stringify(state.usersData));
    },
    removeUser(state, id) {
      var update = state.usersData.filter((item) => item.id !== id);
      state.usersData = update;
      localStorage.setItem("usersData", JSON.stringify(state.usersData));
    },
    initializeStore(state) {
      if (localStorage.getItem("usersData")) {
        state.usersData = JSON.parse(localStorage.getItem("usersData"));
      }
      if (localStorage.getItem("user")) {
        state.user = JSON.parse(localStorage.getItem("user"));
      }
    },
  },

  actions: {
    loadUsers({ commit }) {
      axios.get("https://fakestoreapi.com/users?limit=100").then((response) => {
        commit("loadUsers", response.data);
      });
    },

    loadUsersById({ commit }, id) {
      return axios
        .get(`https://fakestoreapi.com/users/${id}`)
        .then((response) => {
          commit("loadUserID", response.data);
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
    removeUser({ commit }, id) {
      commit("removeUser", id);
    },
    initializeStore({ commit }) {
      commit("initializeStore");
    },
  },
  modules: {},
});
