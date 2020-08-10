<template>
  <v-carousel hide-delimiters height="auto">
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
  props: {
    userevent: {
      type: Array,
      default: () => [],
    },
  },
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
    this.loadUserEvents()
  },
  methods: {
    loadUserEvents() {
      this.userevent.forEach((event, idx) => {
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
.v-image__image--cover {
  background-size: contain !important;
}
</style>
