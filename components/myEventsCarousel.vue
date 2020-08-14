<template>
  <v-carousel hide-delimiters height="370px">
    <v-carousel-item
      v-for="(event, i) in events"
      :key="i"
      :src="event.photo"
      :to="`/events/${events[i].id}`"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      events: [],
      months: [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ],
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.loadUserEvents()
    }
  },
  methods: {
    async loadUserEvents() {
      const headers = { headers: { token: localStorage.getItem('token') } }
      const dbUser = await this.$axios.$get(`/users/me`, headers)

      dbUser.attendingEvents.forEach((event, idx) => {
        this.events.push({
          title: event.title,
          photo: event.photo,
          tags: event.tags,
          id: event._id,
          eventDay: event.eventDate.slice(8, 10),
          eventMonth: this.months[event.eventDate.slice(5, 7) - 1],
          eventYear: event.eventDate.slice(0, 4),
          daysLeft: 0,
        })
        const today = new Date()
        const eventDay = new Date(
          `${event.eventDate.slice(0, 4)}-${event.eventDate.slice(
            5,
            7
          )}-${event.eventDate.slice(8, 10)}`
        )
        this.events[idx].daysLeft = Math.ceil(
          (eventDay - today) / (1000 * 3600 * 24)
        )
      })
      this.events.sort(function (a, b) {
        return a.daysLeft - b.daysLeft
      })

      this.events = this.events.slice(0, 8)
    },
  },
}
</script>

<style>
.v-window-item > div > div.v-image__image.v-image__image--cover {
  background-size: cover !important;
}
</style>
