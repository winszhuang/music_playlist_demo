<script setup lang="ts">
import { NDivider } from 'naive-ui';
import { computed } from 'vue';

const props = defineProps<{ 
  item: MusicDataDetail,
  index: number
}>();

const time = computed(() => {
  const t = props.item.duration.replace('PT', '')
  return t.replace('M', '分').replace('S', '秒')
})
</script>

<template>
  <div 
  v-if="item._id"
  class="p-2 flex items-center border hover:bg-slate-100 active:bg-slate-300">
    <div class=" w-8 mr-4 pl-2 text-red" v-if="item.insert && index !== 0">
      插
    </div>
    <div class="w-8 mr-4 pl-2" v-else>
      {{ ' ' }}
    </div>
    <div class="flex-1">
      <section>
        <h3 class=" text-xl font-bold">
          {{ item.name }}
        </h3>
        <span>
          {{ item._id }}
        </span>
        <span>
          {{ item.author }}
        </span>
      </section>
    </div>
    <div class="w-15">
      {{ time }}
    </div>
  </div>
</template>