<script setup lang="ts">
import { NButton, useDialog, NDialog, NDropdown } from 'naive-ui'
import { onMounted, inject } from 'vue';
import { api } from '../apis/api'
import { wsKey } from '../const'

const ws = inject(wsKey)!;

const options = [
  {
    label: '滨海湾金沙，新加坡',
    key: 'marina bay sands',
    disabled: true
  },
  {
    label: '布朗酒店，伦敦',
    key: "brown's hotel, london"
  },
  {
    label: '亚特兰蒂斯巴哈马，拿骚',
    key: 'atlantis nahamas, nassau'
  },
  {
    label: '比佛利山庄酒店，洛杉矶',
    key: 'the beverly hills hotel, los angeles'
  }
];

const dialog = useDialog();

function send() {
  ws.send(JSON.stringify({
    event: 'test',
    data: 'data給你'
  }))
}

function handleSelect(data: any) {
  console.log(data);
}

onMounted(() => {
  // api.get('')
})
</script>

<template>
  <NButton type="primary" @click="send">
    點我測試
  </NButton>
  <n-dialog
    style="position: fixed"
    class="test"
    title="我是DJ"
    content="你确定"
    negative-text="不确认"
    positive-text="确认"
  >
    <n-dropdown trigger="click" :options="options" @select="handleSelect">
      <n-button>選擇頻道</n-button>
    </n-dropdown>
  </n-dialog>
</template>

<!-- <style lang="scss">
.test {
  position: fixed;
}
</style> -->