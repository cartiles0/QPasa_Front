<template>
  <v-card class="mx-auto my-5 justify-center elevation-0" max-width="800px">
    <v-list-item>
      <v-avatar>
        <img :src="user.photo" :alt="user.name" />
      </v-avatar>
      <v-list-item-content class="ml-4">
        <v-list-item-title class="py-0">
          {{ user.username }}
        </v-list-item-title>
        <v-list-item-title class="py-0">{{ user.lastName }}</v-list-item-title>
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
    <v-list-item-title class="py-2 pl-4 mt-6">
      Your Events
    </v-list-item-title>
    <eventCarousel :userevent="user.yourEvents" />
    <v-list-item-title class="py-2 pl-4 mt-6">
      Attending Events
    </v-list-item-title>
    <eventCarousel :userevent="user.attendingEvents" />
    <v-list-item-title class="py-2 pl-4 mt-6">
      Saved Events
    </v-list-item-title>
    <eventCarousel :userevent="user.savedEvents" />
  </v-card>
</template>

<script>
import axios from 'axios'
import eventCarousel from '@/components/userProfileCarousel'

export default {
  components: {
    eventCarousel,
  },
  async asyncData() {
    const headers = { headers: { token: localStorage.getItem('token') } }
    const dbUser = await axios.get(
      'http://localhost:3000/api/users/me',
      headers
    )
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
        yourEvents: dbUser.data.myEvents,
        savedEvents: dbUser.data.savedEvents,
        attendingEvents: dbUser.data.attendingEvents,
        id: dbUser.data._id,
      },
    }
  },
  data() {
    return {}
  },
}
</script>

<style>
.title {
  color: black;
}
</style>
