import dayjs from 'dayjs'
import useNotification from '@/composables/notification'
import _ from 'lodash-es'

import { useCheckoutStore } from '@/stores/checkout'
import { useOrderStore } from '@/stores/order'
import { useAccountStore } from '@/stores/account'
import { useItemStore } from '@/stores/item'
import { computed, ref, readonly } from 'vue'
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
  const orderStore = useOrderStore()
  const accountStore = useAccountStore()
  const itemStore = useItemStore()

  const { getOrder } = storeToRefs(checkoutStore)
  const { getCurrentUser } = storeToRefs(accountStore)
  const { showNotification } = useNotification()

  const tryTo = ref(false)

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

  const onSubmitCheckout = async () => {
    tryTo.value = true
    if (getOrder.value.length) {
      const responseOrder = await orderStore.createOrder({
        amount: getTotal.value,
        employeeId: String(getCurrentUser.value?.$id),
        createAt: dayjs().format()
      })
      console.log('responseOrder', responseOrder)
      const allItemsPromise: Promise<string | unknown>[] = getOrder.value.map(
        (item) => {
          return itemStore.createItem({
            name: item.name,
            price: item.price,
            quantity: item.quantity,
            amount: item.amount,
            orderId: responseOrder.$id
          })
        }
      )

      await Promise.all(allItemsPromise)
    }

    showNotification({
      title: `Total: $${getTotal.value}`,
      text: `Cambio: $`,
      icon: 'success',
      didClose: () => {
        tryTo.value = false
        checkoutStore.reset()
      }
    })
  }

  return {
    addItem,
    removeItem,
    getTotal,
    updateQuantityItem,
    onSubmitCheckout,
    tryTo: readonly(tryTo)
  }
}
