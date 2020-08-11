<template>
  <v-container fluid>
    <v-row dense>
      <v-col
        v-for="(event, idx) in events"
        :key="idx"
        :cols="12"
        :sm="6"
        :md="4"
        :lg="3"
        :xl="3"
      >
        <v-card class="mr-5 mb-5 rounded-xl">
          <v-img
            :src="event.photo"
            height="200px"
            @click="goToEvent(idx)"
          ></v-img>

          <v-card-actions class="pb-0">
            <v-card-subtitle class="py-0 pl-2 align-baseline">
              {{ event.eventMonth }} {{ event.eventDay }}, {{ event.eventYear }}
            </v-card-subtitle>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-title class="pt-0 pb-2">
            <v-btn
              class="px-0 align-start"
              color="primary"
              text
              @click="editEvent(idx)"
              v-text="event.title"
            >
            </v-btn>
          </v-card-title>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    goToEvent(idx) {
      this.$router.push(`/events/${this.events[idx].id}`)
    },
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

<style lang="scss">
// .v-card > .v-card__progress + :not(.v-btn):not(.v-chip),
// .v-card > :first-child:not(.v-btn):not(.v-chip) {
//   max-height: 180px;
// }
.v-image.v-responsive.theme--light > div.v-image__image.v-image__image--cover {
  background-size: cover !important;
}
</style>
