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
      const userAdd = {
        ...newUser,
        id: state.usersData.length + 1,
        isCreate: true,
      };
      state.usersData.push(userAdd);
      localStorage.setItem("usersData", JSON.stringify(state.usersData));
    },
    updateUser(state, { id, newUser }) {
      const userIndex = state.usersData.findIndex(
        (user) => user.id === parseInt(id)
      );

      const userUpdate = {
        ...newUser,
        id: parseInt(id),
      };
      if (userIndex !== -1) {
        state.usersData[userIndex] = userUpdate;

        localStorage.setItem("usersData", JSON.stringify(state.usersData));
      } else {
        console.error("Usuário não encontrado!");
      }
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
    updateUser({ commit }, { id, newUser }) {
      axios
        .put(`https://fakestoreapi.com/users/${id}`, newUser)
        .then((response) => {
          if (response.status === 201 || response.status === 200) {
            commit("updateUser", { id: id, newUser: newUser });
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
