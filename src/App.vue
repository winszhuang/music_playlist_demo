<script setup lang="ts">
import {
  NDialogProvider,
  NConfigProvider,
  NMessageProvider,
  darkTheme
} from 'naive-ui'

</script>

<template>
  <n-message-provider>
    <n-config-provider :theme="darkTheme" class="">
      <n-dialog-provider>
        <router-view/>
      </n-dialog-provider>
    </n-config-provider>
  </n-message-provider>
</template>
