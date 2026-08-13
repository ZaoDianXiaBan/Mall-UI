import request from '../utils/request'

/** 轮播与分类为商城展示配置（后端暂无对应表，集中在 API 层维护） */
const banners = [
  { id: 1, image: 'https://picsum.photos/seed/mall-banner1/1200/360', link: '/products' },
  { id: 2, image: 'https://picsum.photos/seed/mall-banner2/1200/360', link: '/products' },
  { id: 3, image: 'https://picsum.photos/seed/mall-banner3/1200/360', link: '/products' },
]

const categories = [
  { id: 1, name: '手机数码', icon: 'https://picsum.photos/seed/cat1/80/80' },
  { id: 2, name: '电脑办公', icon: 'https://picsum.photos/seed/cat2/80/80' },
  { id: 3, name: '家用电器', icon: 'https://picsum.photos/seed/cat3/80/80' },
  { id: 4, name: '服饰鞋包', icon: 'https://picsum.photos/seed/cat4/80/80' },
  { id: 5, name: '美妆护肤', icon: 'https://picsum.photos/seed/cat5/80/80' },
  { id: 6, name: '食品生鲜', icon: 'https://picsum.photos/seed/cat6/80/80' },
  { id: 7, name: '家居生活', icon: 'https://picsum.photos/seed/cat7/80/80' },
  { id: 8, name: '运动户外', icon: 'https://picsum.photos/seed/cat8/80/80' },
]

const categoryTree = [
  {
    id: 1,
    label: '手机数码',
    children: [
      { id: 1, label: '手机数码' },
    ],
  },
  {
    id: 2,
    label: '电脑办公',
    children: [
      { id: 2, label: '电脑办公' },
    ],
  },
]

function toCardItem(item) {
  return {
    id: item.id,
    name: item.name,
    price: Number(item.price),
    sales: item.stock ?? 0,
    image: item.image,
    categoryId: item.categoryId,
    stock: item.stock,
  }
}

function toDetail(item) {
  if (!item) return null
  const price = Number(item.price)
  const image = item.image || 'https://picsum.photos/seed/fallback/400/400'
  return {
    id: item.id,
    name: item.name,
    price,
    stock: item.stock,
    categoryId: item.categoryId,
    image,
    status: item.status,
    images: [image, image],
    skus: [
      { label: '默认规格', value: 'default', price },
    ],
    detail: `<p>${item.name}</p><p>库存：${item.stock ?? 0}</p>`,
    specs: [
      { name: '商品ID', value: String(item.id) },
      { name: '分类ID', value: String(item.categoryId ?? '-') },
      { name: '库存', value: String(item.stock ?? 0) },
    ],
    comments: [],
  }
}

export function getBanners() {
  return Promise.resolve([...banners])
}

export function getHomeCategories() {
  return Promise.resolve([...categories])
}

export function getCategoryTree() {
  return Promise.resolve(JSON.parse(JSON.stringify(categoryTree)))
}

/** 推荐商品：调用后端商品列表 */
export function getRecommendProducts() {
  return request
    .get('/product/list', {
      params: { pageNum: 1, pageSize: 10, sort: 'default' },
    })
    .then((page) => (page?.records || []).map(toCardItem))
}

/** 商品列表：对接 mall-product */
export function getProductList(params = {}) {
  const {
    categoryId,
    keyword = '',
    sort = 'default',
    page = 1,
    pageSize = 10,
  } = params

  const query = {
    pageNum: page,
    pageSize,
    sort: sort === 'price-asc' ? 'price-asc' : sort,
  }
  if (keyword) query.keyword = keyword
  if (categoryId) query.categoryId = categoryId

  return request.get('/product/list', { params: query }).then((pageData) => ({
    list: (pageData?.records || []).map(toCardItem),
    total: pageData?.total || 0,
    page: pageData?.current || page,
    pageSize: pageData?.size || pageSize,
  }))
}

/** 商品详情：对接 mall-product */
export function getProductDetail(id) {
  return request.get(`/product/${id}`).then(toDetail)
}
