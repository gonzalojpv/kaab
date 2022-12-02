import client from '@/utils/client'
import type { AccountState } from '@/stores/models/account.model'

import { defineStore } from 'pinia'
import { Account } from 'appwrite'

export const useAccountStore = defineStore('account', {
  state: () =>
    ({
      user: null
    } as AccountState),
  getters: {
    getCurrentUser: (state) => state.user
  },
  actions: {
    async fetchAccount() {
      const account = new Account(client)

      const promise = account.get()

      return promise.then(
        (Response) => {
          console.log('Response', Response)
          this.user = Response
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
