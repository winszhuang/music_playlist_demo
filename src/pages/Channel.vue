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
  NLayoutSider,
  NDialog
} from 'naive-ui'
import { wsKey } from '../const';
import { useRoute } from 'vue-router';
import { computed, inject, onMounted, ref } from 'vue';
import { useWs } from '../hooks/useWs';
import MusicCard from '../components/MusicCard.vue';
import SearchMusicDialog from '../components/SearchMusicDialog.vue';
import { useUserStore } from '../store/user.store';
import { storeToRefs } from 'pinia';

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const wsWrapper = useWs();
const route = useRoute();
const isShowAddMusicDialog = ref(false)
const isShowInsertMusicDialog = ref(false)
const roleName = computed(() => {
  if (!userInfo.value) return ''
  if (userInfo.value.roleId === 0) return '系統管理員'
  if (userInfo.value.roleId === 1) return 'DJ'
  if (userInfo.value.roleId === 2) return '一般使用者'
  if (userInfo.value.roleId === 3) return '訪客'
  return ''
})

userStore.fetchUserInfo()

setTimeout(() => {
  const token = localStorage.getItem('token') || '';
  wsWrapper.send('join-channel', {
    token
  })
}, 1000);

const musicList = ref<MusicData[]>([])

wsWrapper.on('update-playlist', (data: UpdatePlayListEventData) => {
  musicList.value = data
})

function addMusic(musicId: string) {
  wsWrapper.send('add-music', { musicId })
}

function insertMusic(musicId: string) {
  wsWrapper.send('insert-music', { musicId })
  console.log('insertMusic');
}

function showHistory() {
  console.log('showHistory');
}

</script>

<template>
  <div class=" h-screen flex flex-col">
    <n-layout-header class="px-8 py-4 flex">
      ------
      <div class="ml-auto">
        <div class=" text-sm">
          {{ roleName }}
        </div>
        <div class=" text-lg font-bold">
          {{ userInfo?.name }}
        </div>
      </div>
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
          <n-button @click="(isShowAddMusicDialog = true)" class="w-full py-8">
            增加音樂
          </n-button>
          <n-button @click="(isShowInsertMusicDialog = true)" class="w-full py-8">
            插播音樂申請
          </n-button>
          <n-button @click="showHistory" class="w-full py-8">
            查看點播歷史紀錄
          </n-button>
        </n-space>
      </div>
    </div>
  </div>
  <SearchMusicDialog 
    title="Add Music" v-model:isShow="isShowAddMusicDialog"
    @addMusic="addMusic"
  />
  <SearchMusicDialog 
    title="Insert Music" v-model:isShow="isShowInsertMusicDialog"
    @addMusic="insertMusic"
  />
</template>