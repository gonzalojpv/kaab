import client from '@/utils/client'

import { defineStore } from 'pinia'
import { Databases, ID } from 'appwrite'

const COLLECTION_ID = '635639b1d7c2100a439b'
const databases = new Databases(client)

interface Item {
  $id?: string
  name: string
  photo?: string
  price: number
  quantity: number
  amount: number
  orderId: string
}

export const useItemStore = defineStore('item', {
  state: () => ({
    items: []
  }),
  getters: {},
  actions: {
    async createItem(params: Item) {
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
