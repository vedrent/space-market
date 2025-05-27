import { defineStore } from 'pinia'
import api from '../plugins/axios'

export const useMainStore = defineStore('main', {
  state: () => ({
    // token: '',
    server: 'localhost:5227/api',
    user: null as null | { username: string, balance: number }
  }),
  actions: {
    // setToken(token: string) {
    //   this.token = token
    //   localStorage.setItem('token', token)
    // },
    setServer(server: string) {
      this.server = server
      localStorage.setItem('server', server)
    },
    setUser(user: any) {
      this.user = user
    },
    async fetchUser() {
      const res = await api.get('/profile')
      this.user = res.data
    }
  }
})


