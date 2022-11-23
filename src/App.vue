<script setup lang="ts">
import { 
  NButton, 
  NDialogProvider, 
  NConfigProvider,
  NMessageProvider,
  darkTheme
} from 'naive-ui'
import ProviderWebSocket from './components/ProviderWebSocket.vue';


</script>

<template>
  <ProviderWebSocket>
    <n-message-provider>
      <n-config-provider :theme="darkTheme" class="">
        <n-dialog-provider>
          <router-view/>
        </n-dialog-provider>
      </n-config-provider>
    </n-message-provider>
  </ProviderWebSocket>
</template>

