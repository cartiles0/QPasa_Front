<template>
  <div>
    <v-app-bar color="primary" dark fixed app elevate-on-scroll>
      <v-toolbar-title>
        <button :to="home" text>{{ title }}</button>
      </v-toolbar-title>
      <v-spacer />
      <!-- <v-btn color="accent" large @click.stop="showLogInForm = true"
        >TEST</v-btn
      > -->
      <v-text-field
        v-model="searchInput"
        class="mt-7 hidden-sm-and-down"
        label="Search"
        :append-icon="'mdi-magnify'"
        filled
        dense
        clearable
        rounded
        outlined
        @click:append="search"
      ></v-text-field>

      <v-spacer />

      <div class="hidden-sm-and-down">
        <v-toolbar-items v-if="userLogged === false">
          <v-btn :to="'/auth/login'" text>
            <v-icon>mdi-account</v-icon> Sign In
          </v-btn>
        </v-toolbar-items>

        <v-menu v-else offset-y>
          <template v-slot:activator="{ on, attrs }">
            <v-avatar v-bind="attrs" height="40px" width="40px" v-on="on">
              <img :src="user.photo" :alt="user.name" />
            </v-avatar>
          </template>
          <v-list>
            <v-list-item icon :to="'/users/me'">
              <v-list-item-title>
                <v-icon>mdi-account</v-icon> {{ user.username }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item icon :to="'events/createEvent'">
              <v-list-item-title>
                <v-icon>mdi-calendar-plus</v-icon> Create Event
              </v-list-item-title>
            </v-list-item>
            <v-list-item icon @click="logout()">
              <v-list-item-title>
                <v-icon>mdi-exit-to-app</v-icon> Log Out
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>

      <div class="text-center hidden-md-and-up">
        <v-menu offset-y>
          <template
            v-if="userLogged === false"
            v-slot:activator="{ on, attrs }"
          >
            <v-btn icon v-bind="attrs" v-on="on">
              <v-icon>mdi-menu</v-icon>
            </v-btn>
          </template>
          <template v-else v-slot:activator="{ on, attrs }">
            <v-avatar v-bind="attrs" height="35px" width="35px" v-on="on">
              <img :src="user.photo" :alt="user.name" />
            </v-avatar>
          </template>

          <v-list v-if="userLogged === false">
            <v-text-field
              v-model="searchInput"
              class="px-2 mb-0 pb-0"
              label="Search"
              :append-icon="'mdi-magnify'"
              filled
              dense
              rounded
              clearable
              outlined
              @click:append="search"
            ></v-text-field>
            <v-divider class="px-2"></v-divider>
            <v-list-item icon :to="'/auth/login'">
              <v-list-item-title>
                <v-icon>mdi-account</v-icon> Sign In
              </v-list-item-title>
            </v-list-item>
          </v-list>

          <v-list v-else>
            <v-text-field
              v-model="searchInput"
              class="px-2 mb-0 pb-0"
              label="Search"
              :append-icon="'mdi-magnify'"
              filled
              outlined
              dense
              clearable
              rounded
              @click:append="search"
            ></v-text-field>
            <v-divider class="px-2"></v-divider>
            <v-list-item icon :to="'/users/me'">
              <v-list-item-title>
                <v-icon>mdi-account</v-icon> {{ user.username }}
              </v-list-item-title>
            </v-list-item>
            <v-list-item icon :to="'events/createEvent'">
              <v-list-item-title>
                <v-icon>mdi-calendar-plus</v-icon> Create Event
              </v-list-item-title>
            </v-list-item>
            <v-list-item icon @click="logout()">
              <v-list-item-title>
                <v-icon>mdi-exit-to-app</v-icon> Log Out
              </v-list-item-title>
            </v-list-item>
          </v-list>
        </v-menu>
      </div>
    </v-app-bar>
    <!-- <v-main>
      <login :visible="showLogInForm" @close="showLogInForm = false" />
    </v-main> -->
  </div>
</template>

<script>
import login from '@/components/login3'

export default {
  component: {
    login,
  },
  props: {
    title: {
      type: String,
      default: 'QPasa',
    },
  },
  data() {
    return {
      user: {},
      searchInput: '',
      showLogInForm: false,
      userLogged: false,
      home: '/',
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
    search() {
      window.location.href = `/events/search/${this.searchInput}`
    },
    logout() {
      localStorage.clear()
      window.location.href = '/'
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

<style>
.v-input__control {
  padding-bottom: 0;
  margin-bottom: 0;
  height: 55px;
}
</style>
