import { defineStore } from 'pinia'

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: [],
  }),
  getters: {
    totalCount: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
    totalAmount: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
  },
  actions: {
    addItem(product, quantity = 1) {
      const sku = product.sku || 'default'
      const key = `${product.id}_${sku}`
      const exist = this.items.find((item) => item.key === key)

      if (exist) {
        exist.quantity += quantity
      } else {
        this.items.push({
          key,
          id: product.id,
          name: product.name,
          price: product.price,
          image: product.image,
          sku,
          skuLabel: product.skuLabel || '',
          quantity,
        })
      }
    },
    updateQuantity(key, quantity) {
      const item = this.items.find((row) => row.key === key)
      if (!item) return
      if (quantity <= 0) {
        this.removeItem(key)
        return
      }
      item.quantity = quantity
    },
    removeItem(key) {
      this.items = this.items.filter((item) => item.key !== key)
    },
    clear() {
      this.items = []
    },
  },
})
