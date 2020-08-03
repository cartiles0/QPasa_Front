<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <tagChips />
      <br />
      <h2>Upcoming Events</h2>
      <v-card>
        <upcomingEvents />
      </v-card>
      <div v-if="userLogged === true">
        <br />
        <h3>#CERCADETI</h3>
        <v-card>
          <nearYou />
        </v-card>
      </div>
      <br />
      <h3>#CONCIERTOS</h3>
      <v-card>
        <concerts />
      </v-card>
      <br />
      <h3>#GASTRONOMIA</h3>
      <v-card>
        <gastronomy />
      </v-card>
    </v-flex>
  </v-layout>
</template>

<script>
import tagChips from '../components/tagChips'
import upcomingEvents from '../components/upcomingEvents'
import nearYou from '../components/nearYou'
import concerts from '../components/concerts'
import gastronomy from '../components/gastronomy'

export default {
  components: {
    tagChips,
    upcomingEvents,
    nearYou,
    concerts,
    gastronomy,
  },
  data() {
    return {
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
