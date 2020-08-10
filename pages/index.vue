<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <tagChips />
      <br />
      <div class="hidden-sm-and-up">
        <div>
          <h2>Upcoming Events</h2>
          <upcomingEventsCarousel />
        </div>
        <!-- <div v-if="userLogged === true">
          <br />
          <h3>#CERCADETI</h3>
          <nearYou />
        </div> -->
        <br />
        <div v-for="(category, idx) in categories" :key="idx">
          <v-chip
            class="ma-2"
            :color="category.color"
            :to="`/events/category/${category.type}`"
            outlined
          >
            <v-icon left small class="mr-0">mdi-pound</v-icon>
            {{ category.type }}
          </v-chip>
          <v-card>
            <eventCarousel :data="category.type" />
          </v-card>
          <br />
        </div>
      </div>
      <div class="hidden-xs-only">
        <div>
          <h2>Upcoming Events</h2>
          <upcomingEventsCard />
        </div>
        <div v-for="(category, idx) in categories" :key="idx">
          <v-chip
            class="ma-2"
            :color="category.color"
            :to="`/events/category/${category.type}`"
            outlined
          >
            <v-icon left small class="mr-0">mdi-pound</v-icon>
            {{ category.type }}
          </v-chip>
          <eventCards :data="category.type" />
        </div>
      </div>
    </v-flex>
  </v-layout>
</template>

<script>
import tagChips from '../components/tagChips'
import upcomingEventsCarousel from '../components/upcomingEventsCarousel'
import upcomingEventsCard from '../components/upcomingEventsCard'
// import nearYou from '../components/nearYou'
import eventCarousel from '../components/eventCarousel'
import eventCards from '../components/eventCards'

export default {
  components: {
    tagChips,
    upcomingEventsCarousel,
    upcomingEventsCard,
    // nearYou,
    eventCarousel,
    eventCards,
  },
  data() {
    return {
      categories: [
        { type: 'Concerts', color: 'primary' },
        { type: 'Gastronomy', color: 'success' },
        { type: 'Sports', color: 'deep-purple accent-4' },
      ],
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
