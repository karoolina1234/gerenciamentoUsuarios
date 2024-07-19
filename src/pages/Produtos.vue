<template>
  <div class="areaCard">
    <v-card
      class="mx-auto my-12"
      max-width="350"
      v-for="prod in products"
      :key="prod.id"
    >
      <template v-slot:loader="{ isActive }">
        <v-progress-linear
          :active="isActive"
          color="deep-purple"
          height="4"
          indeterminate
        ></v-progress-linear>
      </template>

      <v-img height="250" :src="prod.image" cover></v-img>

      <v-card-item>
        <v-card-title>{{ prod.title }}</v-card-title>
      </v-card-item>

      <v-card-text>
        <v-row align="center" class="mx-0">
          <v-rating
            :model-value="prod.rating.rate"
            color="amber"
            density="compact"
            size="small"
            half-increments
            readonly
          ></v-rating>

          <div class="text-grey ms-4">
            {{ prod.rating.rate }} ({{ prod.rating.count }})
          </div>
        </v-row>

        <div class="my-4 text-subtitle-1">$ {{ prod.price.toFixed(2) }}</div>
        <div class="description">
          {{ prod.description }}
        </div>
      </v-card-text>

      <v-card-actions>
        <v-btn
          color="teal-lighten-3"
          text="Adicionar"
          block
          border
          @click="reserve"
        ></v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  created() {
    this.$store.dispatch("loadProd");
  },
  computed: mapState(["products"]),
};
</script>

<style lang="scss" scoped>
.areaCard {
  text-align: center;
  .v-card {
    display: inline-block;

    .v-card-text {
      .description {
        max-height: 3.5rem;
        overflow: hidden;
      }
    }
  }
}
</style>
