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
    attendingevent: {
      type: null,
      default: ['5f2700b3ac234a467aa998b6'],
    },
  },
  data() {
    return {
      events: [],
    }
  },
  mounted() {
    this.eventsArray()
  },
  methods: {
    eventsArray() {
      this.attendingevent.forEach((data) => {
        this.loadAttendingEvents(data)
      })
    },
    async loadAttendingEvents(e) {
      const dbEvent = await this.$axios.$get(`/events/${e}`)
      this.events.push({
        title: dbEvent.title,
        photo: dbEvent.photo,
        tags: dbEvent.tags,
        id: dbEvent._id,
      })
    },
  },
}
</script>

<style>
.v-image__image--cover {
  background-size: contain !important;
}
</style>
