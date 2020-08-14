<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="12" md="10" lg="8" xl="6">
        <v-form ref="form">
          <v-card-title>
            <span class="headline">Create Event</span>
          </v-card-title>
          <v-card-text>
            <v-container>
              <v-row>
                <v-col cols="12" sm="5" md="4">
                  <v-card-title class="pl-0 pb-0">
                    Upload Event Poster
                  </v-card-title>
                  <uploadImage v-model="photo" @imageURL="setImageURL" />
                </v-col>
                <v-col cols="12" sm="7" md="8">
                  <v-text-field
                    v-model="title"
                    label="Title"
                    required
                  ></v-text-field>
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
                  <v-select
                    v-model="category"
                    class="pt-7"
                    :items="[
                      'Concerts',
                      'Conferences-Workshops',
                      'Expo-Fairs',
                      'Festivals',
                      'For Kids',
                      'Gastronomy',
                      'Parties',
                      'Retreats',
                      'Shows',
                      'Sports',
                      'Theater-Film',
                    ]"
                    label="Category"
                    required
                  ></v-select>
                </v-col>
                <v-col cols="12">
                  <v-textarea
                    v-model="description"
                    label="Event Description"
                    auto-grow
                    rows="2"
                    clearable
                  ></v-textarea>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model.number="capacity"
                    label="Capacity"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="price"
                    label="Price"
                    type="number"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" sm="6" md="6">
                  <v-text-field
                    v-model="mapLocation"
                    label="Map Link"
                    required
                  ></v-text-field>
                </v-col>
                <v-col cols="12" class="px-2">
                  <v-combobox
                    v-model="tags"
                    chips
                    clearable
                    label="Event Tags"
                    multiple
                  >
                    <template
                      v-slot:selection="{ attrs, item, select, selected }"
                    >
                      <v-chip
                        v-bind="attrs"
                        :input-value="selected"
                        close
                        @click="select"
                        @click:close="remove(item)"
                      >
                        &nbsp;
                        <v-icon left x-small>mdi-pound</v-icon>
                        <strong>{{ item }}</strong>
                      </v-chip>
                    </template>
                  </v-combobox>
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
  </v-container>
</template>

<script>
import uploadImage from '@/components/uploadImage'

export default {
  components: {
    uploadImage,
  },
  data(vm) {
    return {
      imageURL: '',
      title: '',
      photo: '',
      description: '',
      capacity: '',
      price: '',
      category: '',
      mapLocation: '',
      date: new Date().toISOString().substr(0, 10),
      eventDate: '',
      tags: [],
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
    remove(item) {
      this.tags.splice(this.tags.indexOf(item), 1)
      this.tags = [...this.tags]
    },
    reset() {
      this.$refs.form.reset()
    },
    setImageURL(imageURL) {
      this.imageURL = imageURL
    },
    async create() {
      const getCreator = await this.$axios.$get('/auth/me', {
        headers: { token: localStorage.getItem('token') },
      })

      const data = {
        title: this.title,
        photo: this.imageURL,
        eventDate: this.eventDate,
        description: this.description,
        capacity: parseInt(this.capacity),
        price: parseInt(this.price),
        category: this.category,
        creator: getCreator.id,
      }

      this.$axios
        .$post('/events/me', data, {
          headers: { token: localStorage.getItem('token') },
        })
        .then((response) => {
          if (!response.errors) {
            this.createTags(response._id)
          } else {
            window.alert('Please fill out the form correctly!')
          }
        })
        .catch((err) => console.error(err))
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
    createTags(eventID) {
      this.tags.forEach((tag, idx) => {
        this.$axios
          .$post(
            '/tags/createTag',
            {
              name: tag,
              eventId: eventID,
            },
            {
              headers: { token: localStorage.getItem('token') },
            }
          )
          .then(() => {
            if (idx === this.tags.length - 1) {
              this.$router.push(`/events/me/${eventID}`)
            }
          })
          .catch((err) => console.error(err))
      })
    },
  },
}
</script>
