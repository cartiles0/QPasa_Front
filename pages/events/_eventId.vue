<template>
  <v-card class="mx-auto my-5 justified-center elevation-0" max-width="600px">
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
    <v-card-text class="py-0 my-0 subtitle-2"
      >#{{ event.category }} | {{ event.creator }}</v-card-text
    >

    <v-card-text>
      <div class="subtitle-1 text--primary">
        {{ event.eventMonth }} {{ event.eventDay }}, {{ event.eventYear }} -
        {{ event.daysLeft }} Days Left!
      </div>
      <v-spacer></v-spacer>
      <div class="mb-4 body-1 text--primary">
        Tickets {{ event.price }}€ • {{ event.capacity }} Tickets • Las Palmas
        de Gran Canaria
      </div>

      <v-row class="px-2">
        <div v-for="(tag, idx) in event.tags" :key="idx" class="pl-1">
          <v-chip :color="color[idx]" outlined small>
            <v-icon left x-small class="mr-0">mdi-pound</v-icon>
            {{ tag.name }}
          </v-chip>
        </div>
      </v-row>

      <v-card-title class="px-0 py-1 text--primary">Description</v-card-title>
      <div class="pb-3">{{ event.description }}</div>

      <div class="hidden-xs-only">
        <iframe
          :src="event.mapLocation"
          width="600x"
          height="600px"
          frameborder="0"
          style="border: 0;"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
      <div class="hidden-sm-and-up">
        <iframe
          :src="event.mapLocation"
          width="320px"
          height="400px"
          frameborder="0"
          style="border: 0;"
          allowfullscreen=""
          aria-hidden="false"
          tabindex="0"
        ></iframe>
      </div>
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
      color: [
        'success',
        'primary',
        'deep-purple accent-4',
        'indigo darken-3',
        'secondary',
        'red',
        'orange',
        'teal',
      ],
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
    async userSave() {
      if (localStorage.getItem('token')) {
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
      } else {
        this.$router.push(`/auth/login`)
      }
    },
    async userAttend() {
      if (localStorage.getItem('token')) {
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
      } else {
        this.$router.push(`/auth/login`)
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
        mapLocation: dbEvent.mapLocation,
        saved: dbEvent.saved,
        attendance: dbEvent.attendance,
        views: dbEvent.views,
        tags: dbEvent.tags,
        id: dbEvent._id,
        eventDay: dbEvent.eventDate.slice(8, 10),
        eventMonth: this.months[dbEvent.eventDate.slice(5, 7) - 1],
        eventYear: dbEvent.eventDate.slice(0, 4),
        daysLeft: 0,
      }
      const today = new Date()
      const eventDay = new Date(
        `${dbEvent.eventDate.slice(0, 4)}-${dbEvent.eventDate.slice(
          5,
          7
        )}-${dbEvent.eventDate.slice(8, 10)}`
      )
      this.event.daysLeft = Math.ceil((eventDay - today) / (1000 * 3600 * 24))

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
