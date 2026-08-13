import { defineStore } from 'pinia'

const USER_STORAGE_KEY = 'mall-pc-user'

function loadUser() {
  try {
    const raw = localStorage.getItem(USER_STORAGE_KEY)
    const data = raw ? JSON.parse(raw) : null
    if (!data || typeof data !== 'object') {
      return { token: '', profile: null }
    }
    return {
      token: data.token || '',
      profile: data.profile || null,
    }
  } catch {
    return { token: '', profile: null }
  }
}

function saveUser(state) {
  localStorage.setItem(
    USER_STORAGE_KEY,
    JSON.stringify({
      token: state.token,
      profile: state.profile,
    }),
  )
}

export const useUserStore = defineStore('user', {
  state: () => loadUser(),
  getters: {
    isLogin: (state) => Boolean(state.token),
    displayName: (state) => state.profile?.username || '用户',
  },
  actions: {
    setUser(profile, token = '') {
      this.profile = profile
      this.token = token
      saveUser(this.$state)
    },
    login(profile, token) {
      this.setUser(profile, token)
    },
    logout() {
      this.profile = null
      this.token = ''
      localStorage.removeItem(USER_STORAGE_KEY)
    },
  },
})
