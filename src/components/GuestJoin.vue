<script setup lang="ts">
import { computed, ref } from 'vue'
import {
  NButton, useDialog, NDialog, NDropdown,
  NFormItem,
  NCol,
  NForm,
  NRow,
  NInput,
  FormInst,
  FormItemInst,
  FormItemRule,
  useMessage,
  FormRules,
  NFormItemRow,
  NTabPane,
  NTabs,
  NCard,
  NSelect
} from 'naive-ui'
import { guestJoinChannel } from '../apis/api'
import { router } from '../main'
import { useChannelStore } from '../store/channel.store';
import { storeToRefs } from 'pinia';

interface ModelType {
  name: string | null
  channelPassword: string | null
  channelId: string | null
}

const message = useMessage()
const channelStore = useChannelStore()
const { channelList } = storeToRefs(channelStore)

const guestFormRules: FormRules = {
  name: {
    required: true,
    message: '請輸入姓名',
    trigger: 'blur'
  },
  channelPassword: {
    required: true,
    message: '請輸入頻道密碼',
    trigger: 'blur'
  },
  channelId: {
    message: '請選擇頻道',
    trigger: 'blur'
  }
}
const guestModelRef = ref<ModelType>({
  name: 'test123',
  channelPassword: '',
  channelId: null
})
const formRef = ref<FormInst | null>(null)
const listOptions = computed(() => {
  return channelList.value.map(item => ({
    value: item._id,
    label: item.name,
    key: item._id
    // disabled: item.isLock
  }))
})
const requiredChannelId = computed(() => {
  const currentChannel = channelList.value.find(item => item._id === guestModelRef.value.channelId)
  if (!currentChannel) return false
  return currentChannel.isLock;
})

async function handleSubmit (e: MouseEvent) {
  e.preventDefault()

  try {
    const canSubmit = await validateForm()
    if (!canSubmit) return

    const data = guestModelRef.value as Required<GuestJoinChannelDto>

    const res = (await guestJoinChannel(data)).data
    localStorage.setItem('token', res.token)
    localStorage.setItem('channel', data.channelId)
    router.push(`/channel/${data.channelId}`)
  } catch (error) {
    console.log((error as Error).message)
  }
}

async function validateForm () {
  return new Promise((resolve, reject) => {
    formRef.value?.validate((error) => {
      if (!error) {
        message.success('OK')
        resolve(true)
      } else {
        message.error('fail!')
        resolve(false)
      }
    })
  })
}
</script>

<template>
  <n-form
    ref="formRef"
    :model="guestModelRef"
    :rules="guestFormRules"
    :validate-messages="message"
  >
    <n-form-item label="暱稱" path="name">
      <n-input
        v-model:value="guestModelRef.name"
        placeholder="請輸入email"
      />
    </n-form-item>
    <n-form-item label="頻道" path="channelId">
      <n-select
        v-model:value="guestModelRef.channelId"
        placeholder="Select"
        :options="listOptions"
      />
    </n-form-item>
    <n-form-item label="密碼" path="channelPassword" v-if="requiredChannelId">
      <n-input
        v-model:value="guestModelRef.channelPassword"
        placeholder="請輸入密碼"
      />
    </n-form-item>
  </n-form>
  <n-button
    type="primary"
    block
    secondary
    strong
    @click="handleSubmit"
  >
    進入
  </n-button>
</template>
