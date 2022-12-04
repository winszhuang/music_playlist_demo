import { defineStore } from 'pinia';
import { readonly, shallowReactive, toRefs } from 'vue';
import { getChannelList } from '../apis/api';

export const useChannelStore = defineStore('channel', () => {
  const state = shallowReactive({
    channelList: [] as ChannelInfoData[]
  })

  const fetchChannelList = async () => {
    const data = await getChannelList()

    if (data) {
      state.channelList = data.data
    }
  }

  return {
    ...toRefs(readonly(state)),
    fetchChannelList
  }
})