<template>
  <v-row justify="center">
    <v-col>
      <v-card-title>
        <span class="headline">Create Event</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="title"
                label="Title*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="eventDate"
                label="Event Date*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12">
              <v-textarea
                v-model="description"
                label="Event Description*"
                persistent-hint
                required
              ></v-textarea>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="capacity"
                label="Capacity*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6" md="6">
              <v-text-field
                v-model="price"
                label="Price*"
                required
              ></v-text-field>
            </v-col>
            <v-col cols="12" m="6" md="6">
              <v-select
                v-model="category"
                :items="[
                  'Concerts',
                  'Conferences/Workshops',
                  'Expo/Fairs',
                  'Festivals',
                  'For Kids',
                  'Gastronomy',
                  'Parties',
                  'Retreats',
                  'Shows',
                  'Sports',
                  'Theater/Film',
                ]"
                label="Category*"
                required
              ></v-select>
            </v-col>
          </v-row>
        </v-container>
        <small>*indicates required field</small>
      </v-card-text>
      <v-card-actions>
        <v-btn color="blue darken-1" text to="/">Back</v-btn>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="create">Create</v-btn>
      </v-card-actions>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      eventDate: '',
      description: '',
      capacity: '',
      price: '',
      category: '',
    }
  },
  methods: {
    async create() {
      const getCreator = await this.$axios.$get('/auth/me', {
        headers: { token: localStorage.getItem('token') },
      })

      const data = {
        title: this.title,
        eventDate: this.eventDate,
        description: this.description,
        capacity: parseInt(this.capacity),
        price: parseInt(this.price),
        category: this.category,
        creator: getCreator.id,
      }

      const ip = await this.$axios.$post('/events/me', data, {
        headers: { token: localStorage.getItem('token') },
      })

      this.ip = ip
    },
  },
}
</script>
