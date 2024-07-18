<template>
  <div>
    <v-navigation-drawer :width="178" class="navStyle">
      <v-list-item title="Gerenciamento" subtitle="Vuetify"></v-list-item>
      <v-divider></v-divider>
      <router-link to="/">
        <v-list-item link title="Home"></v-list-item>
      </router-link>
      <router-link to="/usuarios">
        <v-list-item link title="Usuários"></v-list-item>
      </router-link>
      <router-link to="/produtos">
        <v-list-item link title="Produtos"></v-list-item>
      </router-link>
    </v-navigation-drawer>
  </div>
</template>

<style scoped>
.navStyle a {
  color: #fff;
  text-decoration: none;
}
</style>
