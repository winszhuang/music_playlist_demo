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
  title: string,
  list: MusicDataDetail[]
}>();

const emit = defineEmits(['update:isShow', 'insertMusic']);
const isShow = useVModel(props, 'isShow', emit)

</script>

<template>
  <Teleport to="#app" v-if="isShow">
    <div class=" h-screen w-screen absolute top-0 flex px-6 z-200">
      <n-dialog class="min-w-96 " :showIcon="false" @close="isShow = false">
        <div class=" min-w-[]">
          <h3 class=" text-lg font-bold mb-4">
            {{  props.title  }}
          </h3>
  
          <!-- :status="" -->
          <div class="mt-4">
            <n-list bordered>
              <n-list-item 
                v-for="item in props.list"
                :key="item._id"
              >
                <template #prefix>
                  <slot name="prefix" :item="item"/>
                </template>
                <template #suffix>
                  <slot name="suffix" :item="item"/>
                </template>
                <template #footer>
                  <slot name="footer" :item="item"/>
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
            <slot name="bottom"/>
          </div>
        </div>
      </n-dialog>
    </div>
  </Teleport>
</template>