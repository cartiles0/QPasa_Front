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
    data: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      events: [],
    }
  },
  mounted() {
    this.loadCategory()
  },
  methods: {
    async loadCategory() {
      const dbEvent = await this.$axios.$get(`/events/category/${this.data}`)
      dbEvent.forEach((event, idx) => {
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

<style>
.v-image__image--cover {
  background-size: contain !important;
}
</style>
