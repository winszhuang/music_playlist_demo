<script setup lang="ts">
import { NButton, NDialogProvider } from 'naive-ui'
import ProviderWebSocket from './components/ProviderWebSocket.vue';

function login() {
  
}

// const ws = new WebSocket('ws://localhost:3000');

// ws.onopen = () => {
//   setTimeout(() => {
//     console.log('456');
//     const testData = {
//       event: 'test',
//       data: {
//         test: [
//         '我是客戶端丟的資料',
//         '123'
//         ]
//       }
//     }
//     ws.send(JSON.stringify(testData));
//   }, 2000)
//   console.log('open connection');
// }

// ws.onclose = () => {
//   console.log('close connection');
// }

// ws.onmessage = (event) => {
//   console.log(event);
// }

// ws.addEventListener('test', (data) => {
//   console.log(data);
//   console.log('我有監聽到喔');
// })
// This starter template is using Vue 3 <script setup> SFCs
// Check out https://vuejs.org/api/sfc-script-setup.html#script-setup

</script>

<template>
  <ProviderWebSocket>
    <n-dialog-provider>
      <router-view/>
    </n-dialog-provider>
  </ProviderWebSocket>
</template>

