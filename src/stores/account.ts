import client from '@/utils/client'
import type { AccountState } from '@/stores/models/account.model'

import { defineStore } from 'pinia'
import { Account } from 'appwrite'

export const useAccountStore = defineStore('account', {
  state: () => ({
    user: {} as AccountState
  }),
  getters: {
    getCurrentUser: (state) => state.user
  },
  actions: {
    async fetchAccount() {
      const account = new Account(client)

      const promise = account.get()

      return promise.then(
        (Response) => {
          this.user = Response
          return Response as AccountState
        },
        (Error) => {
          return Promise.reject(Error.response?.message)
        }
      )
    }
  },
  persist: true
})
