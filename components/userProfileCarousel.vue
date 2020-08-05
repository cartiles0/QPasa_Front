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
    }
  },
  mounted() {
    this.loadUserEvents()
  },
  methods: {
    loadUserEvents() {
      this.userevent.forEach((eventID, idx) => {
        this.events.push({
          title: eventID.title,
          photo: eventID.photo,
          tags: eventID.tags,
          id: eventID._id,
        })
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
