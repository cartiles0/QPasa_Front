<template>
  <v-container fluid>
    <div class="pb-2 title">My Saved Events</div>
    <v-row dense>
      <v-col v-for="(event, idx) in events" :key="idx" :cols="4">
        <v-card class="mr-5 mb-5">
          <v-img
            :src="event.photo"
            class="white--text align-end"
            height="auto"
            :to="`/events/${event.id}`"
          >
          </v-img>

          <v-card-actions>
            <v-btn
              class="pr-0"
              color="primary"
              text
              :to="`/events/${event.id}`"
              v-text="event.title"
            >
            </v-btn>

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

            <v-btn icon>
              <v-icon>mdi-share-variant</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      events: [],
      userId: '',
      searchItem: this.$route.params.categoryId,
    }
  },
  mounted() {
    this.loadCategory()
  },
  methods: {
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
      window.location.reload()
    },
    async loadCategory() {
      const headers = { headers: { token: localStorage.getItem('token') } }
      const dbUser = await axios.get(
        'http://localhost:3000/api/users/me',
        headers
      )

      const getCreator = await this.$axios.$get('/auth/me', {
        headers: { token: localStorage.getItem('token') },
      })

      this.userId = getCreator.id

      const savedEvents = dbUser.data.savedEvents

      savedEvents.forEach((event, idx) => {
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
          savedIcon: false,
        })
        if (savedEvents[idx].saved.includes(getCreator.id)) {
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
.v-image__image--cover {
  background-size: contain !important;
}
</style>
