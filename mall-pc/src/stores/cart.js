import { defineStore } from 'pinia'

const CART_STORAGE_KEY = 'mall-pc-cart'

function loadCartItems() {
  try {
    const raw = localStorage.getItem(CART_STORAGE_KEY)
    const data = raw ? JSON.parse(raw) : []
    return Array.isArray(data) ? data : []
  } catch {
    return []
  }
}

function saveCartItems(items) {
  localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(items))
}

export const useCartStore = defineStore('cart', {
  state: () => ({
    items: loadCartItems(),
  }),
  getters: {
    totalPrice: (state) =>
      state.items.reduce((sum, item) => sum + item.price * item.quantity, 0),
    totalCount: (state) =>
      state.items.reduce((sum, item) => sum + item.quantity, 0),
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
      this.persist()
    },
    removeItem(key) {
      this.items = this.items.filter((item) => item.key !== key)
      this.persist()
    },
    updateQuantity(key, quantity) {
      const item = this.items.find((row) => row.key === key)
      if (!item) return
      if (quantity <= 0) {
        this.removeItem(key)
        return
      }
      item.quantity = quantity
      this.persist()
    },
    clearCart() {
      this.items = []
      this.persist()
    },
    persist() {
      saveCartItems(this.items)
    },
  },
})
