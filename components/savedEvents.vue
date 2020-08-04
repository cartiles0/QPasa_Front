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
    savedevent: {
      type: null,
      default: ['5f22faa51205c8d5eaf89969'],
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
      this.savedevent.forEach((data) => {
        this.loadSavedEvents(data)
      })
    },
    async loadSavedEvents(e) {
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
