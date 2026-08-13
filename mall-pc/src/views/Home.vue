<script setup>
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import {
  getBanners,
  getHomeCategories,
  getRecommendProducts,
} from '../api/product'

const router = useRouter()
const banners = ref([])
const categories = ref([])
const recommendList = ref([])

const goCategory = (category) => {
  router.push({
    path: '/products',
    query: { categoryId: category.id },
  })
}

const goBanner = (banner) => {
  if (banner.link) {
    router.push(banner.link)
  }
}

onMounted(async () => {
  const [bannerRes, categoryRes, recommendRes] = await Promise.all([
    getBanners(),
    getHomeCategories(),
    getRecommendProducts(),
  ])
  banners.value = bannerRes
  categories.value = categoryRes
  recommendList.value = recommendRes
})
</script>

<template>
  <div class="home-page">
    <el-carousel height="360px" class="banner">
      <el-carousel-item v-for="item in banners" :key="item.id">
        <img
          class="banner-image"
          :src="item.image"
          :alt="`banner-${item.id}`"
          @click="goBanner(item)"
        />
      </el-carousel-item>
    </el-carousel>

    <section class="section">
      <h2 class="section-title">商品分类</h2>
      <el-row :gutter="16">
        <el-col v-for="item in categories" :key="item.id" :span="3">
          <div class="category-item" @click="goCategory(item)">
            <img :src="item.icon" :alt="item.name" />
            <span>{{ item.name }}</span>
          </div>
        </el-col>
      </el-row>
    </section>

    <section class="section">
      <h2 class="section-title">推荐商品</h2>
      <el-row :gutter="16">
        <el-col
          v-for="item in recommendList"
          :key="item.id"
          class="col-5"
        >
          <ProductCard :product="item" />
        </el-col>
      </el-row>
    </section>
  </div>
</template>

<style scoped>
.banner {
  border-radius: 8px;
  overflow: hidden;
}

.banner-image {
  width: 100%;
  height: 360px;
  object-fit: cover;
  cursor: pointer;
  display: block;
}

.section {
  margin-top: 24px;
  padding: 20px;
  background: #fff;
  border-radius: 8px;
}

.section-title {
  margin: 0 0 16px;
  font-size: 20px;
  font-weight: 600;
  color: #303133;
}

.category-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 8px;
  padding: 12px 0;
  cursor: pointer;
  border-radius: 8px;
  transition: background 0.2s;
}

.category-item:hover {
  background: #f5f7fa;
}

.category-item img {
  width: 56px;
  height: 56px;
  border-radius: 50%;
  object-fit: cover;
}

.category-item span {
  font-size: 14px;
  color: #606266;
}

.col-5 {
  width: 20%;
  max-width: 20%;
  flex: 0 0 20%;
  margin-bottom: 16px;
}
</style>
