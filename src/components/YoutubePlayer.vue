<script setup lang="ts">
// https://juejin.cn/post/7123426964647444516
import { ref, watch, onMounted, onBeforeUnmount } from "vue";
import youtubePlayer from 'youtube-player'
import type { YouTubePlayer } from 'youtube-player/dist/types';

let player: YouTubePlayer;

const props = defineProps({
  id: { type: String, default: "" },
  src: { type: String, required: true },
  width: { type: Number, default: 0 },
  height: { type: Number, default: 0 }
});

const emit = defineEmits(["ended", "play", "pause"]);

onMounted(() => {
  initPlayer();
  loadPlayer();
});

onBeforeUnmount(() => {
  player && player.destroy();
});

const getVideoId = () => {
  try {
    const url = new URL(props.src);
    return url.searchParams.get("v") || "";
  } catch (error) {
    return "";
  }
};

const initPlayer = () => {
  try {
    player = youtubePlayer(`youtube-${props.id}`, {
      host: "https://www.youtube.com",
      width: props.width,
      height: props.height,
      videoId: getVideoId(),
      playsinline: 1,
      rel: 0
    });
  } catch (error) {
    console.log(error);
  }
};

const loadPlayer = () => {
  try {
    player.loadVideoById(getVideoId());
  } catch (error) {
    console.log(error);
  }
};

const play = () => player && player.playVideo();
const pause = () => player && player.pauseVideo();

// -1（未开始）0（已结束）1（正在播放）2（已暂停）3（正在缓冲）5（视频已插入）
let stateChangeListener: any;
const addStateChange = () => {
  stateChangeListener = player?.on("stateChange", (event) => {
    if (event.data === 0) emit("ended");
    if (event.data === 1) emit("play");
    if (event.data === 2) emit("pause");
  });
};
const removeStateChange = () => {
  if (stateChangeListener) player?.off(stateChangeListener);
};

watch(
  () => props.src,
  () => loadPlayer()
);

defineExpose({ play, pause });
</script>

<template>
  <div class="youtube-video">
    <div :id="'youtube-' + id"></div>
  </div>
</template>

<style lang="css" scoped>
.youtube-video {
  width: 100%;
  overflow: hidden;
}
</style>