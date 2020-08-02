<template>
  <v-card :loading="loading" class="mx-auto my-12" max-width="374">
    <v-img
      height="auto"
      src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?size=626&ext=jpg"
    ></v-img>

    <v-card-title>Electronic Sound Festival</v-card-title>

    <v-card-text>
      <v-row align="center" class="mx-0">
        <v-rating
          :value="4.5"
          color="amber"
          dense
          half-increments
          readonly
          size="14"
        ></v-rating>

        <div class="grey--text ml-4">4.5 (413)</div>
      </v-row>

      <div class="my-4 subtitle-1">
        $10 • Las Palmas de Gran Canaria
      </div>

      <div>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec aliquet
        tincidunt augue, in eleifend augue posuere eu. Morbi porta ultricies
        augue. Suspendisse potenti. Morbi ultrices sapien libero, porta semper
        tellus posuere in. Morbi enim metus, malesuada quis metus sollicitudin,
        pellentesque pharetra dui.
      </div>
    </v-card-text>

    <v-divider class="mx-4"></v-divider>

    <v-card-title>Tonight's availability</v-card-title>

    <v-card-text>
      <v-chip-group
        v-model="selection"
        active-class="deep-purple accent-4 white--text"
        column
      >
        <v-chip>5:30PM</v-chip>

        <v-chip>7:30PM</v-chip>

        <v-chip>8:00PM</v-chip>

        <v-chip>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>

    <v-card-actions>
      <v-btn color="deep-purple lighten-2" text @click="reserve">
        Reserve
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),

  methods: {
    reserve() {
      this.loading = true

      setTimeout(() => (this.loading = false), 2000)
    },
  },
}
</script>
