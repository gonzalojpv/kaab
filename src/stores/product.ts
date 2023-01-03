import client from '@/utils/client'

import { defineStore } from 'pinia'
import { Databases, ID } from 'appwrite'
import type { Product } from '@/stores/models/product.model'

export type RootState = {
  product: Product | null
  products: Product[]
}

const COLLECTION_ID = '6356258a74a9528e87e8'

export const useProductStore = defineStore('product', {
  state: () =>
    ({
      product: null,
      products: []
    } as RootState),
  getters: {
    getProduct: (state) => state.product,
    getAllProducts: (state) => state.products
  },
  actions: {
    async createProduct(params: Product) {
      const databases = new Databases(client)
      const promise = databases.createDocument(
        import.meta.env.VITE_APP_DATABASE_ID,
        COLLECTION_ID,
        ID.unique(),
        { ...params }
      )

      return promise.then(
        (Response) => {
          console.log('createProduct', Response) // Success
          return Response
        },
        (Error) => {
          return Promise.reject(Error.response?.message)
        }
      )
    },
    async fetchProducts() {
      const databases = new Databases(client)
      const promise = databases.listDocuments(
        import.meta.env.VITE_APP_DATABASE_ID,
        COLLECTION_ID
      )
      return promise.then(
        (Response) => {
          console.log('fetchProducts', Response) // Success
          this.products = Response.documents
          return Response
        },
        function (Error) {
          return Promise.reject(Error.response?.message)
        }
      )
    }
  }
})
