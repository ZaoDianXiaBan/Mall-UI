<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { useCartStore } from '../stores/cart'

const props = defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const router = useRouter()
const cartStore = useCartStore()

const goDetail = () => {
  router.push(`/products/${props.product.id}`)
}

const addToCart = (event) => {
  event.stopPropagation()
  cartStore.addItem({
    id: props.product.id,
    name: props.product.name,
    price: props.product.price,
    image: props.product.image,
  })
  ElMessage.success('已加入购物车')
}
</script>

<template>
  <el-card class="product-card" shadow="hover" @click="goDetail">
    <img class="product-image" :src="product.image" :alt="product.name" />
    <div class="product-name" :title="product.name">{{ product.name }}</div>
    <div class="product-footer">
      <span class="product-price">¥{{ product.price.toFixed(2) }}</span>
      <el-button type="primary" size="small" @click="addToCart">加入购物车</el-button>
    </div>
  </el-card>
</template>

<style scoped>
.product-card {
  cursor: pointer;
  height: 100%;
}

.product-card :deep(.el-card__body) {
  padding: 12px;
}

.product-image {
  width: 100%;
  height: 180px;
  object-fit: cover;
  border-radius: 4px;
  display: block;
}

.product-name {
  margin-top: 10px;
  height: 40px;
  line-height: 20px;
  font-size: 14px;
  color: #303133;
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
}

.product-footer {
  margin-top: 12px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.product-price {
  color: #f56c6c;
  font-size: 18px;
  font-weight: 700;
}
</style>
