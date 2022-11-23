<template>
  <slot/>
</template>

<script setup lang="ts">
import { provide } from 'vue'
import { wsKey } from '../const'

const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  console.log('ws open connection');
}

ws.onclose = () => {
  console.log('ws close connection');
}

ws.onmessage = (event) => {
  console.log(event);
}

provide(wsKey, ws);
</script>