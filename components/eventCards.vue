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
          <v-img :src="event.photo" @click="goToEvent(idx)"></v-img>

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
          tags: event.tags,
          id: event._id,
          savedIcon: false,
        })
      })
    },
    async eventLoadId(id) {
      this.userId = id

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
          tags: event.tags,
          id: event._id,
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
