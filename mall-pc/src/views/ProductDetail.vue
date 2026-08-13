<script setup>
import { computed, onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getProductDetail } from '../api/product'
import { useCartStore } from '../stores/cart'

const route = useRoute()
const router = useRouter()
const cartStore = useCartStore()

const product = ref(null)
const activeImage = ref('')
const selectedSku = ref('')
const quantity = ref(1)
const activeTab = ref('detail')
const loading = ref(false)

const currentSku = computed(() => {
  if (!product.value) return null
  return product.value.skus.find((item) => item.value === selectedSku.value) || product.value.skus[0]
})

const displayPrice = computed(() => {
  return currentSku.value?.price ?? product.value?.price ?? 0
})

const loadDetail = async () => {
  loading.value = true
  try {
    const data = await getProductDetail(route.params.id)
    product.value = data
    if (!data) return
    activeImage.value = data.images[0]
    selectedSku.value = data.skus[0]?.value || ''
    quantity.value = 1
  } finally {
    loading.value = false
  }
}

const addToCart = () => {
  if (!product.value || !currentSku.value) return
  cartStore.addItem(
    {
      id: product.value.id,
      name: product.value.name,
      price: currentSku.value.price,
      image: product.value.image,
      sku: currentSku.value.value,
      skuLabel: currentSku.value.label,
    },
    quantity.value,
  )
  ElMessage.success('已加入购物车')
}

const buyNow = () => {
  addToCart()
  router.push('/checkout')
}

watch(
  () => route.params.id,
  () => {
    loadDetail()
  },
)

onMounted(loadDetail)
</script>

<template>
  <div v-loading="loading" class="detail-page">
    <el-empty v-if="!loading && !product" description="商品不存在" />

    <template v-else-if="product">
      <el-row :gutter="32" class="detail-top">
        <el-col :span="10">
          <div class="gallery">
            <img class="main-image" :src="activeImage" :alt="product.name" />
            <div class="thumbs">
              <img
                v-for="(img, index) in product.images"
                :key="index"
                :src="img"
                :class="['thumb', { active: activeImage === img }]"
                alt="thumb"
                @click="activeImage = img"
              />
            </div>
          </div>
        </el-col>

        <el-col :span="14">
          <h1 class="title">{{ product.name }}</h1>
          <div class="price">¥{{ displayPrice.toFixed(2) }}</div>

          <div class="field">
            <span class="label">规格</span>
            <el-select v-model="selectedSku" style="width: 280px">
              <el-option
                v-for="sku in product.skus"
                :key="sku.value"
                :label="sku.label"
                :value="sku.value"
              />
            </el-select>
          </div>

          <div class="field">
            <span class="label">数量</span>
            <el-input-number v-model="quantity" :min="1" :max="99" />
          </div>

          <div class="actions">
            <el-button type="danger" size="large" @click="addToCart">加入购物车</el-button>
            <el-button type="primary" size="large" @click="buyNow">立即购买</el-button>
          </div>
        </el-col>
      </el-row>

      <el-tabs v-model="activeTab" class="detail-tabs">
        <el-tab-pane label="商品详情" name="detail">
          <div class="rich-text" v-html="product.detail" />
        </el-tab-pane>
        <el-tab-pane label="规格参数" name="specs">
          <el-table :data="product.specs" border>
            <el-table-column prop="name" label="参数" width="200" />
            <el-table-column prop="value" label="说明" />
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="评价" name="comments">
          <div v-if="product.comments.length === 0">暂无评价</div>
          <div v-for="item in product.comments" :key="item.id" class="comment-item">
            <div class="comment-user">{{ item.user }} · {{ item.score }} 分</div>
            <div>{{ item.content }}</div>
          </div>
        </el-tab-pane>
      </el-tabs>
    </template>
  </div>
</template>

<style scoped>
.detail-page {
  background: #fff;
  border-radius: 8px;
  padding: 24px;
  min-height: 560px;
}

.gallery {
  width: 100%;
}

.main-image {
  width: 100%;
  height: 420px;
  object-fit: cover;
  border-radius: 8px;
  border: 1px solid #ebeef5;
}

.thumbs {
  margin-top: 12px;
  display: flex;
  gap: 10px;
}

.thumb {
  width: 72px;
  height: 72px;
  object-fit: cover;
  border-radius: 4px;
  border: 2px solid transparent;
  cursor: pointer;
}

.thumb.active {
  border-color: #409eff;
}

.title {
  margin: 0 0 16px;
  font-size: 28px;
  line-height: 1.4;
  color: #303133;
}

.price {
  margin-bottom: 24px;
  color: #f56c6c;
  font-size: 36px;
  font-weight: 700;
}

.field {
  display: flex;
  align-items: center;
  margin-bottom: 20px;
}

.label {
  width: 56px;
  color: #909399;
}

.actions {
  margin-top: 28px;
  display: flex;
  gap: 12px;
}

.detail-tabs {
  margin-top: 32px;
}

.rich-text {
  color: #606266;
  line-height: 1.8;
}

.comment-item {
  padding: 12px 0;
  border-bottom: 1px solid #ebeef5;
}

.comment-user {
  margin-bottom: 6px;
  color: #909399;
  font-size: 13px;
}
</style>
