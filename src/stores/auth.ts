import client from '@/utils/client'

import type { AuthCredentials, UserAuthState } from '@/stores/models/auth.model'
import { Account } from 'appwrite'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      token: null
    } as UserAuthState),
  getters: {
    loggedIn: (state) => !!state.token
  },
  actions: {
    async login(credentials: AuthCredentials) {
      const account = new Account(client)
      const promise = account.createEmailSession(
        credentials.email,
        credentials.password
      )

      return promise.then(
        (Response) => {
          this.token = Response
          return Response
        },
        (Error) => {
          return Promise.reject(Error.response?.message)
        }
      )
    },
    logOut() {
      this.token = null
    }
  },
  persist: true
})
