<template>
  <form @submit.prevent="submitForm">
    <v-text-field
      v-model="state.name"
      :counter="10"
      label="Nome"
      required
      @blur="v$.name.$touch"
      @input="v$.name.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.email"
      label="E-mail"
      required
      @blur="v$.email.$touch"
      @input="v$.email.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.username"
      label="username"
      required
      @blur="v$.username.$touch"
      @input="v$.username.$touch"
    ></v-text-field>

    <v-text-field
      v-model="state.password"
      label="Senha"
      type="password"
      required
      @blur="v$.password.$touch"
      @input="v$.password.$touch"
    ></v-text-field>

    <v-btn class="me-4" type="submit">Submit</v-btn>
    <v-btn @click="clear">Clear</v-btn>
  </form>
</template>

<script setup>
import { reactive } from "vue";
import { useVuelidate } from "@vuelidate/core";
import { email, required } from "@vuelidate/validators";
import { useStore } from "vuex";
import { useRouter } from "vue-router";

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

function clear() {
  v$.value.$reset();

  for (const [key, value] of Object.entries(initialState)) {
    state[key] = value;
  }
}

function submitForm() {
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
</script>
