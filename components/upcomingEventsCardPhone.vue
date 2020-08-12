<template>
  <v-sheet class="mx-auto" elevation="0" max-width="2000">
    <v-slide-group v-model="model" class="pa-4" center-active>
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
            <v-card-subtitle class="py-0 pl-2 align-baseline">
              {{ event.eventMonth }} {{ event.eventDay }}, {{ event.eventYear }}
            </v-card-subtitle>
            <v-spacer></v-spacer>

            <v-btn
              v-if="events[idx].savedIcon === false"
              icon
              @click="userSave(idx)"
            >
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn v-else icon color="red" @click="userSave(idx)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
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
  data() {
    return {
      model: null,
      events: [],
      savedIcon: false,
      userId: '',
      attendText: false,
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
      this.$axios
        .$get('/auth/me', {
          headers: { token: localStorage.getItem('token') },
        })
        .then((response) => {
          this.eventLoadId(response.id)
        })
        .catch((err) => console.error(err))
    } else {
      this.eventLoadNoId()
    }
  },
  methods: {
    goToEvent(idx) {
      this.$router.push(`/events/${this.events[idx].id}`)
    },
    async userSave(idx) {
      const dbSave = await this.$axios.$put(
        `/events/me/${this.events[idx].id}/save`,
        {},
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      if (dbSave.saved.includes(this.userId)) {
        this.events[idx].savedIcon = true
      } else {
        this.events[idx].savedIcon = false
      }
    },
    async eventLoadNoId() {
      const dbEvent = await this.$axios.$get(`/events/`)

      dbEvent.forEach((event, idx) => {
        this.events.push({
          title: event.title,
          description: event.description,
          capacity: event.capacity,
          price: event.price,
          photo: event.photo,
          category: event.category,
          address: event.address,
          saved: event.saved,
          attendance: event.attendance,
          tags: event.tags,
          id: event._id,
          eventDay: event.eventDate.slice(8, 10),
          eventMonth: this.months[event.eventDate.slice(5, 7) - 1],
          eventYear: event.eventDate.slice(0, 4),
          savedIcon: false,
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
    async eventLoadId(id) {
      this.userId = id

      const dbEvent = await this.$axios.$get(`/events/`)

      dbEvent.forEach((event, idx) => {
        this.events.push({
          title: event.title,
          description: event.description,
          capacity: event.capacity,
          price: event.price,
          photo: event.photo,
          category: event.category,
          address: event.address,
          saved: event.saved,
          attendance: event.attendance,
          tags: event.tags,
          id: event._id,
          eventDay: event.eventDate.slice(8, 10),
          eventMonth: this.months[event.eventDate.slice(5, 7) - 1],
          eventYear: event.eventDate.slice(0, 4),
          savedIcon: false,
        })
        if (dbEvent[idx].saved.includes(id)) {
          this.events[idx].savedIcon = true
        } else {
          this.events[idx].savedIcon = false
        }
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
