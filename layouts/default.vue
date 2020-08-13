<template>
  <v-app>
    <navBar :title="title" />

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation :value="activeBtn" color="purple lighten-1" app fixed>
      <v-btn>
        <span>Recents</span>
        <v-icon>mdi-history</v-icon>
      </v-btn>

      <v-btn>
        <span>Favorites</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn>
        <span>Nearby</span>
        <v-icon>mdi-map-marker</v-icon>
      </v-btn>
    </v-bottom-navigation>
    <v-footer>
      <span>&copy; {{ title }} {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import navBar from '../components/navBar'
// import toolBar from '../components/toolBar'

export default {
  components: {
    navBar,
    // toolBar,
  },
  data() {
    return {
      activeBtn: 1,
      title: 'QPasa',
    }
  },
}
</script>
