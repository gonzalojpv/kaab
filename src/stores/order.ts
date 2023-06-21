import client from '@/utils/client'

import { defineStore } from 'pinia'
import { Databases, ID } from 'appwrite'

const COLLECTION_ID = '6356381d38a6d258ecf2'
const databases = new Databases(client)

interface Order {
  amount: number
  employeeId: string
  createAt: string
}

export const useOrderStore = defineStore('order', {
  state: () => ({
    order: {}
  }),
  getters: {},
  actions: {
    async createOrder(params: Order) {
      const promise = databases.createDocument(
        import.meta.env.VITE_APP_DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { ...params }
      )

      return promise.then(
        (Response) => {
          return Response
        },
        (Error) => {
          return Promise.reject(Error.response?.message)
        }
      )
    }
  }
})
