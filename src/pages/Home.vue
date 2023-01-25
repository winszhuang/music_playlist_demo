<script setup lang="ts">
import DjLogin from '../components/DjLogin.vue'
import GuestJoin from '../components/GuestJoin.vue'
import {
  NTabPane,
  NTabs,
  NCard,
  NButton,
  NSpace
} from 'naive-ui'
import { useChannelStore } from '../store/channel.store';
import { computed, ref } from 'vue';
import { useUserStore } from '../store/user.store';
import { storeToRefs } from 'pinia';
import { router } from '../main';

const channelStore = useChannelStore()
const userStore = useUserStore()

const { profile } = storeToRefs(userStore)
const canGoToChannelDirectly = ref<boolean>(localStorage.getItem('token') ? true : false)

channelStore.fetchChannelList()
userStore.fetchProfile()


function goChannel() {
  const channelId = profile.value?.channelId
  router.push(`/channel/${channelId}`)
}

function logout() {
  localStorage.removeItem('channel');
  localStorage.removeItem('token');
  canGoToChannelDirectly.value = false
}

</script>

<template>
  <div v-if="canGoToChannelDirectly" class=" p-5">
    <n-space>
      <n-button @click="goChannel" type="primary">
        進入之前的頻道
      </n-button>
      <n-button @click="logout" type="warning">
        登出已有的頻道
      </n-button>
    </n-space>
  </div>
  <n-card v-else>
    <n-tabs
      class="card-tabs"
      default-value="signin"
      size="large"
      animated
      style="margin: 0 -4px"
      pane-style="padding-left: 4px; padding-right: 4px; box-sizing: border-box;"
    >
      <!-- dj -->
      <n-tab-pane name="signin" tab="DJ登入">
        <DjLogin />
      </n-tab-pane>
      <!-- 訪客 -->
      <n-tab-pane name="signup" tab="訪客">
        <GuestJoin />
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>