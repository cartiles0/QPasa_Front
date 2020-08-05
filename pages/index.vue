<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <!-- <tagChips /> -->
      <br />
      <div>
        <h2>Upcoming Events</h2>
        <upcomingEvents />
      </div>
      <div v-if="userLogged === true">
        <br />
        <h3>#CERCADETI</h3>
        <nearYou />
      </div>
      <br />

      <div v-for="(category, idx) in categories" :key="idx">
        <h3>#{{ category }}</h3>
        <v-card>
          <eventCarousel :data="category" />
        </v-card>
        <br />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
// import tagChips from '../components/tagChips'
import upcomingEvents from '../components/upcomingEvents'
import nearYou from '../components/nearYou'
import eventCarousel from '../components/eventCarousel'

export default {
  components: {
    // tagChips,
    upcomingEvents,
    nearYou,
    eventCarousel,
  },
  data() {
    return {
      categories: ['Concerts', 'Gastronomy', 'Sports'],
      userLogged: true,
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.userLogged = true
    } else {
      this.userLogged = false
    }
  },
}
</script>
