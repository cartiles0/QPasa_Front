<template>
  <v-sheet class="mx-auto" elevation="0" max-width="2000">
    <v-slide-group v-model="model" class="pt-2" center-active>
      <v-slide-item
        v-for="(event, idx) in events"
        :key="idx"
        v-slot:default="{ active }"
      >
        <v-card class="mr-5 mb-5 rounded-xl">
          <v-img
            :src="event.photo"
            height="250px"
            width="300px"
            @click="goToEvent(idx)"
          ></v-img>

          <v-card-actions class="py-0 align-baseline">
            <v-card-subtitle class="pb-0 pt-2 pl-2 align-baseline">
              {{ event.eventMonth }} {{ event.eventDay }},
              {{ event.eventYear }} — {{ event.daysLeft }} Days Left!
            </v-card-subtitle>
            <v-spacer></v-spacer>
          </v-card-actions>

          <v-card-title class="pt-0 pb-2">
            <v-btn
              class="px-0 align-start"
              color="primary"
              text
              :to="`/events/${event.id}`"
              v-text="event.title"
            >
            </v-btn>
          </v-card-title>
          <v-row class="fill-height" align="center" justify="center">
            <v-scale-transition>
              <v-icon
                v-if="active"
                color="white"
                size="48"
                v-text="'mdi-close-circle-outline'"
              ></v-icon>
            </v-scale-transition>
          </v-row>
        </v-card>
      </v-slide-item>
    </v-slide-group>

    <v-expand-transition>
      <v-sheet v-if="model != null" color="grey lighten-4" height="200" tile>
        <v-row class="fill-height" align="center" justify="center">
          <h3 class="title">Selected {{ model }}</h3>
        </v-row>
      </v-sheet>
    </v-expand-transition>
  </v-sheet>
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
      model: null,
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
.v-image.v-responsive.theme--light > div.v-image__image.v-image__image--cover {
  background-size: cover !important;
}
</style>
