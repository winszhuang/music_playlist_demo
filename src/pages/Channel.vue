<script setup lang="ts">
import { 
  NButton,
  NSpace,
  NCard,
  NLayoutHeader,
  NPagination
} from 'naive-ui'
import { computed, ref, onActivated, watch } from 'vue';
import { useWs } from '../hooks/useSocketio'
import MusicCard from '../components/MusicCard.vue';
import SearchMusicDialog from '../components/SearchMusicDialog.vue';
import AuditMusicDialog from '../components/AuditMusicDialog.vue';
import HistoryDialog from '../components/HistoryDialog.vue';
import { useUserStore } from '../store/user.store';
import { storeToRefs } from 'pinia';
import YoutubePlayer from '../components/YoutubePlayer.vue'

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)
const { ws } = useWs<WsEventOptions>();
const youtubePlayerRef = ref<InstanceType<typeof YoutubePlayer> | null>(null)

const isShowAddMusicDialog = ref(false)
const isShowInsertMusicDialog = ref(false)
const isShowAuditMusicDialog = ref(false)
const isShowHistoryDialog = ref(false)

const musicList = ref<MusicDataDetail[]>([])
const historyList = ref<MusicDataDetail[]>([])
const auditedList = ref<AuditedMusicData[]>([])
const currentPlayId = computed(() => musicList.value?.[0]?.musicId || '')
const roleName = computed(() => {
  if (!userInfo.value) return ''
  if (userInfo.value.roleId === 0) return '系統管理員'
  if (userInfo.value.roleId === 1) return '我是DJ'
  if (userInfo.value.roleId === 2) return '一般使用者'
  if (userInfo.value.roleId === 3) return '訪客'
  return ''
})
const currentPlay = ref<{
  _id: string;
  musicId: string;
}>({})
const pagination = ref({
  pageIndex: 1,
  pageCount: 10
})

userStore.fetchUserInfo()

ws.on('update-playlist', (data) => {
  console.log('update-playlist');
  musicList.value = data
})
ws.on('update-history', (data) => {
  // 不是同一頁不更新
  if (pagination.value.pageIndex !== data.pageIndex) return;
  console.log(data);
  historyList.value = data.list
  pagination.value.pageCount = data.pageCount
})
ws.on('update-current-time', async (data) => {
  if (userInfo.value?.roleId === 1) return
  await youtubePlayerRef.value?.seekTo(Number(data.time))
})
// only for dj
ws.on('update-audited-list', (data) => {
  console.log('update-audited-list');
  console.log(data);
  auditedList.value = data
})

ws.on('connect', () => {
  console.log('連上瞜');
  joinChannel()
})

onActivated(() => {
  setTimeout(() => {
    const token = localStorage.getItem('token') || '';
    ws.emit('join-channel', {
      token
    })
  }, 1000);
})

watch(() => pagination.value.pageIndex, (index) => {
  ws.emit('set-page-index-of-history', { pageIndex: index })
})

const stop = watch(() => musicList.value?.[0], (curr, prev) => {
  if (userInfo.value?.roleId !== 1) {
    stop();
    return;
  }

  if (!curr) return;

  if (prev?._id && curr._id === prev._id) return;

  handleUpdateCurrentTime()
})

function joinChannel() {
  const token = localStorage.getItem('token') || '';
  ws.emit('join-channel', {
    token
  })
}

async function handleUpdateCurrentTime() {
  const test = await youtubePlayerRef.value?.currentTime()
  if (test === 0) {
    console.log('強制播放');
    await youtubePlayerRef.value?.play()
  }
  ws.emit('update-current-time', { time: test ? Number(test) : 0 })
  setTimeout(() => {
    handleUpdateCurrentTime()
  }, 10000)
}

function endMusic() {
  const nextMusic = musicList.value?.[1]
    ? { _id: musicList.value[1]._id }
    : null
  console.log(`準備更新的音樂為${musicList.value?.[1]?.name}`);
  ws.emit('update-current-music', nextMusic)
}

