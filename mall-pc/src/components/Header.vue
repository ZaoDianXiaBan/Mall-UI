<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart, User } from '@element-plus/icons-vue'
import { useCartStore } from '../stores/cart'

const router = useRouter()
const cartStore = useCartStore()
const keyword = ref('')
const cartCount = computed(() => cartStore.totalCount)

const goHome = () => {
  router.push('/')
}

const onSearch = () => {
  router.push({
    path: '/products',
    query: keyword.value ? { keyword: keyword.value } : {},
  })
}

const goCart = () => {
  router.push('/cart')
}

const goLogin = () => {
  // 登录页后续补充
}
</script>

<template>
  <div class="header-inner">
    <div class="logo" @click="goHome">Mall PC</div>

    <el-input
      v-model="keyword"
      class="search-input"
      placeholder="搜索商品"
      clearable
      @keyup.enter="onSearch"
    >
      <template #append>
        <el-button type="primary" @click="onSearch">搜索</el-button>
      </template>
    </el-input>

    <div class="header-actions">
      <el-badge :value="cartCount" :hidden="cartCount === 0" :max="99">
        <el-button text @click="goCart">
          <el-icon :size="18"><ShoppingCart /></el-icon>
          <span>购物车</span>
        </el-button>
      </el-badge>
      <el-button text @click="goLogin">
        <el-icon :size="18"><User /></el-icon>
        <span>登录</span>
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.header-inner {
  width: 1200px;
  height: 60px;
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 24px;
}

.logo {
  flex-shrink: 0;
  font-size: 22px;
  font-weight: 700;
  color: #409eff;
  cursor: pointer;
  user-select: none;
}

.search-input {
  flex: 1;
  max-width: 520px;
}

.header-actions {
  margin-left: auto;
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-actions .el-button {
  display: inline-flex;
  align-items: center;
  gap: 4px;
}
</style>
