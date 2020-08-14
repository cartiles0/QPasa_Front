<template>
  <v-app>
    <navBar :title="title" />

    <v-main>
      <nuxt />
    </v-main>

    <v-bottom-navigation class="hidden-sm-and-up" fixed>
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
