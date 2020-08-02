<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <tagChips />
      <h2>Upcoming Events</h2>
      <div id="upcomingEvents">
        <upcomingEvents />
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import tagChips from '../components/tagChips'
import upcomingEvents from '../components/upcomingEvents'

export default {
  components: {
    tagChips,
    upcomingEvents,
  },
}
</script>

<style>
#upcomingEvents {
  height: 50px;
}
</style>
