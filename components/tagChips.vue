<template>
  <div class="text-center">
    <v-chip
      class="ma-2"
      color="success"
      :to="`/events/category/Gastronomy`"
      outlined
    >
      <v-icon left>mdi-pound</v-icon>
      Gastronomía
    </v-chip>

    <v-chip
      class="ma-2"
      color="primary"
      :to="`/events/category/Concerts`"
      outlined
    >
      <v-icon left>mdi-pound</v-icon>
      Conciertos
    </v-chip>

    <v-chip
      class="ma-2"
      color="deep-purple accent-4"
      :to="`/events/category/Sports`"
      outlined
    >
      <v-icon left>mdi-pound</v-icon>
      Sports
    </v-chip>

    <v-chip
      class="ma-2"
      color="indigo darken-3"
      :to="`/events/category/Expo%2FFairs`"
      outlined
    >
      <v-icon left>mdi-pound</v-icon>
      Expo/Ferias
    </v-chip>
  </div>
</template>
