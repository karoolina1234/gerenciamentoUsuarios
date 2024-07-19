<template>
  <v-list>
    <v-list-item
      prepend-icon="mdi-code-json"
      rounded
      variant="elevated"
      title="Api usada"
      subtitle="https://fakestoreapi.com/docs"
    ></v-list-item>
    <v-list-item
      prepend-icon="mdi-account"
      title="Usuários"
      rounded
      variant="elevated"
      subtitle="GET, DELETE, UPDATE, E POST"
    ></v-list-item>
    <v-list-item
      prepend-icon="mdi-cart-variant"
      title="PRODUTOS"
      rounded
      variant="elevated"
      subtitle="GET"
    ></v-list-item>
  </v-list>
  <router-view />
</template>

<script>
export default {
  created() {
    this.$store.dispatch("loadUsers");
    this.$store.dispatch("initializeStore");
  },
};
</script>
<style scoped>
.v-list-item {
  margin: 1rem;
}
</style>
