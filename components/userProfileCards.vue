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

            <!-- <v-spacer></v-spacer>

            <v-btn v-if="event.savedIcon === false" icon @click="userSave(idx)">
              <v-icon>mdi-heart-outline</v-icon>
            </v-btn>
            <v-btn v-else icon color="red" @click="userSave(idx)">
              <v-icon>mdi-heart</v-icon>
            </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  props: {
    userevent: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      events: [],
    }
  },
  mounted() {
    this.loadUserEvents()
  },
  methods: {
    loadUserEvents() {
      this.userevent.forEach((eventID, idx) => {
        this.events.push({
          title: eventID.title,
          photo: eventID.photo,
          tags: eventID.tags,
          id: eventID._id,
        })
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
