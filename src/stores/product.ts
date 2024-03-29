import client from '@/utils/client'

import { defineStore } from 'pinia'
import { Databases, ID, Query } from 'appwrite'
import type { Product } from '@/stores/models/product.model'

const COLLECTION_ID = '6356258a74a9528e87e8'
const databases = new Databases(client)

export const useProductStore = defineStore('product', {
  state: () => ({
    product: null as Product | null,
    products: [] as Array<Product>
  }),
  getters: {
    getProduct: (state) => state.product,
    getAllProducts: (state) => state.products
  },
  actions: {
    async createProduct(params: Product) {
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
    },
    async fetchProducts() {
      const promise = databases.listDocuments(
        import.meta.env.VITE_APP_DATABASE_ID,
        COLLECTION_ID
      )
      return promise.then(
        (Response) => {
          const { documents } = Response
          this.products = documents as unknown as Array<Product>
          return Response
        },
        function (Error) {
          return Promise.reject(Error.response?.message)
        }
      )
    },
    async fetchProduct(documentId: string) {
      const promise = databases.getDocument(
        import.meta.env.VITE_APP_DATABASE_ID,
        COLLECTION_ID,
        documentId
      )
      return promise.then(
        (Response) => {
          this.product = Response as unknown as Product
          return Response
        },
        (Error) => {
          return Promise.reject(Error.response?.message)
        }
      )
    },
    async updateProduct(params: Product, documentId: string) {
      const promise = databases.updateDocument(
        import.meta.env.VITE_APP_DATABASE_ID,
        COLLECTION_ID,
        documentId,
        params
      )

      return promise.then(
        (Response) => {
          return Response
        },
        (Error) => {
          return Promise.reject(Error.response?.message)
        }
      )
    },
    async searchProduct(q: string) {
      const promise = databases.listDocuments(
        import.meta.env.VITE_APP_DATABASE_ID,
        COLLECTION_ID,
        [Query.search('name', q)]
      )

      return promise.then(
        (Response) => {
          this.products = Response.documents as unknown as Array<Product>
          return Response
        },
        (Error) => {
          return Promise.reject(Error.response?.message)
        }
      )
    }
  }
})
