<template>
  <v-carousel hide-delimiters height="370px">
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
    ></v-carousel-item>
  </v-carousel>
</template>

<script>
export default {
  data() {
    return {
      items: [
        {
          src:
            'https://image.freepik.com/free-vector/music-event-banner-template-with-photo_52683-12627.jpg',
        },
        {
          src:
            'https://image.freepik.com/free-vector/music-event-poster-template-with-abstract-shapes_1361-1316.jpg',
        },
        {
          src:
            'https://image.freepik.com/free-vector/music-event-poster-template-with-colorful-shapes_1361-1591.jpg',
        },
        {
          src:
            'https://image.freepik.com/free-vector/modern-music-event-poster-template_1361-1292.jpg',
        },
      ],
    }
  },
}
</script>

<style>
.v-window-item > div > div.v-image__image.v-image__image--cover {
  background-size: cover !important;
}
</style>
