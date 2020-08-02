<template>
  <v-carousel hide-delimiters>
    <v-carousel-item
      v-for="(item, i) in items"
      :key="i"
      :src="item.src"
      height="100px"
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
