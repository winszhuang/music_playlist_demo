<script setup lang="ts">
import DjLogin from '../components/DjLogin.vue'
import GuestJoin from '../components/GuestJoin.vue'
import {
  NTabPane,
  NTabs,
  NCard,
} from 'naive-ui'
import { useChannelStore } from '../store/channel.store';

const channelStore = useChannelStore()

channelStore.fetchChannelList()
</script>

<template>
  <n-card>
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