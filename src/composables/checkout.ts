import { useCheckoutStore } from '@/stores/checkout'
import { computed } from 'vue'

import _ from 'lodash-es'
import { storeToRefs } from 'pinia'

interface OrderItem {
  id: string | unknown
  name: string
  price: number
  amount: number
  quantity: number
  photo: string | unknown
}

export default function useCheckout() {
  const checkoutStore = useCheckoutStore()

  const { getOrder } = storeToRefs(checkoutStore)

  const addItem = (item: OrderItem) => {
    const existItem = _.find(getOrder.value, ['id', item.id])

    if (existItem) {
      if (typeof item.id === 'string') {
        _updateQuantity(item.id, existItem.quantity + 1)
      }
    } else {
      item.amount = item.price * item.quantity
      checkoutStore.add(item)
    }
  }

  const removeItem = (itemId: string) => {
    const items = _.filter(getOrder.value, (p) => p.id !== itemId)

    checkoutStore.update(items)
  }

  const updateQuantityItem = (evt: Event, itemId: string): void => {
    const target = evt.target as HTMLInputElement
    const quantity = Number(target.value)

    if (quantity > 0) {
      _updateQuantity(itemId, quantity)
    } else {
      removeItem(itemId)
    }
  }

  const _updateQuantity = (itemId: string, quantity: number) => {
    const items = _.map(getOrder.value, (p) => {
      if (itemId === p.id) {
        p.quantity = quantity
        p.amount = p.quantity * p.price
      }
      return p
    })

    checkoutStore.update(items)
  }

  const getTotal = computed(() => {
    return _.sumBy(getOrder.value, 'amount')
  })

  return {
    addItem,
    removeItem,
    getTotal,
    updateQuantityItem
  }
}
