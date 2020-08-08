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
        <v-card class="mr-5 mb-5">
          <v-img :src="event.photo"></v-img>

          <v-card-actions>
            <v-btn
              color="primary"
              text
              :to="`/events/${event.id}`"
              v-text="event.title"
            >
            </v-btn>

            <v-spacer></v-spacer>

            <v-btn v-if="event.savedIcon === false" icon @click="userSave(idx)">
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn v-else icon color="red" @click="userSave(idx)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
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
    this.eventLoad()
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
    },
    async eventLoad() {
      const getCreator = await this.$axios.$get('/auth/me', {
        headers: { token: localStorage.getItem('token') },
      })

      this.userId = getCreator.id

      const dbEvent = await this.$axios.$get(`/events/category/${this.data}`)

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
          views: event.views,
          tags: event.tags,
          id: event._id,
          savedIcon: false,
        })
        if (dbEvent[idx].saved.includes(getCreator.id)) {
          this.events[idx].savedIcon = true
        } else {
          this.events[idx].savedIcon = false
        }
      })

      await this.$axios.$put(`/events/${dbEvent._id}/views`)
    },
  },
}
</script>
