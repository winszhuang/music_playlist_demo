<template>
  <slot/>
</template>

<script setup lang="ts">
import { provide, InjectionKey } from 'vue'
import { wsKey } from '../const'

const ws = new WebSocket('ws://localhost:3000');

ws.onopen = () => {
  setTimeout(() => {
    console.log('456');
    const testData = {
      event: 'test',
      data: {
        test: [
        '我是客戶端丟的資料',
        '123'
        ]
      }
    }
    ws.send(JSON.stringify(testData));
  }, 2000)
  console.log('open connection');
}

ws.onclose = () => {
  console.log('close connection');
}

ws.onmessage = (event) => {
  console.log(event);
}

provide(wsKey, ws);
</script>