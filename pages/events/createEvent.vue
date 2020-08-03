<template>
  <v-row justify="center">
    <v-col>
      <v-form ref="form">
        <v-card-title>
          <span class="headline">Create Event</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="title"
                  label="Title"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-menu
                  ref="menu1"
                  v-model="menu1"
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  max-width="290px"
                  min-width="290px"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-text-field
                      v-model="eventDate"
                      label="Event Date"
                      hint="Format MM/DD/YYYY"
                      persistent-hint
                      prepend-icon=""
                      v-bind="attrs"
                      @blur="date = parseDate(eventDate)"
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-date-picker
                    v-model="date"
                    no-title
                    @input="menu1 = false"
                  ></v-date-picker>
                </v-menu>
              </v-col>
              <v-col cols="12">
                <v-text-field
                  v-model="photo"
                  label="Event Poster Link"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12">
                <v-textarea
                  v-model="description"
                  label="Event Description"
                  required
                ></v-textarea>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model.number="capacity"
                  label="Capacity"
                  required
                ></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="6">
                <v-text-field
                  v-model="price"
                  label="Price"
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
                  label="Category"
                  required
                ></v-select>
              </v-col>
            </v-row>
          </v-container>
          <small>Please fill out the the complete form!</small>
        </v-card-text>
        <v-card-actions>
          <v-btn color="blue darken-1" text to="/">Back</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="reset">Reset</v-btn>
          <v-btn color="blue darken-1" text @click="create">Create</v-btn>
        </v-card-actions>
      </v-form>
    </v-col>
  </v-row>
</template>

<script>
export default {
  data(vm) {
    return {
      title: '',
      photo: '',
      description: '',
      capacity: '',
      price: '',
      category: '',
      date: new Date().toISOString().substr(0, 10),
      eventDate: '',
      menu1: false,
      menu2: false,
    }
  },
  computed: {
    computedDateFormatted() {
      return this.formatDate(this.date)
    },
  },
  watch: {
    date(val) {
      this.eventDate = this.formatDate(this.date)
    },
  },
  methods: {
    reset() {
      this.$refs.form.reset()
    },
    async create() {
      const getCreator = await this.$axios.$get('/auth/me', {
        headers: { token: localStorage.getItem('token') },
      })

      const data = {
        title: this.title,
        photo: this.photo,
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

      this.reset()
    },
    formatDate(date) {
      if (!date) return null

      const [year, month, day] = date.split('-')
      return `${month}/${day}/${year}`
    },
    parseDate(date) {
      if (!date) return null

      const [month, day, year] = date.split('/')
      return `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}`
    },
  },
}
</script>
