<script setup lang="ts">
import { NDialog, NAutoComplete, NButton, NSpace } from 'naive-ui';
import { useDebounceFn, useVModel } from '@vueuse/core'
import { searchMusic } from '../apis/api';
import { computed, ref, watch } from 'vue';

const props = defineProps<{ 
  title: string,
  isShow: boolean
}>();

const emit = defineEmits(['update:isShow', 'addMusic']);
const isShow = useVModel(props, 'isShow', emit)

const inputValue = ref('')
const canSubmit = ref(true)
const musicList = ref<MusicData[]>([])
const musicNameList = computed(() => musicList.value.map((item) => item.name))
const debounceFn = useDebounceFn(async (text: string) => {
  musicList.value = (await searchMusic(text)).data
  console.log(musicList.value);
}, 2000)

watch(inputValue, debounceFn)

function submit() {
  const currentMusic = musicList.value.find(item => item.name === inputValue.value)
  emit('addMusic', currentMusic?.musicId)
  isShow.value = false
}

</script>

<template>
  <Teleport to="#app" v-if="isShow">
    <div class=" h-screen w-screen absolute top-0 flex">
      <n-dialog class="w-96" :showIcon="false">
        <h3 class=" text-lg font-bold mb-4">
          {{ title }}
        </h3>
        {{ inputValue }}
        <div class="mb-4">
          想聽的音樂
        </div>
        <!-- :status="" -->
        <n-auto-complete
          v-model:value="inputValue"
          type="text" 
          size="large"
          :options="musicNameList"
          placeholder="搜尋音樂關鍵字"
        />
        <div class="mt-4 flex justify-end">
          <n-space>
            <n-button 
              type="primary" 
              secondary
              @click="isShow = false"
            >
              Cancel
            </n-button>
            <n-button 
              type="primary" 
              secondary 
              @click="submit"
              :disabled="!inputValue"
            >
              Add
            </n-button>
          </n-space>
        </div>
      </n-dialog>
    </div>
  </Teleport>
</template>