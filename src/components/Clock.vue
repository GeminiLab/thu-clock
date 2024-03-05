<script setup>
import {onMounted, ref} from "vue";
import {midToHMS, midToHMSBin, midToHMSRep, millisecondsInDay} from "@/utils/time-in-day";
import {FpsCounter} from "@/utils/fps-counter";
import {rhythmQuery} from "@/utils/thu-rhythm";

const TIME_UPDATE_INTERVAL = 30;
const EVENT_UPDATE_INTERVAL = 200;
const MILLI_PER_DAY = 24 * 60 * 60 * 1000;

const mid = ref(millisecondsInDay());
const tps = ref("NaN");
const rhy = ref(rhythmQuery(mid.value));
const counter = new FpsCounter(20);

function midToHMSStr(mid) {
  const [h, m, s] = midToHMS(mid);
  return h.toString().padStart(2, '0') + ":" + m.toString().padStart(2, '0') + ":" + s.toString().padStart(2, '0');
}

function midToHMSStrRep(mid) {
  const [h, m, s] = midToHMSRep(mid);
  return h.toString().padStart(1, '0') + ":" + m.toString().padStart(2, '0') + ":" + s.toString().padStart(2, '0');
}

function midToHMSStrBin(mid) {
  const [h, m, s] = midToHMSBin(mid);
  return h.toString(16).toUpperCase() + ":" + m.toString(16).toUpperCase().padStart(2, '0') + ":" + s.toString(16).toUpperCase().padStart(2, '0');
}

function tick() {
  mid.value = millisecondsInDay();
  tps.value = (counter.sample(mid.value) * 1000).toFixed(2);
}

function updateEvent() {
  rhy.value = rhythmQuery(mid.value);
}

onMounted(() => {
  setInterval(tick, TIME_UPDATE_INTERVAL);
  setInterval(updateEvent, EVENT_UPDATE_INTERVAL);
});
</script>

<template>
  <h1>{{ midToHMSStr(mid) }}</h1>
  <h2>{{ midToHMSStrRep(mid) }} - {{ midToHMSStrBin(mid) }}</h2>
  <br/>
  <div class="rhythm">
    <div class="current-event">
      <p>当前：{{ rhy.currentEvent }}</p>
      <div class="current-event-times">
        <p>{{ midToHMSStr((mid - rhy.currentStart + MILLI_PER_DAY) % MILLI_PER_DAY) }}</p>
        <p>{{ midToHMSStr((rhy.nextStart - mid + 999 + MILLI_PER_DAY) % MILLI_PER_DAY) }}</p>
      </div>
    </div>
    <div class="next-event"><p>接下来：{{ rhy.nextEvent }}</p></div>
  </div>
  <p class="tps">avg tps for last 20 ticks: {{ tps }}</p>
  <slot name="default"></slot>
</template>

<style scoped>
h1,h2 {
  text-align: center;
  font-family: 'Nanum Gothic Coding', monospace;
}

h1 {
  font-size: 3rem;
}

div.rhythm {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-top: 1px solid var(--color-border);
}

div.rhythm>*:first-child {
  flex-grow: 1;
}

div.rhythm>* {
  padding: 1em;
}

div.current-event {
  min-width: 14em;
  text-align: center;
  border-right: 1px solid var(--color-border);
}

div.current-event-times {
  display: flex;
  justify-content: space-between;
}

div.next-event {
  min-width: 14em;
  text-align: center;
}

p.tps {
  text-align: left;
  font-size: x-small;
  margin-top: 20px;
}
</style>