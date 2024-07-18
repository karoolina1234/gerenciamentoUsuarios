<template>
  <AppNavigation />
  <div class="btnAdd">
    <v-btn prepend-icon="mdi-plus" variant="tonal" @click="adicionarUsuario">
      Adiconar usuário
    </v-btn>
  </div>

  <div class="tableusers">
    <v-table fixed-header>
      <thead>
        <tr>
          <th class="text-left">Nome</th>
          <th class="text-left">UserName</th>
          <th class="text-left">Email</th>
          <th class="text-left">Telefone</th>
          <th class="text-left">Endereço</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.name.firstname }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address.city + user.address.street }}</td>
        </tr>
        <tr v-for="user in usersData" :key="user.id">
          <td>{{ user.name.firstname }}</td>
          <td>{{ user.username }}</td>
          <td>{{ user.email }}</td>
          <td>{{ user.phone }}</td>
          <td>{{ user.address.city + user.address.street }}</td>
        </tr>
      </tbody>
    </v-table>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  name: "UsuariosPage",
  methods: {
    adicionarUsuario() {
      this.$router.push("/adicionarUser");
    },
  },

  computed: mapState(["users", "usersData"]),
};
</script>

<style scoped>
.btnAdd {
  margin-bottom: 5rem;
}
.btnAdd button {
  margin-top: 1rem;
  float: right;
}

.tableusers table tbody td {
  width: calc(100% / 5);
}
.tableusers table thead td {
  width: calc(100% / 5);
}
</style>
