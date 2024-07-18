<template>
  <v-app>
    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  created() {
    this.$store.dispatch("loadUsers");
    this.$store.dispatch("initializeStore");
  },
};
//
</script>
