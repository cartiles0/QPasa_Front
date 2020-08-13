<template>
  <div>
    <v-card class="mx-auto my-5 justified-center elevation-0" max-width="600px">
      <v-row justify="end">
        <div class="editEventForm">
          <v-row justify="end">
            <v-dialog v-model="dialogEditEvent" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-icon small color="#666666">mdi-pencil</v-icon>
                <v-btn
                  class="pl-0 pb-0"
                  color="#666666"
                  small
                  dark
                  v-bind="attrs"
                  text
                  v-on="on"
                >
                  Edit Event
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Create Event</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editEvent.title"
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
                              v-model="editEvent.eventDate"
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
                          v-model="editEvent.photo"
                          label="Event Poster Link"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="editEvent.description"
                          label="Event Description"
                          auto-grow
                          rows="2"
                          clearable
                        ></v-textarea>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model.number="editEvent.capacity"
                          label="Capacity"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="6">
                        <v-text-field
                          v-model="editEvent.price"
                          label="Price"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" m="6" md="6">
                        <v-select
                          v-model="editEvent.category"
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
                    </v-row>
                  </v-container>
                  <small>Please fill out the complete form!</small>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogEditEvent = false"
                    >Close</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="updateEvent"
                    >Update</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
        <div class="deleteEvent">
          <v-row justify="end">
            <v-dialog v-model="dialogDeleteEvent" persistent max-width="390">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="px-8"
                  color="red"
                  dark
                  text
                  small
                  icon
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon>mdi-delete-forever</v-icon>
                </v-btn>
              </template>
              <v-card>
                <v-card-title class="headline"
                  >Are you sure you want to delete this event?</v-card-title
                >
                <v-card-text
                  >Once the event is deleted you won't be able to access it any
                  more.</v-card-text
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogDeleteEvent = false"
                    >Cancel</v-btn
                  >
                  <v-btn color="red darken-1" text @click="deleteEvent"
                    >Delete</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
      </v-row>
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
          {{ event.price }}€ • {{ event.capacity }} Tickets • Las Palmas de Gran
          Canaria
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14074.639034899825!2d-15.44195505!3d28.126397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x44d0e97cbbd0b9f8!2sCentro%20Comercial%20Las%20Arenas!5e0!3m2!1sen!2ses!4v1597263773665!5m2!1sen!2ses"
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
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14074.639034899825!2d-15.44195505!3d28.126397!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x44d0e97cbbd0b9f8!2sCentro%20Comercial%20Las%20Arenas!5e0!3m2!1sen!2ses!4v1597263773665!5m2!1sen!2ses"
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
  </div>
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
      dialogEditEvent: false,
      dialogDeleteEvent: false,
      date: new Date().toISOString().substr(0, 10),
      menu1: false,
      menu2: false,
      event: {},
      editEvent: {},
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
    deleteEvent() {
      this.$axios
        .$delete(`/events/me/${this.$route.params.eventId}`, {
          headers: { token: localStorage.getItem('token') },
        })
        .then((response) => {
          if (!response.errors) {
            this.dialogDeleteEvent = false
            this.$router.push(`/users/me`)
          } else {
            window.alert(
              'The event could not be deleted at this moment, sorry!'
            )
          }
        })
        .catch((err) => console.error(err))
    },
    updateEvent() {
      if (
        !this.editEvent.title === '' ||
        !this.editEvent.description === '' ||
        !this.editEvent.capacity === '' ||
        !this.editEvent.price === '' ||
        !this.editEvent.photo === '' ||
        !this.editEvent.category === '' ||
        !this.editEvent.eventDate === ''
      ) {
        const data = {
          title: this.editEvent.title,
          description: this.editEvent.description,
          capacity: this.editEvent.capacity,
          price: this.editEvent.price,
          photo: this.editEvent.photo,
          category: this.editEvent.category,
          eventDate: this.editEvent.eventDate,
          tags: this.editEvent.tags,
        }

        this.$axios
          .$put(`/events/me/${this.$route.params.eventId}`, data, {
            headers: { token: localStorage.getItem('token') },
          })
          .then((response) => {
            if (!response.errors) {
              this.dialog = false
              location.reload()
            } else {
              window.alert('Please fill out the form correctly!')
            }
          })
          .catch((err) => console.error(err))
      } else {
        window.alert('Please fill out the form correctly!')
      }
    },
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
        daysLeft: 0,
      }
      this.editEvent = {
        title: dbEvent.title,
        description: dbEvent.description,
        capacity: dbEvent.capacity,
        price: dbEvent.price,
        photo: dbEvent.photo,
        category: dbEvent.category,
        eventDate: `${
          dbEvent.eventDate.slice(5, 7) - 1
        }-${dbEvent.eventDate.slice(8, 10)}-${dbEvent.eventDate.slice(0, 4)}`,
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

const dbEvent = await this.$axios.$put(
`/events/me/${this.$route.params.eventId}`, { headers: { token:
localStorage.getItem('token') }, } )
