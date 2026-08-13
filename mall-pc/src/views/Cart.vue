<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()

const items = computed(() => cartStore.items)
const totalPrice = computed(() => cartStore.totalPrice)

const onQuantityChange = (row, value) => {
  cartStore.updateQuantity(row.key, value)
}

const removeItem = async (row) => {
  try {
    await ElMessageBox.confirm(`确定删除「${row.name}」吗？`, '提示', {
      type: 'warning',
    })
    cartStore.removeItem(row.key)
    ElMessage.success('已删除')
  } catch {
    // cancelled
  }
}

const checkout = () => {
  if (!items.value.length) {
    ElMessage.warning('购物车为空')
    return
  }
  router.push('/checkout')
}
</script>

<template>
  <div class="cart-page">
    <h2 class="title">我的购物车</h2>

    <el-empty v-if="items.length === 0" description="购物车还是空的，去首页逛逛吧" />

    <template v-else>
      <el-table :data="items" border>
        <el-table-column label="商品" min-width="360">
          <template #default="{ row }">
            <div class="product-cell">
              <img :src="row.image" :alt="row.name" />
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

        <el-table-column label="数量" width="180">
          <template #default="{ row }">
            <el-input-number
              :model-value="row.quantity"
              :min="1"
              :max="99"
              @change="(val) => onQuantityChange(row, val)"
            />
          </template>
        </el-table-column>

        <el-table-column label="小计" width="140">
          <template #default="{ row }">
            <span class="subtotal">¥{{ (row.price * row.quantity).toFixed(2) }}</span>
          </template>
        </el-table-column>

        <el-table-column label="操作" width="120">
          <template #default="{ row }">
            <el-button type="danger" link @click="removeItem(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="cart-footer">
        <div class="total">
          合计：<span>¥{{ totalPrice.toFixed(2) }}</span>
        </div>
        <el-button type="primary" size="large" @click="checkout">去结算</el-button>
      </div>
    </template>
  </div>
</template>

<style scoped>
.cart-page {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-height: 480px;
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
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 4px;
}

.name {
  color: #303133;
  line-height: 1.4;
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

.cart-footer {
  margin-top: 20px;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  gap: 20px;
}

.total {
  font-size: 16px;
  color: #606266;
}

.total span {
  color: #f56c6c;
  font-size: 24px;
  font-weight: 700;
}
</style>
