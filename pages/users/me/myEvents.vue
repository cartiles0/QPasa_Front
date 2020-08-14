<template>
  <v-container>
    <div class="pb-2 title">Created Events</div>
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
            class="white--text align-end"
            height="200px"
            @click="editEvent(idx)"
          >
          </v-img>

          <v-card-actions class="py-0 align-baseline">
            <v-card-subtitle class="py-0 pl-2 align-baseline">
              {{ event.eventMonth }} {{ event.eventDay }}, {{ event.eventYear }}
            </v-card-subtitle>
            <v-spacer></v-spacer>

            <v-btn icon text @click="editEvent(idx)">
              Edit
            </v-btn>
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
  data() {
    return {
      events: [],
      userId: '',
      searchItem: this.$route.params.categoryId,
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
    this.loadCategory()
  },
  methods: {
    goToEvent(idx) {
      this.$router.push(`/events/${this.events[idx].id}`)
    },
    editEvent(idx) {
      this.$router.push(`/events/me/${this.events[idx].id}`)
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
    async loadCategory() {
      const headers = { headers: { token: localStorage.getItem('token') } }
      const dbUser = await this.$axios.$get(`/users/me/`, headers)

      this.userId = dbUser._id

      const myEvents = dbUser.myEvents

      myEvents.forEach((event, idx) => {
        this.events.push({
          title: event.title,
          date: event.eventDate,
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

        if (myEvents[idx].saved.includes(dbUser._id)) {
          this.events[idx].savedIcon = true
        } else {
          this.events[idx].savedIcon = false
        }
      })
      this.events.sort(function (a, b) {
        return a.daysLeft - b.daysLeft
      })
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
