import client from '@/utils/client'

import { defineStore } from 'pinia'
import { Databases, ID } from 'appwrite'
import type { Product } from '@/stores/models/product.model'

export const productStore = defineStore('product', {
  state: () => ({
    product: null
  }),
  getters: {
    getProduct: (state) => state.product
  },
  actions: {
    async createProduct(params: Product) {
      console.log('createProduct', params)
      const databases = new Databases(client)
      const promise = databases.createDocument(
        '6356257a413d594f3139',
        '6356258a74a9528e87e8',
        ID.unique(),
        { ...params }
      )

      return promise.then(
        (Response) => {
          console.log('createProduct', Response) // Success
          return Response
        },
        (Error) => {
          console.log('Error', Error) // Failure
          return Promise.reject(Error.response?.message)
        }
      )
    }
  }
})
