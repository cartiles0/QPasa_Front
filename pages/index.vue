<template>
  <v-layout column justify-center align-center>
    <v-flex xs12 sm8 md6>
      <tagChips />
    </v-flex>
  </v-layout>
</template>

<script>
import tagChips from '../components/tagChips'

export default {
  components: {
    tagChips,
  },
}
</script>
