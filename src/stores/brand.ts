import client from '@/utils/client'

import { defineStore } from 'pinia'
import { Databases } from 'appwrite'
import type { Brand } from '@/stores/models/brand.model'

const COLLECTION_ID = '63b51d1e21b543d9dfff'

export const useBrandStore = defineStore('brand', {
  state: () => ({
    brands: [] as Array<Brand>
  }),
  getters: {
    getAllBrands: (state) => state.brands
  },
  actions: {
    async fetchBrands() {
      const databases = new Databases(client)
      const promise = databases.listDocuments(
        import.meta.env.VITE_APP_DATABASE_ID,
        COLLECTION_ID
      )

      return promise.then(
        (Response) => {
          const { documents } = Response
          this.brands = documents as unknown as Array<Brand>
          return Response
        },
        function (Error) {
          return Promise.reject(Error.response?.message)
        }
      )
    }
  }
})
