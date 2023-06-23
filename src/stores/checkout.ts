import { defineStore } from 'pinia'

interface Order {
  id: string | unknown
  name: string
  price: number
  amount: number
  quantity: number
  photo: string | unknown
}

export const useCheckoutStore = defineStore('check', {
  state: () => ({
    items: [] as Order[]
  }),
  getters: {
    getOrder: (state) => state.items
  },
  actions: {
    add(item: Order) {
      this.items.push(item)
    },
    update(items: Order[]) {
      this.items = items
    },
    reset() {
      this.items = []
    }
  }
})
