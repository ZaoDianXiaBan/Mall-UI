<script setup>
import { computed, ref } from 'vue'
import { useRouter } from 'vue-router'
import { ShoppingCart, User } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { useCartStore } from '../stores/cart'
import { useUserStore } from '../stores/user'

const router = useRouter()
const cartStore = useCartStore()
const userStore = useUserStore()
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
  router.push({
    path: '/login',
    query: { redirect: router.currentRoute.value.fullPath },
  })
}

const onLogout = () => {
  userStore.logout()
  ElMessage.success('已退出登录')
  router.push('/')
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

      <template v-if="userStore.isLogin">
        <el-button text>
          <el-icon :size="18"><User /></el-icon>
          <span>{{ userStore.displayName }}</span>
        </el-button>
        <el-button text @click="onLogout">退出</el-button>
      </template>
      <el-button v-else text @click="goLogin">
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
