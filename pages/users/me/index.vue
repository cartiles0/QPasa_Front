<template>
  <div>
    <v-card class="mx-auto my-5 justify-center elevation-0" max-width="1300px">
      <v-row justify="end">
        <div class="editUserForm">
          <v-row justify="end">
            <v-dialog v-model="dialogEditUser" persistent max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-icon small color="#666666">mdi-account-edit</v-icon>
                <v-btn
                  class="px-0"
                  color="#666666"
                  small
                  dark
                  v-bind="attrs"
                  text
                  v-on="on"
                >
                  Edit Profile
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="headline">Edit Profile</span>
                </v-card-title>
                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editProfile.name"
                          type="name"
                          label="Name"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6">
                        <v-text-field
                          v-model="editProfile.lastName"
                          type="Last Name"
                          label="Last Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-text-field
                          v-model="editProfile.email"
                          type="email"
                          label="Email"
                          required
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12">
                        <v-select
                          v-model="editProfile.areaPreference"
                          :items="[
                            'Las Palmas de Gran Canaria',
                            'Telde',
                            'Agaete',
                            'Agüimes',
                            'Artenara',
                            'Arucas',
                            'Firgas',
                            'Gáldar',
                            'Ingenio',
                            'La Aldea de San Nicolás',
                            'Mogán',
                            'Moya',
                            'San Bartolomé de Tirajana',
                            'Santa Brígida',
                            'Santa Lucía de Tirajana',
                            'Santa María de Guía',
                            'Tejeda',
                            'Teror',
                            'Valleseco',
                          ]"
                          label="Area of Preference"
                        ></v-select>
                      </v-col>
                      <v-col cols="12">
                        <v-textarea
                          v-model="editProfile.aboutMe"
                          label="About Me"
                          auto-grow
                          rows="2"
                          clearable
                        ></v-textarea>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogEditUser = false"
                    >Close</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="updateProfile"
                    >Update</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
        <div class="deleteUser">
          <v-row justify="end">
            <v-dialog v-model="dialogDeleteUser" persistent max-width="390">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="px-9"
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
                  >Are you sure you want to delete your profile?</v-card-title
                >
                <v-card-text
                  >Once your profile is deleted you won't be able to access any
                  of the information any more, and all events you have created
                  will also be deleted forever!.</v-card-text
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn
                    color="blue darken-1"
                    text
                    @click="dialogDeleteUser = false"
                    >Cancel</v-btn
                  >
                  <v-btn color="red darken-1" text @click="deleteUser"
                    >Delete Profile</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-row>
        </div>
      </v-row>

      <v-list-item>
        <v-avatar>
          <img :src="user.photo" :alt="user.name" />
        </v-avatar>
        <v-list-item-content class="ml-4">
          <v-list-item-title class="py-0">
            {{ user.username }}
          </v-list-item-title>
          <v-list-item-title class="py-0"
            >{{ user.name }} {{ user.lastName }}</v-list-item-title
          >
          <v-list-item-subtitle class="py-0 my-0">
            Rating: {{ user.rating }} | {{ user.email }} |
            {{ user.areaPreference }}
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-card-text>
        <v-list-item-title class="py-0 title">
          About Me
        </v-list-item-title>
        <div>{{ user.aboutMe }}</div>
      </v-card-text>

      <v-divider class="mx-4"></v-divider>

      <div class="hidden-sm-and-up">
        <v-list-item-title class="py-2 pl-4 mt-6">
          My Events -
          <v-btn :to="'/users/me/myEvents'" class="pl-0" text color="primary">
            See All
          </v-btn>
        </v-list-item-title>
        <eventCardsPhone :userevent="user.myEvents" />
        <v-list-item-title class="py-2 pl-4 mt-6">
          Attending Events -
          <v-btn
            :to="'/users/me/attendingEvents'"
            class="pl-0"
            text
            color="primary"
          >
            See All
          </v-btn>
        </v-list-item-title>
        <eventCardsPhone :userevent="user.attendingEvents" />
        <v-list-item-title class="py-2 pl-4 mt-6">
          Saved Events -
          <v-btn
            :to="'/users/me/savedEvents'"
            class="pl-0"
            text
            color="primary"
          >
            See All
          </v-btn>
        </v-list-item-title>
        <eventCardsPhone :userevent="user.savedEvents" />
      </div>

      <div class="hidden-xs-only">
        <v-list-item-title class="py-2 pl-4 mt-6">
          My Events -
          <v-btn :to="'/users/me/myEvents'" class="pl-0" text color="primary">
            See All
          </v-btn>
        </v-list-item-title>
        <eventCards :userevent="user.myEvents" />
        <v-list-item-title class="py-2 pl-4 mt-6">
          Attending Events -
          <v-btn
            :to="'/users/me/attendingEvents'"
            class="pl-0"
            text
            color="primary"
          >
            See All
          </v-btn>
        </v-list-item-title>
        <eventCards :userevent="user.attendingEvents" />
        <v-list-item-title class="py-2 pl-4 mt-6">
          Saved Events -
          <v-btn
            :to="'/users/me/savedEvents'"
            class="pl-0"
            text
            color="primary"
          >
            See All
          </v-btn>
        </v-list-item-title>
        <eventCards :userevent="user.savedEvents" />
      </div>
    </v-card>
  </div>
