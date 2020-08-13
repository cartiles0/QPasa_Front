<template>
  <div class="text-center">
    <v-chip
      class="ma-1"
      color="success"
      :to="`/events/category/Gastronomy`"
      outlined
    >
      <v-icon left small class="mr-0">mdi-pound</v-icon>
      Gastronomy
    </v-chip>

    <v-chip
      class="ma-1"
      color="primary"
      :to="`/events/category/Concerts`"
      outlined
    >
      <v-icon left small class="mr-0">mdi-pound</v-icon>
      Concerts
    </v-chip>

    <v-chip
      class="ma-1"
      color="deep-purple accent-4"
      :to="`/events/category/Sports`"
      outlined
    >
      <v-icon left small class="mr-0">mdi-pound</v-icon>
      Sports
    </v-chip>

    <v-chip
      class="ma-1"
      color="indigo darken-3"
      :to="`/events/category/Expo-Fairs`"
      outlined
    >
      <v-icon left small class="mr-0">mdi-pound</v-icon>
      Expo/Fairs
    </v-chip>
  </div>
</template>
