<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { createOrder } from '../api/cart'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()

const submitting = ref(false)
const items = computed(() => cartStore.items)
const totalPrice = computed(() => cartStore.totalPrice)

const submitOrder = async () => {
  if (!userStore.isLogin) {
    ElMessage.warning('请先登录')
    router.push({ path: '/login', query: { redirect: '/checkout' } })
    return
  }
  if (!items.value.length) {
    ElMessage.warning('购物车为空')
    return
  }

  submitting.value = true
  try {
    const userId = userStore.profile?.id
    for (const item of items.value) {
      await createOrder({
        userId,
        productId: item.id,
        quantity: item.quantity,
      })
    }
    cartStore.clearCart()
    ElMessage.success('下单成功')
    router.replace('/')
  } catch {
    // 错误由 request 拦截器提示
  } finally {
    submitting.value = false
  }
}

const goCart = () => {
  router.push('/cart')
}
</script>

<template>
  <div class="checkout-page">
    <h2 class="title">确认订单</h2>

    <el-empty v-if="items.length === 0" description="没有待结算商品">
      <el-button type="primary" @click="goCart">返回购物车</el-button>
    </el-empty>

    <template v-else>
      <el-table :data="items" border>
        <el-table-column label="商品" min-width="320">
          <template #default="{ row }">
            <div class="product-cell">
              <img v-lazy="row.image" :alt="row.name" />
              <div>
                <div class="name">{{ row.name }}</div>
                <div v-if="row.skuLabel" class="sku">{{ row.skuLabel }}</div>
              </div>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="单价" width="140">
          <template #default="{ row }">¥{{ row.price.toFixed(2) }}</template>
        </el-table-column>
        <el-table-column prop="quantity" label="数量" width="100" />
        <el-table-column label="小计" width="140">
          <template #default="{ row }">
            <span class="subtotal">¥{{ (row.price * row.quantity).toFixed(2) }}</span>
          </template>
        </el-table-column>
      </el-table>

      <div class="footer">
        <div class="total">
          应付合计：<span>¥{{ totalPrice.toFixed(2) }}</span>
        </div>
        <el-button @click="goCart">返回购物车</el-button>
        <el-button type="primary" size="large" :loading="submitting" @click="submitOrder">
          提交订单
        </el-button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.checkout-page {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-height: 360px;
}

.title {
  margin: 0 0 20px;
  font-size: 20px;
}

.product-cell {
  display: flex;
  align-items: center;
  gap: 12px;
}

.product-cell img {
  width: 64px;
  height: 64px;
  object-fit: cover;
  border-radius: 4px;
}

.name {
  color: #303133;
}

.sku {
  margin-top: 4px;
  color: #909399;
  font-size: 12px;
}

.subtotal {
  color: #f56c6c;
  font-weight: 600;
}

.footer {
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 12px;
}

.total {
  margin-right: 12px;
  font-size: 16px;
  color: #606266;
}

.total span {
  color: #f56c6c;
  font-size: 24px;
  font-weight: 700;
}
</style>
