<template>
  <div class="mx-auto my-5">
    <v-img
      height="auto"
      src="https://img.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg?size=626&ext=jpg"
    ></v-img>

    <v-card-actions class="pb-0">
      <v-btn class="pr-0" color="deep-purple" text>
        Going
      </v-btn>
      <v-btn class="ml-0 pl-0" icon>
        <v-icon>mdi-thumb-up-outline</v-icon>
      </v-btn>
      <v-spacer></v-spacer>
      <v-btn icon>
        <v-icon>mdi-heart-outline</v-icon>
      </v-btn>
      <v-btn icon>
        <v-icon>mdi-share-variant</v-icon>
      </v-btn>
    </v-card-actions>

    <v-card-title class="pb-2 pt-0">Electronic Sound Festival</v-card-title>

    <v-card-text>
      <div>Eventos</div>

      <div class="mb-4 subtitle-1">
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

    <v-card-actions class="justify-end">
      <v-btn color="deep-purple" text>
        Going
      </v-btn>
      <v-btn class="ml-0 pl-0" style="font-size: 10px;" icon>
        <v-icon>mdi-thumb-up-outline</v-icon>
      </v-btn>
    </v-card-actions>
  </div>
</template>

<script>
export default {
  data: () => ({
    loading: false,
    selection: 1,
  }),
}
</script>
