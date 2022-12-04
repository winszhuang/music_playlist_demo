<script setup lang="ts">
import { 
  NButton,
  NSpace,
  NCard,
  NList,
  NListItem,
  NLayout,
  NLayoutContent,
  NLayoutHeader,
  NLayoutSider
} from 'naive-ui'
import { wsKey } from '../const';
import { useRoute } from 'vue-router';
import { inject, onMounted } from 'vue';
import { useWs } from '../hooks/useWs';
import MusicCard from '../components/MusicCard.vue';

const wsWrapper = useWs();
const route = useRoute();

setTimeout(() => {
  const token = localStorage.getItem('token') || '';
  wsWrapper.send('join-channel', {
    token
  })
}, 1000);

const musicList = [
  {
    name: 'glow',
    author: 'test',
    time: '0423',
  },
  {
    name: 'beautiful',
    author: 'john',
    time: '0532'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
  {
    name: 'love',
    author: 'tina',
    time: '0321'
  },
]

function addMusic() {
  wsWrapper.send('add-music', {
    musicId: 'IAuRoAUV19o'
  })
}

function insertMusic() {
  console.log('insertMusic');
}

function showHistory() {
  console.log('showHistory');
}

</script>

<template>
  <div class=" h-screen flex flex-col">
    <n-layout-header class="p-4">
      header
    </n-layout-header>
    <div class="p-8 flex flex-1">
      <div class=" w-3/5 pr-8 h-full">
        <n-space vertical size="large">
          <n-card class="p-4">
            <MusicCard :item="music" v-for="music in musicList" :key="music.name"/>
          </n-card>
        </n-space>
      </div>
      <div class="flex-1">
        <n-space vertical :size="[16, 24]">
          <n-card>
            頻道名稱
          </n-card>
          <n-button @click="addMusic" class="w-full py-8">
            增加音樂
          </n-button>
          <n-button @click="insertMusic" class="w-full py-8">
            插播音樂申請
          </n-button>
          <n-button @click="showHistory" class="w-full py-8">
            查看點播歷史紀錄
          </n-button>
        </n-space>
      </div>
    </div>
  </div>
</template>