</template>

<script>
// import eventCarousel from '@/components/userProfileCarousel'
import eventCards from '@/components/userProfileCards'
import eventCardsPhone from '@/components/userProfileCardsPhone'

export default {
  components: {
    // eventCarousel,
    eventCards,
    eventCardsPhone,
  },
  async asyncData({ $axios, params }) {
    const headers = { headers: { token: localStorage.getItem('token') } }
    const dbUser = await $axios.get(`/users/me`, headers)
    return {
      user: {
        name: dbUser.data.name,
        lastName: dbUser.data.lastName,
        username: dbUser.data.username,
        email: dbUser.data.email,
        photo: dbUser.data.photo,
        areaPreference: dbUser.data.areaPreference,
        address: dbUser.data.address,
        rating: dbUser.data.rating,
        aboutMe: dbUser.data.aboutMe,
        myEvents: dbUser.data.myEvents,
        savedEvents: dbUser.data.savedEvents,
        attendingEvents: dbUser.data.attendingEvents,
        id: dbUser.data._id,
      },
      editProfile: {
        name: dbUser.data.name,
        lastName: dbUser.data.lastName,
        email: dbUser.data.email,
        areaPreference: dbUser.data.areaPreference,
        aboutMe: dbUser.data.aboutMe,
      },
    }
  },
  data() {
    return {
      dialogEditUser: false,
      dialogDeleteUser: false,
    }
  },
  methods: {
    deleteUser() {
      this.$axios
        .$delete(`/users/me`, {
          headers: { token: localStorage.getItem('token') },
        })
        .then((response) => {
          if (!response.errors) {
            this.dialogDeleteEvent = false
            window.location.href = '/'
            localStorage.clear()
          } else {
            window.alert('The user could not be deleted at this moment, sorry!')
          }
        })
        .catch((err) => console.error(err))
    },
    updateProfile() {
      if (
        !this.editProfile.name === '' ||
        !this.editProfile.lastName === '' ||
        !this.editProfile.email === '' ||
        !this.editProfile.areaPreference === '' ||
        !this.editProfile.aboutMe === ''
      ) {
        const data = {
          name: this.editProfile.name,
          lastName: this.editProfile.lastName,
          email: this.editProfile.email,
          areaPreference: this.editProfile.areaPreference,
          aboutMe: this.editProfile.aboutMe,
        }

        this.$axios
          .$put(`/users/me`, data, {
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
  },
}
</script>

<style>
.title {
  color: black;
}
</style>
