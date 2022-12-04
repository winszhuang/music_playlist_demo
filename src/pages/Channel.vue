<script setup lang="ts">
import { 
  NButton,
  NSpace,
  NCard,
  NList,
  NListItem
} from 'naive-ui'
import { wsKey } from '../const';
import { useRoute } from 'vue-router';
import { inject, onMounted } from 'vue';
import { useWs } from '../hooks/useWs';

const wsWrapper = useWs();
const route = useRoute();

setTimeout(() => {
  const token = localStorage.getItem('token') || '';
  wsWrapper.send('join-channel', {
    token
  })
}, 1000);

// onMounted(() => {
// })

const musicList = [
  {
    name: 'glow',
  },
  {
    name: 'beautiful',
  },
  {
    name: 'love',
  },
]


</script>

<template>
  <div>
    <n-space vertical size="large">
      <n-list>
        <n-list-item v-for="music in musicList">
          <n-card :title="music.name">
            卡片内容
          </n-card>
        </n-list-item>
      </n-list>
    </n-space>
    <!-- <n-space vertical>
      <n-card title="小卡片" size="small">
        卡片内容
      </n-card>
      <n-card title="中卡片" size="medium">
        卡片内容
      </n-card>
      <n-card title="大卡片" size="large">
        卡片内容
      </n-card>
      <n-card title="超大卡片" size="huge">
        卡片内容
      </n-card>
    </n-space> -->
  </div>
</template>