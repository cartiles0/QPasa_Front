<template>
  <v-app-bar color="primary" dark app elevate-on-scroll>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list v-if="userLogged === false">
          <v-list-item
            v-for="(item, index) in items"
            :key="index"
            icon
            :to="item.to"
          >
            <v-list-item-title>
              <v-icon>{{ item.logo }}</v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
        <v-list v-else>
          <v-list-item
            v-for="(item, index) in itemsLogged"
            :key="index"
            icon
            :to="item.to"
            @click="item.click ? item.click() : null"
          >
            <v-list-item-title>
              <v-icon>{{ item.logo }}</v-icon>
              {{ item.title }}
            </v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
    </div>
  </v-app-bar>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: 'QPasa',
    },
  },
  data() {
    return {
      userLogged: false,
      items: [
        { title: 'Create Account', logo: 'mdi-account', to: '/auth/signup' },
        { title: 'Log In', logo: 'mdi-account', to: '/auth/login' },
        { title: 'Search', logo: 'mdi-magnify' },
      ],
      itemsLogged: [
        { title: 'My Profile', logo: 'mdi-account', to: '/users/me' },
        {
          title: 'Create Event',
          logo: 'mdi-calendar-plus',
          to: 'events/createEvent',
        },
        { title: 'Search', logo: 'mdi-magnify' },
        { title: 'Log Out', logo: 'mdi-exit-to-app', click: this.logout },
      ],
    }
  },
  mounted() {
    if (localStorage.getItem('token')) {
      this.userLogged = true
    } else {
      this.userLogged = false
    }
  },
  methods: {
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
  },
}
</script>
