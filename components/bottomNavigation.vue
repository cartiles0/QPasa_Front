<template>
  <div class="pt-2">
    <div v-if="userLogged === false">
      <v-btn @click="goHome">
        <span>EXPLORE</span>
        <v-icon>mdi-pound</v-icon>
      </v-btn>

      <v-btn @click="goLogIn">
        <span>SAVED</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn @click="goSignUp">
        <span>SIGN UP</span>
        <v-icon>mdi-account</v-icon>
      </v-btn>
    </div>

    <div v-else>
      <v-btn class="px-1" @click="goHome">
        <span>EXPLORE</span>
        <v-icon>mdi-pound</v-icon>
      </v-btn>

      <v-btn class="px-1" @click="goToSaved">
        <span>SAVED</span>
        <v-icon>mdi-heart</v-icon>
      </v-btn>

      <v-btn class="px-1" @click="goToMyTickets">
        <span>MY TICKETS</span>
        <v-icon>mdi-ticket</v-icon>
      </v-btn>

      <v-btn class="px-1" @click="goProfile">
        <span>PROFILE</span>
        <v-avatar height="30px" width="30px">
          <img :src="user.photo" :alt="user.name" />
        </v-avatar>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      searchInput: '',
      showLogInForm: false,
      userLogged: false,
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.userLogged = true
      this.getUser()
    } else {
      this.userLogged = false
    }
  },
  methods: {
    goHome() {
      this.$router.push(`/`)
    },
    goLogIn() {
      this.$router.push(`/auth/login`)
    },
    goSignUp() {
      this.$router.push(`/auth/signup`)
    },
    goToSaved() {
      this.$router.push(`/users/me/savedEvents`)
    },
    goToMyTickets() {
      this.$router.push(`/users/me/attendingEvents`)
    },
    goProfile() {
      this.$router.push(`/users/me`)
    },
    logged() {
      if (!localStorage.getItem('token')) {
        return (this.userLogged = false)
      } else {
        this.userLogged = true
      }
      return this.userLogged
    },
    async getUser() {
      const dbUser = await this.$axios.$get('/users/me', {
        headers: { token: localStorage.getItem('token') },
      })

      this.user = {
        username: dbUser.username,
        name: dbUser.name[0],
        photo: dbUser.photo,
      }
    },
  },
}
</script>
