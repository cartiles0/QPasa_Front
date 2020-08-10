<template>
  <div>
    <v-col
      v-for="(event, i) in events"
      :key="i"
      :cols="12"
      :sm="6"
      :md="4"
      :lg="3"
      :xl="3"
    >
      <v-card class="rounded-xl">
        <v-carousel hide-delimiters height="auto">
          <v-carousel-item
            :src="event.photo"
            :to="`/events/${events[i].id}`"
          ></v-carousel-item>
        </v-carousel>
        <v-list-item class="pt-0">
          <v-list-item-content>
            <v-list-item-subtitle
              >{{ event.eventMonth }} {{ event.eventDay }},
              {{ event.eventYear }}</v-list-item-subtitle
            >
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
          <v-list-item-action>
            <v-btn
              v-if="events[i].savedIcon === false"
              icon
              @click="userSave(i)"
            >
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn v-else icon color="red" @click="userSave(i)">
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-list-item-action>
        </v-list-item>
      </v-card>
    </v-col>
  </div>
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
      const dbEvent = await this.$axios.$get(`/events/category/${this.data}`)
      dbEvent.forEach((event, idx) => {
        this.events.push({
          title: event.title,
          photo: event.photo,
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
  },
}
</script>

<style>
.v-image__image--cover {
  background-size: contain !important;
}
</style>
