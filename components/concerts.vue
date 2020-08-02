<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(event, i) in events"
      :key="i"
      :src="event.photo"
      :to="`/events/${events[i].id}`"
      height="100px"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      events: [],
    }
  },
  mounted() {
    this.concert()
  },
  methods: {
    async concert() {
      const dbEvents = await this.$axios.$get('/events/category/Concerts')
      dbEvents.forEach((event, idx) => {
        this.events.push({
          title: event.title,
          photo: event.photo,
          tags: event.tags,
          id: event._id,
        })
      })
    },
  },
}
</script>