function deleteMusic(id: string) {
  ws.emit('delete-music', ({ _id: id }))
}

function likeMusic(musicId: string) {
  ws.emit('like', { musicId })
}

function unlikeMusic(musicId: string) {
  ws.emit('unlike', { musicId })
}

function addMusic(musicId: string) {
  ws.emit('add-music', { musicId })
}

function applyToInsertMusic(musicId: string) {
  ws.emit('apply-to-insert-music', { musicId })
}

function buffering() {
  console.warn('buffering');
}

function addMusicFromHistory(id: string, musicId: string) {
  ws.emit('add-music-from-history', { _id: id, musicId })
}

function likeMusicFromHistory(id: string, musicId: string) {
  ws.emit('like-music-from-history', { musicId })
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
      <section class="w-3/5 pr-8 h-full">
        <div class=" mb-4">
          <h2 class=" text-xl mb-2 text-white">Music</h2>
          <n-space vertical size="large">
            <n-card class="p-4">
              <MusicCard 
                :item="music" v-for="(music, index) in musicList" 
                :key="music.name"
                :index="index"
                @delete="deleteMusic(music._id)"
                @like="likeMusic(music.musicId)"
                @unlike="unlikeMusic(music.musicId)"
              />
            </n-card>
          </n-space>
        </div>
      </section>
      <div class="flex-1">
        <n-space vertical :size="[16, 24]">
          <n-card>
            頻道名稱
          </n-card>
          <n-button @click="(isShowAddMusicDialog = true)" class="w-full py-8">
            增加音樂
          </n-button>
          <n-button
            @click="(isShowInsertMusicDialog = true)" 
            class="w-full py-8 relative"
          >
            插播音樂申請
          </n-button>
          <n-button
            v-if="userInfo?.roleId === 1 || userInfo?.roleId === 0"
            class="w-full py-8 relative"
            @click="isShowAuditMusicDialog = true"
          >
            <div
              v-if="auditedList?.length"
              class=" absolute -top-1 -left-1 bg-red-700 w-6 h-6 rounded-full flex items-center justify-center">
              {{ auditedList?.length }}
            </div>
            審核插播音樂
          </n-button>
          <n-button
            @click="(isShowHistoryDialog = true)" 
            class="w-full py-8"
          >
            查看點播歷史紀錄
          </n-button>
          <!-- {{ musicList }} -->
        </n-space>
      </div>
    </div>
    <div>
      <YoutubePlayer
        ref="youtubePlayerRef"
        :src="`https://www.youtube.com/watch?v=${currentPlayId}`" 
        @ended="endMusic" 
        @buffering="buffering"
      />
    </div>
  </div>
  <SearchMusicDialog 
    title="Add Music" v-model:isShow="isShowAddMusicDialog"
    @addMusic="addMusic"
  />
  <SearchMusicDialog 
    title="Insert Music" v-model:isShow="isShowInsertMusicDialog"
    @addMusic="applyToInsertMusic"
  />
  <AuditMusicDialog 
    v-model:isShow="isShowAuditMusicDialog"
    :auditedList="auditedList"
  />
  <HistoryDialog
    title="歷史紀錄"
    v-model:isShow="isShowHistoryDialog"
    :list="historyList"
  >
    <template #suffix="{ item }">
      <div class="flex space-x-3">
        <n-button
          :disabled="!!item.canBeReAddedTime"
          @click="addMusicFromHistory(item._id, item.musicId)"
        >
          {{  item.canBeReAddedTime ? '已加入' : '加入目前歌單'  }}
        </n-button>
        <n-button
          v-if="userInfo?.roleId === 1"
          :disabled="!!item.likes[userInfo._id]"
          @click="likeMusicFromHistory(item._id, item.musicId)"
        >
          {{  item.likes[userInfo?._id] ? '已在常用歌單' : '加入常用歌單' }}
        </n-button>
      </div>
    </template>
    <template #bottom>
      <n-pagination 
        v-model:page="pagination.pageIndex" 
        :page-count="pagination.pageCount" 
      />
    </template>
  </HistoryDialog>
</template>