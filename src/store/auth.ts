import client from '@/utils/client'

import type { AuthCredentials, UserAuthState } from '@/store/models/auth.model'
import { Account } from 'appwrite'
import { defineStore } from 'pinia'

export const useAuthStore = defineStore('auth', {
  state: () =>
    ({
      user: null,
      token: null
    } as UserAuthState),
  getters: {
    loggedIn: (state) => !!state.user
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
          this.user = Response
          console.log('Response', Response)
          return Response
        },
        (Error) => {
          return Promise.reject(Error.response?.message)
        }
      )
    }
  },
  persist: true
})
