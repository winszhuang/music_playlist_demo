<script setup lang="ts">
import { router } from '../main';
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
import { onMounted, inject, ref, computed } from 'vue';
import { api, djJoinChannel, getChannelList } from '../apis/api'
import { ChannelInfoData, DjJoinChannelDto } from '../types/api';

interface ModelType {
  email: string | null
  password: string | null
  channelId: string | null
}

const djFormRef = ref<FormInst | null>(null)
const rPasswordFormItemRef = ref<FormItemInst | null>(null)
const message = useMessage()
const djModelRef = ref<ModelType>({
  email: null,
  password: null,
  channelId: null
})
function validatePasswordStartWith (
  rule: FormItemRule,
  value: string
): boolean {
  return (
    !!djModelRef.value.password &&
    djModelRef.value.password.startsWith(value) &&
    djModelRef.value.password.length >= value.length
  )
}
function validatePasswordSame (rule: FormItemRule, value: string): boolean {
  return value === djModelRef.value.password
}
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
    trigger: 'blur',
  },
}

const guestFormRules: FormRules = {
  name: {
    required: true,
    message: '請輸入姓名',
    trigger: 'blur'
  },
}

const channelList = ref<ChannelInfoData[]>([])
const listOptions = computed(() => {
  return channelList.value.map(item => ({
    value: item._id,
    label: item.name,
    key: item._id,
    // disabled: item.isLock
  }))
})

// function handlePasswordInput() {
//   if (djModelRef.value.reenteredPassword) {
//     rPasswordFormItemRef.value?.validate({ trigger: 'password-input' })
//   }
// }

// function handleValidateButtonClick (e: Event) {
//   e.preventDefault()
//   djFormRef.value?.validate((errors) => {
//     if (!errors) {
//       message.success('验证成功')
//     } else {
//       console.log(errors)
//       message.error('验证失败')
//     }
//   })
// }

async function validateDjForm() {
  return new Promise((resolve, reject) => {
    djFormRef.value?.validate((error) => {
      if (!error) {
        message.success('OK')
        resolve(true);
      } else {
        message.error('fail!')
        resolve(false);
      }
    })
  })
}

async function handleDjSubmit(e: MouseEvent) {
  e.preventDefault();

  try {
    const canSubmit = await validateDjForm();
    if (!canSubmit) return;
  
    const data = djModelRef.value as Required<DjJoinChannelDto>;
  
    const res = (await djJoinChannel(data)).data;
    localStorage.setItem('token', res.token);
    console.log(data.channelId);
    router.push(`/channel/${data.channelId}`);
  } catch (error) {
    console.log((error as Error).message);
  }
  
}

onMounted(async () => {
  console.log('-----------');
  try {
    const data = (await getChannelList()).data;
    channelList.value = [ ...data ];
  } catch (error) {
    console.log((error as Error).message);
  }
})
</script>

<template>
  <!-- <NButton type="primary" @click="send">
    點我測試
  </NButton> -->
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
        {{ djModelRef }}
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
      </n-tab-pane>
      <!-- 訪客 -->
      <n-tab-pane name="signup" tab="訪客">
        <n-form>
          <n-form-item-row label="用户名">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="密码">
            <n-input />
          </n-form-item-row>
          <n-form-item-row label="重复密码">
            <n-input />
          </n-form-item-row>
        </n-form>
        <n-button type="primary" block secondary strong>
          進入
        </n-button>
      </n-tab-pane>
    </n-tabs>
  </n-card>
</template>

<!-- <style lang="scss">
.test {
  position: fixed;
}
</style> -->