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
import { api, djJoinChannel, getChannelList } from '../apis/api'
import { router } from '../main'
import { useChannelStore } from '../store/channel.store';
import { storeToRefs } from 'pinia';

interface ModelType {
  email: string | null
  password: string | null
  channelId: string | null
}

const message = useMessage()
const channelStore = useChannelStore()
const { channelList } = storeToRefs(channelStore)

const djModelRef = ref<ModelType>({
  email: 'wins8888@gmail.com',
  password: 'abcd1234',
  channelId: null
})
const djFormRef = ref<FormInst | null>(null)
const listOptions = computed(() => {
  return channelList.value.map(item => ({
    value: item._id,
    label: item.name,
    key: item._id
    // disabled: item.isLock
  }))
})

const djFormRules: FormRules = {
  email: {
    required: true,
    message: '请输入正確的email格式',
    trigger: 'blur',
    pattern: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/g
  },
  password: [
    {
      required: true,
      message: '请输入密码'
    }
  ],
  channelId: {
    required: true,
    message: '請選擇頻道',
    trigger: 'blur'
  }
}

async function handleDjSubmit (e: MouseEvent) {
  e.preventDefault()

  try {
    const canSubmit = await validateDjForm()
    if (!canSubmit) return

    const data = djModelRef.value as Required<DjJoinChannelDto>

    const res = (await djJoinChannel(data)).data
    localStorage.setItem('token', res.token)
    localStorage.setItem('channel', data.channelId)
    router.push(`/channel/${data.channelId}`)
  } catch (error) {
    console.log((error as Error).message)
  }
}

async function validateDjForm () {
  return new Promise((resolve, reject) => {
    djFormRef.value?.validate((error) => {
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
    ref="djFormRef"
    :model="djModelRef"
    :rules="djFormRules"
    :validate-messages="message"
  >
    <n-form-item label="email" path="email">
      <n-input
        v-model:value="djModelRef.email"
        placeholder="請輸入email"
      />
    </n-form-item>
    <n-form-item label="密碼" path="password">
      <n-input
        v-model:value="djModelRef.password"
        placeholder="請輸入密碼"
      />
    </n-form-item>
    <n-form-item label="頻道" path="channelId">
      <n-select
        v-model:value="djModelRef.channelId"
        placeholder="Select"
        :options="listOptions"
      />
    </n-form-item>
  </n-form>
  <n-button
    type="primary"
    block
    secondary
    strong
    @click="handleDjSubmit"
  >
    登入
  </n-button>
</template>
