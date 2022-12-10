<script setup lang="ts">
import { 
  NDialog, 
  NAutoComplete, 
  NButton, 
  NSpace,
  NList,
  NListItem,
  NThing,
  NAvatar,
  NImage
} from 'naive-ui';
import { useDebounceFn, useVModel } from '@vueuse/core'
import { searchMusic } from '../apis/api';
import { computed, ref, watch } from 'vue';
import { useWs } from '../hooks/useWs';
const wsWrapper = useWs();

const props = defineProps<{ 
  isShow: boolean,
  auditedList: AuditedMusicData[]
}>();

const emit = defineEmits(['update:isShow', 'insertMusic']);
const isShow = useVModel(props, 'isShow', emit)

function confirm(id: string) {
  wsWrapper.send('insert-music', { _id: id })
}



// const inputValue = ref('')
// const canSubmit = ref(true)
// const musicList = ref<MusicData[]>([])
// const musicNameList = computed(() => musicList.value.map((item) => item.name))
// const debounceFn = useDebounceFn(async (text: string) => {
//   musicList.value = (await searchMusic(text)).data
//   console.log(musicList.value);
// })

// watch(inputValue, debounceFn)

// function submit() {
//   const currentMusic = musicList.value.find(item => item.name === inputValue.value)
//   emit('addMusic', currentMusic?.musicId)
//   isShow.value = false
// }

</script>

<template>
  <Teleport to="#app" v-if="isShow">
    <div class=" h-screen w-screen absolute top-0 flex px-6 z-200">
      <n-dialog class="min-w-96 " :showIcon="false" @close="isShow = false">
        <h3 class=" text-lg font-bold mb-4">
          申請列表
        </h3>
        <!-- :status="" -->
        <div class="mt-4">
          <n-list bordered>
            <n-list-item 
              v-for="item in auditedList"
              :key="item._id"
            >
              <!-- <template #prefix>
                <n-button>Prefix</n-button>
              </template> -->
              <template #suffix>
                <n-button @click="confirm(item._id)">審核</n-button>
              </template>
              <template #footer>
                fff
              </template>
              <n-thing 
                :title="item.name"
                :description="item.duration"
              >
                <template v-if="item.thumbnail" #avatar>
                  <n-image
                    width="80"
                    :src="item.thumbnail"
                  />
                </template>
              </n-thing>
            </n-list-item>
          </n-list>
        </div>
      </n-dialog>
    </div>
  </Teleport>
</template>