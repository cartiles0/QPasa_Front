<template>
  <v-card class="mx-auto my-5 justified-center elevation-0" max-width="800px">
    <v-img :src="event.photo"></v-img>

    <v-card-actions class="pb-0">
      <v-btn
        v-if="attendText === false"
        class="pr-0"
        color="primary"
        text
        @click="userAttend"
      >
        ATTEND
      </v-btn>
      <v-btn v-else class="pr-0" color="primary" text @click="userAttend">
        ATTENDING
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn v-if="savedIcon === false" icon @click="userSave">
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn v-else icon color="red" @click="userSave">
        <v-icon>mdi-heart</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-title class="py-0">{{ event.title }}</v-card-title>
    <v-card-text class="py-0 my-0"
      >#{{ event.category }} | {{ event.creator }}</v-card-text
    >

    <v-card-text>
      <div class="mb-4 subtitle-1">
        {{ event.price }}€ • {{ event.capacity }} Tickets • Las Palmas de Gran
        Canaria
      </div>
      <v-spacer></v-spacer>
      <div class="mb-4 subtitle-1">
        {{ event.eventMonth }} {{ event.eventDay }}, {{ event.eventYear }}
      </div>

      <div>{{ event.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions class="justify-end">
      <v-btn
        v-if="attendText === false"
        class="pr-0"
        color="primary"
        text
        @click="userAttend"
      >
        ATTEND
      </v-btn>
      <v-btn v-else class="pr-0" color="primary" text @click="userAttend">
        ATTENDING
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      event: {},
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
        'Octubre',
        'November',
        'December',
      ],
    }
  },
  mounted() {
    this.eventLoad()
  },
  methods: {
    async userSave() {
      const dbSave = await this.$axios.$put(
        `/events/me/${this.event.id}/save`,
        {},
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      if (dbSave.saved.includes(this.userId)) {
        this.savedIcon = true
      } else {
        this.savedIcon = false
      }
    },
    async userAttend() {
      const dbAttend = await this.$axios.$put(
        `/events/me/${this.event.id}/attendance`,
        {},
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      if (dbAttend.attendance.includes(this.userId)) {
        this.attendText = true
      } else {
        this.attendText = false
      }
    },
    async eventLoad() {
      const dbEvent = await this.$axios.$get(
        `/events/${this.$route.params.eventId}`
      )
      this.event = {
        title: dbEvent.title,
        description: dbEvent.description,
        capacity: dbEvent.capacity,
        price: dbEvent.price,
        photo: dbEvent.photo,
        category: dbEvent.category,
        creator: dbEvent.creator.name,
        address: dbEvent.address,
        saved: dbEvent.saved,
        attendance: dbEvent.attendance,
        views: dbEvent.views,
        tags: dbEvent.tags,
        id: dbEvent._id,
        eventDay: dbEvent.eventDate.slice(8, 10),
        eventMonth: this.months[dbEvent.eventDate.slice(5, 7) - 1],
        eventYear: dbEvent.eventDate.slice(0, 4),
      }

      const getCreator = await this.$axios.$get('/auth/me', {
        headers: { token: localStorage.getItem('token') },
      })
      this.userId = getCreator.id

      if (dbEvent.saved.includes(getCreator.id)) {
        this.savedIcon = true
      } else {
        this.savedIcon = false
      }

      if (dbEvent.attendance.includes(getCreator.id)) {
        this.attendText = true
      } else {
        this.attendText = false
      }

      await this.$axios.$put(`/events/${dbEvent._id}/views`)
    },
  },
}
</script>
