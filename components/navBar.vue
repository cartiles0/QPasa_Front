<template>
  <div>
    <v-app-bar color="white" fixed app elevate-on-scroll>
      <v-toolbar-title class="mx-2" width="90px">
        <v-img
          src="https://firebasestorage.googleapis.com/v0/b/qpasagc.appspot.com/o/Logo-1_Mesa%20de%20trabajo%201.png?alt=media&token=4e64091b-474f-4c2b-b883-8fbba232fece"
          height="75px"
          width="75px"
          class="mr-2"
          @click="goHome()"
        ></v-img>
      </v-toolbar-title>
      <v-spacer />

      <v-text-field
        v-model="searchInput"
        class="mt-7"
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
    </v-app-bar>
  </div>
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
      searchInput: '',
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
