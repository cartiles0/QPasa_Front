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
        <v-list>
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
      items: [
        { title: 'Create Account', logo: 'mdi-account', to: 'signup' },
        { title: 'Log In', logo: 'mdi-account', to: 'login' },
        { title: 'Create Event', to: 'createEvent' },
        { title: 'Search', logo: 'mdi-magnify' },
        { title: 'Tag', logo: 'mdi-tag' },
        { title: 'Categories', logo: 'mdi-pound' },
      ],
    }
  },
}
</script>
