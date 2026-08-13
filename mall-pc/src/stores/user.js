import { defineStore } from 'pinia'

export const useUserStore = defineStore('user', {
  state: () => ({
    token: '',
    profile: null,
  }),
  getters: {
    isLogin: (state) => Boolean(state.token),
  },
  actions: {
    setUser(profile, token = '') {
      this.profile = profile
      this.token = token
    },
    logout() {
      this.profile = null
      this.token = ''
    },
  },
})
