<template>
  <div class="mx-auto my-5">
    <v-img height="auto" :src="event.photo"></v-img>

    <v-card-actions class="pb-0">
      <v-btn class="pr-0" color="deep-purple" text>
        Going
      </v-btn>
      <v-btn class="ml-0 pl-0" icon>
        <v-icon>mdi-thumb-up-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-title class="pb-2 pt-0">{{ event.title }}</v-card-title>

    <v-card-text>
      <div>{{ event.category }}</div>

      <div class="mb-4 subtitle-1">
        {{ event.price }}€ • Las Palmas de Gran Canaria
      </div>

      <div>{{ event.description }}</div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-actions class="justify-end">
      <v-btn color="deep-purple" text>
        Going
      </v-btn>
      <v-btn class="ml-0 pl-0" style="font-size: 10px;" icon>
        <v-icon>mdi-thumb-up-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  data() {
    return {
      loading: false,
      selection: 1,
      event: {},
    }
  },
  mounted() {
    this.eventLoad()
  },
  methods: {
    async eventLoad() {
      const dbEvent = await this.$axios.$get(
        `/events/${this.$route.params.eventId}`
      )
      this.event = {
        title: dbEvent.title,
        description: dbEvent.description,
        date: dbEvent.date,
        capacity: dbEvent.capacity,
        price: dbEvent.price,
        photo: dbEvent.photo,
        category: dbEvent.category,
        creator: dbEvent.creator,
        address: dbEvent.address,
        saved: dbEvent.saved,
        attendance: dbEvent.attendance,
        views: dbEvent.views,
        tags: dbEvent.tags,
        id: dbEvent._id,
      }
    },
  },
}
</script>
