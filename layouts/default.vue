<template>
  <v-app>
    <navBar :title="title" />

    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>

    <v-footer app>
      <span>&copy; {{ title }} {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
import navBar from '../components/navBar'

export default {
  components: {
    navBar,
  },
  data() {
    return {
      title: 'QPasa',
    }
  },
}
</script>
