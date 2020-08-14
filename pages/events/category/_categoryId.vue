<template>
  <v-container>
    <v-btn icon class="pl-4" color="black" @click="previousPage">
      <v-icon class="pl-1">mdi-chevron-left</v-icon>Back
    </v-btn>
    <div class="pb-2 title">Category - {{ searchItem }}</div>
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
            :to="`/events/${event.id}`"
          >
          </v-img>

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
    previousPage() {
      history.back()
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
      const dbEvent = await this.$axios.$get(
        `/events/category/${this.$route.params.categoryId}`
      )

      const getCreator = await this.$axios.$get('/auth/me', {
        headers: { token: localStorage.getItem('token') },
      })
      this.userId = getCreator.id

      dbEvent.forEach((event, idx) => {
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
        if (dbEvent[idx].saved.includes(getCreator.id)) {
          this.events[idx].savedIcon = true
        } else {
          this.events[idx].savedIcon = false
        }
      })
    },
  },
}
</script>

<style>
.v-image.v-responsive.theme--light > div.v-image__image.v-image__image--cover {
  background-size: cover !important;
}
</style>
