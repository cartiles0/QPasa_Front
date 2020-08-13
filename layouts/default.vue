<template>
  <v-app>
    <navBar :title="title" />

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-bottom-navigation
      :value="activeBtn"
      class="hidden-sm-and-up"
      color="indigo"
      fixed
    >
      <bottomNav />
    </v-bottom-navigation>
    <v-footer app fixed>
      <span>&copy; {{ title }} {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import navBar from '../components/navBar'
import bottomNav from '../components/bottomNavigation'

export default {
  components: {
    navBar,
    bottomNav,
  },
  data() {
    return {
      activeBtn: 1,
      title: 'QPasa',
    }
  },
}
</script>
