<template>
  <div class="pt-2">
    <v-btn @click="goHome">
      <span>EXPLORE</span>
      <v-icon>mdi-pound</v-icon>
    </v-btn>

    <v-btn @click="goToSaved()">
      <span>SAVED</span>
      <v-icon>mdi-heart</v-icon>
    </v-btn>

    <v-btn>
      <span>SEARCH</span>
      <v-icon>mdi-magnify</v-icon>
    </v-btn>
  </div>
</template>

<script>
export default {
  methods: {
    goHome() {
      this.$router.push(`/`)
    },
    goToSaved() {
      this.$router.push(`/users/me/savedEvents`)
    },
  },
}
</script>
