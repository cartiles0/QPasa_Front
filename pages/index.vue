<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <div class="px-3">
        <tagChips />
      </div>
      <br />
      <div class="hidden-sm-and-up px-3">
        <h2>Upcoming Events</h2>
        <upcomingEventsCardPhone />
      </div>
      <div id="myEvents" class="hidden-sm-and-up pb-9">
        <v-list-item-title v-if="(userLogged = true)" class="mt-6">
          <v-row class="px-3 pt-4">
            <h3 class="pl-3">My Events -</h3>
            <v-btn
              :to="'/users/me/attendingEvents'"
              class="pl-1 pb-1"
              text
              color="primary"
            >
              See All
            </v-btn>
          </v-row>
        </v-list-item-title>
        <userProfileCarousel :userevent="user.attendingEvents" />
      </div>
      <v-container class="py-0">
        <div
          v-for="(category, idx) in categories"
          :key="idx"
          class="hidden-sm-and-up"
        >
          <!-- <div v-if="userLogged === true">
          <br />
          <h3>#CERCADETI</h3>
          <nearYou />
        </div> -->
          <br />
          <v-chip
            class="ma-2"
            :color="category.color"
            :to="`/events/category/${category.type}`"
            outlined
          >
            <v-icon left small class="mr-0">mdi-pound</v-icon>
            {{ category.type }}
          </v-chip>
          <eventCardsPhone :data="category.type" />
          <br />
        </div>
        <div class="hidden-xs-only px-3">
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
      </v-container>
    </v-flex>
  </v-layout>
</template>

<script>
import tagChips from '../components/tagChips'
import upcomingEventsCardPhone from '../components/upcomingEventsCardPhone'
import upcomingEventsCard from '../components/upcomingEventsCard'
// import nearYou from '../components/nearYou'
// import eventCarousel from '../components/eventCarousel'
import userProfileCarousel from '../components/userProfileCarousel'
import eventCards from '../components/eventCards'
import eventCardsPhone from '../components/eventCardsPhone'

export default {
  components: {
    tagChips,
    upcomingEventsCardPhone,
    upcomingEventsCard,
    userProfileCarousel,
    // nearYou,
    // eventCarousel,
    eventCards,
    eventCardsPhone,
  },
  async asyncData({ $axios, params }) {
    const headers = { headers: { token: localStorage.getItem('token') } }
    const dbUser = await $axios.get(`/users/me`, headers)
    return {
      user: {
        attendingEvents: dbUser.data.attendingEvents,
      },
    }
  },
  data() {
    return {
      categories: [
        { type: 'Concerts', color: 'primary' },
        { type: 'Gastronomy', color: 'success' },
        { type: 'Sports', color: 'deep-purple accent-4' },
      ],
      userLogged: false,
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

<style>
#myEvents {
  background-color: #d3d3d362;
}
</style>
