<template>
  <v-app-bar app>
    <v-toolbar-title v-text="title" />
    <v-spacer />
    <div class="text-center">
      <v-menu offset-y>
        <template v-slot:activator="{ on, attrs }">
          <v-btn icon v-bind="attrs" v-on="on">
            <v-icon>mdi-menu</v-icon>
          </v-btn>
        </template>
        <v-list v-if="userLogged === true">
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
        { title: 'Create Account', logo: 'mdi-account', to: 'signup' },
        { title: 'Log In', logo: 'mdi-account', to: 'login' },
        { title: 'Search', logo: 'mdi-magnify' },
        { title: 'Categories', logo: 'mdi-flag' },
      ],
      itemsLogged: [
        { title: 'My Profile', logo: 'mdi-account', to: 'createEvent' },
        { title: 'Create Event', logo: 'mdi-calendar-plus', to: 'createEvent' },
        { title: 'Search', logo: 'mdi-magnify' },
        { title: 'Categories', logo: 'mdi-flag' },
        { title: 'Log Out', logo: 'mdi-exit-to-app' },
      ],
    }
  },
  computed() {
    return {
      logged() {
        if (!localStorage.getItem('token')) {
          this.userLogged = false
        } else {
          this.userLogged = true
        }
        return this.userLogged
      },
    }
  },
}
</script>
