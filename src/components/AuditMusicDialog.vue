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
  NImage,
  NCheckbox
} from 'naive-ui';
import { useDebounceFn, useVModel } from '@vueuse/core'
import { searchMusic } from '../apis/api';
import { computed, ref, watch } from 'vue';
import { useWs } from '../hooks/useSocketio'

const { ws } = useWs<WsEventOptions>();

const props = defineProps<{ 
  isShow: boolean,
  auditedList: AuditedMusicData[]
}>();

const toTopIdsMap: Record<string, boolean | null> = {};

const emit = defineEmits(['update:isShow', 'insertMusic']);
const isShow = useVModel(props, 'isShow', emit)

function confirm(id: string) {
  const data = [
    {
      _id: id,
      cancel: false,
      top: !!toTopIdsMap[id]
    }
  ]
  sendInsertMusic(data)
}

function reject(id: string) {
  const data = [
    {
      _id: id,
      cancel: true,
      top: !!toTopIdsMap[id]
    }
  ]
  sendInsertMusic(data)
}

function confirmAll() {
  const data = props.auditedList.map(item => {
    return { 
      _id: item._id, 
      cancel: false,
      top: !!toTopIdsMap[item._id]
    }
  })
  sendInsertMusic(data)
}

function sendInsertMusic(data: any) {
  ws.emit('insert-music', data)
}

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
                <div class="flex space-x-3">
                  <n-button @click="confirm(item._id)">審核</n-button>
                  <n-button @click="reject(item._id)">拒絕</n-button>
                  <n-checkbox 
                    size="large" 
                    label="優先" 
                    @update:checked="(isEnable) => toTopIdsMap[item._id] = isEnable"
                  />
                </div>
              </template>
              <template #footer>
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
        <div class="mt-4 text-center">
          <n-button @click="confirmAll">
            一件通過
          </n-button>
        </div>
      </n-dialog>
    </div>
  </Teleport>
</template>