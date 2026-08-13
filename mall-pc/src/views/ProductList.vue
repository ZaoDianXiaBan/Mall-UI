<script setup>
import { onMounted, ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import ProductCard from '../components/ProductCard.vue'
import { getCategoryTree, getProductList } from '../api/product'

const route = useRoute()
const router = useRouter()

const treeData = ref([])
const productList = ref([])
const total = ref(0)
const loading = ref(false)

const sort = ref('default')
const page = ref(1)
const pageSize = ref(10)
const categoryId = ref(route.query.categoryId ? Number(route.query.categoryId) : null)

const fetchList = async () => {
  loading.value = true
  try {
    const res = await getProductList({
      categoryId: categoryId.value,
      keyword: route.query.keyword || '',
      sort: sort.value,
      page: page.value,
      pageSize: pageSize.value,
    })
    productList.value = res.list
    total.value = res.total
  } finally {
    loading.value = false
  }
}

const onCategoryClick = (data) => {
  categoryId.value = data.id
  page.value = 1
  router.replace({
    query: {
      ...route.query,
      categoryId: data.id,
    },
  })
  fetchList()
}

const onSortChange = () => {
  page.value = 1
  fetchList()
}

const onPageChange = (val) => {
  page.value = val
  fetchList()
}

watch(
  () => route.query.keyword,
  () => {
    page.value = 1
    fetchList()
  },
)

onMounted(async () => {
  treeData.value = await getCategoryTree()
  await fetchList()
})
</script>

<template>
  <el-container class="list-page">
    <el-aside width="220px" class="list-aside">
      <div class="aside-title">商品分类</div>
      <el-tree
        :data="treeData"
        node-key="id"
        default-expand-all
        highlight-current
        :props="{ label: 'label', children: 'children' }"
        @node-click="onCategoryClick"
      />
    </el-aside>

    <el-main class="list-main">
      <div class="toolbar">
        <el-radio-group v-model="sort" @change="onSortChange">
          <el-radio-button value="default">综合</el-radio-button>
          <el-radio-button value="sales">销量</el-radio-button>
          <el-radio-button value="price-asc">价格</el-radio-button>
        </el-radio-group>
      </div>

      <div v-loading="loading" class="product-grid">
        <el-empty v-if="!loading && productList.length === 0" description="暂无商品" />
        <el-row v-else :gutter="16">
          <el-col
            v-for="item in productList"
            :key="item.id"
            class="col-5"
          >
            <ProductCard :product="item" />
          </el-col>
        </el-row>
      </div>

      <div class="pagination-wrap">
        <el-pagination
          background
          layout="total, prev, pager, next"
          :total="total"
          :page-size="pageSize"
          :current-page="page"
          @current-change="onPageChange"
        />
      </div>
    </el-main>
  </el-container>
</template>

<style scoped>
.list-page {
  background: #fff;
  border-radius: 8px;
  min-height: 640px;
}

.list-aside {
  padding: 16px;
  border-right: 1px solid #ebeef5;
}

.aside-title {
  margin-bottom: 12px;
  font-size: 16px;
  font-weight: 600;
}

.list-main {
  padding: 16px 20px 20px;
  display: flex;
  flex-direction: column;
}

.toolbar {
  margin-bottom: 16px;
}

.product-grid {
  flex: 1;
  min-height: 400px;
}

.col-5 {
  width: 20%;
  max-width: 20%;
  flex: 0 0 20%;
  margin-bottom: 16px;
}

.pagination-wrap {
  margin-top: 16px;
  display: flex;
  justify-content: flex-end;
}
</style>
