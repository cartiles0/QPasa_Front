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
    yourevent: {
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
    this.loadYourEvents()
  },
  methods: {
    loadYourEvents() {
      console.log('------->' + this.yourevent)
      this.yourevent.forEach((eventID, idx) => {
        this.events.push({
          title: eventID.title,
          photo: eventID.photo,
          tags: eventID.tags,
          id: eventID._id,
        })
        console.log(eventID)
        console.log(this.events)
        console.log(eventID.title)
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
