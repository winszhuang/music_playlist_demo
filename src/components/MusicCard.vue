<script setup lang="ts">
import { NDivider } from 'naive-ui';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import { useUserStore } from '../store/user.store';

const props = defineProps<{ 
  item: MusicDataDetail,
  index: number
}>();

const emit = defineEmits(["delete", "like", "unlike"]);

const userStore = useUserStore()
const { userInfo } = storeToRefs(userStore)

const time = computed(() => {
  const t = props.item.duration.replace('PT', '')
  return t.replace('M', '分').replace('S', '秒')
})
</script>

<template>
  <div 
  v-if="item._id"
  class="p-2 flex items-center border hover:bg-slate-100 active:bg-slate-300 space-x-4">
    <div class=" w-8 mr-4 pl-2 text-red" v-if="item.insert && index !== 0">
      插
    </div>
    <div class="w-8 pl-2" v-else>
      {{ ' ' }}
    </div>
    <div class="flex-1">
      <section>
        <h3 class=" text-xl font-bold mb-1">
          {{ item.name }}
        </h3>
        <span>
          {{ item.author }}
        </span>
        <div class=" text-xs opacity-40">
          {{ item._id }}
        </div>
      </section>
    </div>
    <div class="w-15">
      {{ time }}
    </div>
    <div
      v-if="userInfo?.roleId === 1" 
      class=" cursor-pointer" @click="emit('delete')"
    >
      🗑️
    </div>
    <section class=" cursor-pointer text-xl" v-if="userInfo?._id">
      <div v-if="item.likes[userInfo._id]" @click="emit('unlike')">
        ★
      </div>
      <div v-else @click="emit('like')">
        ☆
      </div>
    </section>
  </div>
</template>