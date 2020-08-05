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
    <v-list-item-title class="pb-2">
      Your Events
    </v-list-item-title>
    <yourEvents :yourevent="user.yourEvents" />
    <v-list-item-title class="py-2 mt-6">
      Attending Events
    </v-list-item-title>
    <!-- <attendingEvents :attendingevent="user.attendingEvents" /> -->
    <v-list-item-title class="py-2 mt-6">
      Saved Events
    </v-list-item-title>
    <!-- <savedEvents :savedevent="user.savedEvents" /> -->
  </v-card>
</template>

<script>
// import savedEvents from '@/components/savedEvents'
import yourEvents from '@/components/yourEvents'
// import attendingEvents from '@/components/attendingEvents'

export default {
  components: {
    // savedEvents,
    yourEvents,
    // attendingEvents,
  },
  data() {
    return {
      user: {},
    }
  },
  mounted() {
    this.userLoad()
  },
  methods: {
    async userLoad() {
      const dbUser = await this.$axios.$get('/users/me', {
        headers: { token: localStorage.getItem('token') },
      })
      this.user = {
        name: dbUser.name,
        lastName: dbUser.lastName,
        username: dbUser.username,
        email: dbUser.email,
        photo: dbUser.photo,
        areaPreference: dbUser.areaPreference,
        address: dbUser.address,
        rating: dbUser.rating,
        aboutMe: dbUser.aboutMe,
        yourEvents: dbUser.myEvents,
        savedEvents: dbUser.savedEvents,
        attendingEvents: dbUser.attendingEvents,
        id: dbUser._id,
      }
      console.log(this.user.yourEvents)
    },
  },
}
</script>

<style>
.title {
  color: black;
}
</style>
