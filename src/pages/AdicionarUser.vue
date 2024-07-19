<template>
  <form @submit.prevent="submitForm">
    <v-text-field
      v-model="state.name"
      :counter="10"
      label="Nome"
      required
      :error-messages="v$.name.$errors.map((e) => e.$message)"
      @blur="v$.name.$touch"
      @input="v$.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      label="E-mail"
      required
      :error-messages="v$.email.$errors.map((e) => e.$message)"
      @blur="v$.email.$touch"
      @input="v$.email.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.username"
      label="Username"
      required
      :error-messages="v$.username.$errors.map((e) => e.$message)"
      @blur="v$.username.$touch"
      @input="v$.username.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.password"
      label="Senha"
      type="password"
      required
      :error-messages="v$.password.$errors.map((e) => e.$message)"
      @blur="v$.password.$touch"
      @input="v$.password.$touch"
    ></v-text-field>

    <v-btn class="me-4" type="submit">Submit</v-btn>
    <v-btn @click="clear">Clear</v-btn>
  </form>
</template>

<script setup>
import { reactive, computed } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useRouter, useRoute } from "vue-router";

const initialState = {
  name: "",
  email: "",
  username: "",
  password: "",
};

const state = reactive({
  ...initialState,
});

const rules = {
  name: { required },
  email: { required, email },
  username: { required },
  password: { required },
};

const v$ = useVuelidate(rules, state);
const store = useStore();
const router = useRouter();
const route = useRoute();

const userId = computed(() => route.params.id);

const user = computed(() => store.state.user);
console.log("Estado do usuário:", user.value);

if (userId.value) {
  store
    .dispatch("loadUsersById", userId.value)
    .then(() => {
      const value = user.value;
      console.log("Usuário carregado:", value);
      if (value) {
        state.name = value?.name?.firstname || "";
        state.email = value.email || "";
        state.username = value.username || "";
        v$.value.$reset();
      }
    })
    .catch((error) => {
      console.error("Falha ao buscar usuário:", error);
    });
} else {
  clear();
}
function clear() {
  v$.value.$reset();
  Object.assign(state, initialState);
}

function submitForm() {
  v$.value.$touch(); // Trigger validation
  if (v$.value.$invalid) {
    return;
  }

  const newUser = {
    email: state.email,
    username: state.username,
    password: state.password,
    name: {
      firstname: state.name,
      lastname: "teste",
    },
    address: {
      city: "kilcoole",
      street: "7835 new road",
      number: 3,
      zipcode: "12926-3874",
      geolocation: {
        lat: "-37.3159",
        long: "81.1496",
      },
    },
    phone: "1-570-236-7033",
  };

  if (userId.value) {
    store
      .dispatch("updateUser", { id: userId.value, newUser: newUser })
      .then(() => {
        clear();
        router.push("/usuarios");
      })
      .catch((error) => {
        console.error("Failed to update user:", error);
      });
  } else {
    store
      .dispatch("createUser", newUser)
      .then(() => {
        clear();
        router.push("/usuarios");
      })
      .catch((error) => {
        console.error("Failed to add user:", error);
      });
  }
}
</script>
