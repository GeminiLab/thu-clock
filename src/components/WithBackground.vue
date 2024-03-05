<script setup lang="ts">
import {defineProps, onMounted, onUnmounted, ref, watch} from 'vue';

interface WithBackgroundProps {
  backgrounds: string[],
  refreshInterval: number,
}

const props = defineProps<WithBackgroundProps>();
const current = defineModel<number>('current');

const myself = ref(null);

function setBackgroundImage(value: number) {
  console.log(`set bg ${value} -> ${props.backgrounds[value]}`)
  myself.value.style['background-image'] = 'url("' + props.backgrounds[value] + '")';
}

watch(current, setBackgroundImage);

let intervalID: number | undefined = undefined;

onMounted(() => {
  if (current.value < 0 || current.value >= props.backgrounds.length) {
    current.value = 0;
    setBackgroundImage(0);
  } else {
    setBackgroundImage(current.value);
  }

  intervalID = setInterval(() => {
    if (current.value + 1 >= props.backgrounds.length) {
      current.value = 0;
    } else {
      current.value = current.value + 1;
    }
  }, props.refreshInterval);
});

onUnmounted(() => {
  if (intervalID != null) {
    clearInterval(intervalID);
  }
});
</script>

<template>
  <div id="withBackgrounds" ref="myself">
    <slot></slot>
  </div>
</template>

<style scoped>
div#withBackgrounds {
  width: 100vw;
  height: 100vh;
  margin: 0;
  padding: 0;
  /* background-image: url("???"); */
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover; /* Resize the background image to cover the entire container */
  transition: background-image 1s ease;
}
</style>