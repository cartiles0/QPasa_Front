<template>
  <v-card class="mx-auto my-5 justified-center elevation-0" max-width="800px">
    <v-img :src="event.photo"></v-img>

    <v-card-actions class="pb-0">
      <v-btn
        v-if="attendText === false"
        class="pr-0"
        color="deep-purple"
        text
        @click="userAttend"
      >
        ATTEND
      </v-btn>
      <v-btn v-else class="pr-0" color="deep-purple" text @click="userAttend">
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
        {{ event.date }}
      </div>

      <div>{{ event.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions class="justify-end">
      <v-btn
        v-if="attendText === false"
        class="pr-0"
        color="deep-purple"
        text
        @click="userAttend"
      >
        ATTEND
      </v-btn>
      <v-btn v-else class="pr-0" color="deep-purple" text @click="userAttend">
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
      this.dbSave = dbSave
    },
    async userAttend() {
      const dbAttend = await this.$axios.$put(
        `/events/me/${this.event.id}/attendance`,
        {},
        {
          headers: { token: localStorage.getItem('token') },
        }
      )
      this.dbAttend = dbAttend
    },
    async eventLoad() {
      const dbEvent = await this.$axios.$get(
        `/events/${this.$route.params.eventId}`
      )
      this.event = {
        title: dbEvent.title,
        description: dbEvent.description,
        date: dbEvent.eventDate,
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
        // dateDay: dbEvent.eventDate.getDate(),
        // dateMonth: dbEvent.eventDate.getMonth() + 1,
        // dateYear: dbEvent.eventDate.getFullYear(),
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
      // console.log('HERE IS THE DATE' + dbEvent.eventDate.toISOString())
    },
  },
}
</script>
