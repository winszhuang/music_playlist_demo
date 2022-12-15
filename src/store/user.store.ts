import { defineStore } from 'pinia';
import { readonly, shallowReactive, toRefs } from 'vue';
import { getMe, profile } from '../apis/api';

export const useUserStore = defineStore('user', () => {
  const state = shallowReactive({
    userInfo: null as UserInfo | null,
    profile: null as Profile | null
  })

  const fetchUserInfo = async () => {
    const data = await getMe()

    if (data) {
      state.userInfo = data.data
    }
  }

  const fetchProfile = async () => {
    const data = await profile()

    if (data) {
      state.profile = data.data
    }
  }

  return {
    ...toRefs(readonly(state)),
    fetchUserInfo,
    fetchProfile
  }
})