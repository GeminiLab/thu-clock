<script setup lang="ts">
import Clock from "@/components/Clock.vue";
import WithBackground from "@/components/WithBackground.vue";
import {BackgroundImage} from "@/utils/background";
import {ref} from "vue";

const backgrounds: BackgroundImage[] = [
  {
    url: '/thu-clock/henry-chen-ZwRCXGkv30w-unsplash.jpg',
    author: 'Henry Chen',
    link: 'https://unsplash.com/photos/city-skyline-during-night-time-ZwRCXGkv30w?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
  },
  {
    url: '/thu-clock/nasa-Q1p7bh3SHj8-unsplash.jpg',
    author: 'NASA',
    link: 'https://unsplash.com/photos/photo-of-outer-space-Q1p7bh3SHj8?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
  },
  {
    url: '/thu-clock/henning-witzel-ukvgqriuOgo-unsplash.jpg',
    author: 'Henning Witzel',
    link: 'https://unsplash.com/photos/aerial-photography-of-cityscape-at-night-ukvgqriuOgo?utm_content=creditShareLink&utm_medium=referral&utm_source=unsplash',
  },
];
const backgroundUrls = backgrounds.map(b => b.url);
const currentBackground = ref(0);
</script>

<template>
  <WithBackground v-model:current="currentBackground" :backgrounds="backgroundUrls" :refresh-interval="600000">
    <div class="canvas">
      <div class="clock-wrapper">
        <Clock>
          <p class="background-info"><a :href="backgrounds[currentBackground].link" target="_blank">background image</a> by: {{ backgrounds[currentBackground].author }}</p>
        </Clock>
      </div>
    </div>
  </WithBackground>
</template>

<style scoped>
div.canvas {
  max-width: 720px;
  margin: 0 auto;
  padding: 2rem;
}

div.clock-wrapper {
  padding: 2rem;
  background: var(--color-background-half-opa);
  backdrop-filter: blur(8px);
}

p.background-info {
  text-align: left;
  font-size: x-small;
  a {
    color: var(--color-text);
  }
}
</style>
