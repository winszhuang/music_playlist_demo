import { defineStore } from 'pinia';
import { readonly, shallowReactive, toRefs } from 'vue';
import { getMe } from '../apis/api';

export const useUserStore = defineStore('user', () => {
  const state = shallowReactive({
    userInfo: null as UserInfo | null
  })

  const fetchUserInfo = async () => {
    const data = await getMe()

    if (data) {
      state.userInfo = data.data
    }
  }

  return {
    ...toRefs(readonly(state)),
    fetchUserInfo
  }
})