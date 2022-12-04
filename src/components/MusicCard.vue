<script setup lang="ts">
import { NDivider } from 'naive-ui';

const props = defineProps<{ 
  item: MusicData
}>();
</script>

<template>
  <div class="p-2 flex items-center border hover:bg-slate-100 active:bg-slate-300">
    <div class="w-8 mr-4 pl-2">
      插
    </div>
    <div class="flex-1">
      <section>
        <h3 class=" text-xl font-bold">
          {{ item.name }}
        </h3>
        <span>
          {{ item.author }}
        </span>
      </section>
    </div>
    <div class="w-10">
      {{ item.time }}
    </div>
  </div>
</template>