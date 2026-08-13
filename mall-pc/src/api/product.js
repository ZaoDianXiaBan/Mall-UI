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
      { id: 11, label: '手机' },
      { id: 12, label: '耳机音响' },
      { id: 13, label: '智能穿戴' },
    ],
  },
  {
    id: 2,
    label: '电脑办公',
    children: [
      { id: 21, label: '笔记本' },
      { id: 22, label: '台式机' },
      { id: 23, label: '外设配件' },
    ],
  },
  {
    id: 3,
    label: '家用电器',
    children: [
      { id: 31, label: '电视' },
      { id: 32, label: '空调' },
      { id: 33, label: '厨卫电器' },
    ],
  },
  {
    id: 4,
    label: '服饰鞋包',
    children: [
      { id: 41, label: '男装' },
      { id: 42, label: '女装' },
      { id: 43, label: '鞋靴' },
    ],
  },
  {
    id: 5,
    label: '美妆护肤',
    children: [
      { id: 51, label: '面部护肤' },
      { id: 52, label: '彩妆' },
    ],
  },
  {
    id: 6,
    label: '食品生鲜',
    children: [
      { id: 61, label: '休闲食品' },
      { id: 62, label: '粮油调味' },
    ],
  },
  {
    id: 7,
    label: '家居生活',
    children: [
      { id: 71, label: '家具' },
      { id: 72, label: '家纺' },
    ],
  },
  {
    id: 8,
    label: '运动户外',
    children: [
      { id: 81, label: '运动鞋' },
      { id: 82, label: '户外装备' },
    ],
  },
]

const products = [
  {
    id: 1,
    name: '轻薄旗舰智能手机 8GB+256GB',
    price: 3999,
    sales: 12800,
    categoryId: 11,
    parentCategoryId: 1,
    image: 'https://picsum.photos/seed/p1/400/400',
    images: [
      'https://picsum.photos/seed/p1/400/400',
      'https://picsum.photos/seed/p1a/400/400',
      'https://picsum.photos/seed/p1b/400/400',
    ],
    skus: [
      { label: '黑色 / 8+256GB', value: 'black-256', price: 3999 },
      { label: '白色 / 8+256GB', value: 'white-256', price: 3999 },
      { label: '黑色 / 12+512GB', value: 'black-512', price: 4599 },
    ],
    detail: '<p>高刷新率屏幕，强劲性能，全天候续航，适合日常与商务使用。</p>',
    specs: [
      { name: '品牌', value: 'MallPhone' },
      { name: '屏幕', value: '6.7 英寸 OLED' },
      { name: '处理器', value: '旗舰芯片' },
      { name: '电池', value: '5000mAh' },
    ],
    comments: [
      { id: 1, user: '用户A', content: '外观漂亮，运行流畅。', score: 5 },
      { id: 2, user: '用户B', content: '续航不错，拍照清晰。', score: 4 },
    ],
  },
  {
    id: 2,
    name: '商务轻薄笔记本电脑 16英寸',
    price: 6299,
    sales: 5600,
    categoryId: 21,
    parentCategoryId: 2,
    image: 'https://picsum.photos/seed/p2/400/400',
    images: [
      'https://picsum.photos/seed/p2/400/400',
      'https://picsum.photos/seed/p2a/400/400',
      'https://picsum.photos/seed/p2b/400/400',
    ],
    skus: [
      { label: 'i5 / 16G / 512G', value: 'i5-16-512', price: 6299 },
      { label: 'i7 / 32G / 1T', value: 'i7-32-1t', price: 8299 },
    ],
    detail: '<p>窄边框高清屏，散热出色，适合办公与创作。</p>',
    specs: [
      { name: '品牌', value: 'MallBook' },
      { name: '内存', value: '16GB' },
      { name: '硬盘', value: '512GB SSD' },
    ],
    comments: [
      { id: 1, user: '用户C', content: '键盘手感很好。', score: 5 },
    ],
  },
  {
    id: 3,
    name: '变频冷暖空调 1.5匹',
    price: 2899,
    sales: 9200,
    categoryId: 32,
    parentCategoryId: 3,
    image: 'https://picsum.photos/seed/p3/400/400',
    images: [
      'https://picsum.photos/seed/p3/400/400',
      'https://picsum.photos/seed/p3a/400/400',
    ],
    skus: [
      { label: '1.5匹 白色', value: '15-white', price: 2899 },
      { label: '大1.5匹 白色', value: '15p-white', price: 3199 },
    ],
    detail: '<p>快速制冷制热，静音运行，支持智能控温。</p>',
    specs: [
      { name: '能效', value: '一级能效' },
      { name: '匹数', value: '1.5匹' },
    ],
    comments: [{ id: 1, user: '用户D', content: '制冷很快。', score: 5 }],
  },
  {
    id: 4,
    name: '男士休闲运动外套',
    price: 299,
    sales: 15300,
    categoryId: 41,
    parentCategoryId: 4,
    image: 'https://picsum.photos/seed/p4/400/400',
    images: [
      'https://picsum.photos/seed/p4/400/400',
      'https://picsum.photos/seed/p4a/400/400',
    ],
    skus: [
      { label: '黑色 / L', value: 'black-l', price: 299 },
      { label: '灰色 / XL', value: 'gray-xl', price: 299 },
      { label: '藏青 / M', value: 'navy-m', price: 299 },
    ],
    detail: '<p>柔软透气面料，日常通勤与运动都合适。</p>',
    specs: [
      { name: '材质', value: '聚酯纤维' },
      { name: '风格', value: '休闲' },
    ],
    comments: [{ id: 1, user: '用户E', content: '尺码标准。', score: 4 }],
  },
  {
    id: 5,
    name: '氨基酸温和洁面乳 150ml',
    price: 89,
    sales: 22100,
    categoryId: 51,
    parentCategoryId: 5,
    image: 'https://picsum.photos/seed/p5/400/400',
    images: [
      'https://picsum.photos/seed/p5/400/400',
      'https://picsum.photos/seed/p5a/400/400',
    ],
    skus: [
      { label: '150ml', value: '150ml', price: 89 },
      { label: '300ml', value: '300ml', price: 149 },
    ],
    detail: '<p>温和清洁，不紧绷，适合敏感肌日常使用。</p>',
    specs: [
      { name: '净含量', value: '150ml' },
      { name: '适用肤质', value: '敏感肌' },
    ],
    comments: [{ id: 1, user: '用户F', content: '很温和。', score: 5 }],
  },
  {
    id: 6,
    name: '进口坚果礼盒装 1.2kg',
    price: 168,
    sales: 8700,
    categoryId: 61,
    parentCategoryId: 6,
    image: 'https://picsum.photos/seed/p6/400/400',
    images: [
      'https://picsum.photos/seed/p6/400/400',
      'https://picsum.photos/seed/p6a/400/400',
    ],
    skus: [
      { label: '原味礼盒', value: 'original', price: 168 },
      { label: '混合坚果', value: 'mix', price: 188 },
    ],
    detail: '<p>精选坚果组合，适合节日送礼与日常零食。</p>',
    specs: [
      { name: '净含量', value: '1.2kg' },
      { name: '保质期', value: '12个月' },
    ],
    comments: [{ id: 1, user: '用户G', content: '包装精美。', score: 5 }],
  },
  {
    id: 7,
    name: '北欧风实木餐桌 1.4米',
    price: 1599,
    sales: 2100,
    categoryId: 71,
    parentCategoryId: 7,
    image: 'https://picsum.photos/seed/p7/400/400',
    images: [
      'https://picsum.photos/seed/p7/400/400',
      'https://picsum.photos/seed/p7a/400/400',
    ],
    skus: [
      { label: '原木色 / 1.4米', value: 'wood-14', price: 1599 },
      { label: '原木色 / 1.6米', value: 'wood-16', price: 1899 },
    ],
    detail: '<p>实木材质，简约设计，稳固耐用。</p>',
    specs: [
      { name: '材质', value: '实木' },
      { name: '尺寸', value: '1400x800mm' },
    ],
    comments: [{ id: 1, user: '用户H', content: '做工扎实。', score: 4 }],
  },
  {
    id: 8,
    name: '专业跑步鞋 透气缓震',
    price: 499,
    sales: 13400,
    categoryId: 81,
    parentCategoryId: 8,
    image: 'https://picsum.photos/seed/p8/400/400',
    images: [
      'https://picsum.photos/seed/p8/400/400',
      'https://picsum.photos/seed/p8a/400/400',
    ],
    skus: [
      { label: '黑白 / 42', value: 'bw-42', price: 499 },
      { label: '全黑 / 43', value: 'black-43', price: 499 },
      { label: '灰橙 / 41', value: 'go-41', price: 499 },
    ],
    detail: '<p>轻量透气鞋面，缓震中底，适合日常跑步训练。</p>',
    specs: [
      { name: '鞋底', value: '橡胶' },
      { name: '适用场景', value: '跑步' },
    ],
    comments: [{ id: 1, user: '用户I', content: '穿着很轻。', score: 5 }],
  },
  {
    id: 9,
    name: '降噪蓝牙耳机 Pro',
    price: 899,
    sales: 18700,
    categoryId: 12,
    parentCategoryId: 1,
    image: 'https://picsum.photos/seed/p9/400/400',
    images: [
      'https://picsum.photos/seed/p9/400/400',
      'https://picsum.photos/seed/p9a/400/400',
    ],
    skus: [
      { label: '银色', value: 'silver', price: 899 },
      { label: '黑色', value: 'black', price: 899 },
    ],
    detail: '<p>主动降噪，长续航，支持空间音频。</p>',
    specs: [
      { name: '续航', value: '30小时' },
      { name: '连接', value: '蓝牙 5.3' },
    ],
    comments: [{ id: 1, user: '用户J', content: '降噪效果好。', score: 5 }],
  },
  {
    id: 10,
    name: '机械键盘 RGB 青轴',
    price: 359,
    sales: 7600,
    categoryId: 23,
    parentCategoryId: 2,
    image: 'https://picsum.photos/seed/p10/400/400',
    images: [
      'https://picsum.photos/seed/p10/400/400',
      'https://picsum.photos/seed/p10a/400/400',
    ],
    skus: [
      { label: '青轴 / 黑色', value: 'blue-black', price: 359 },
      { label: '红轴 / 白色', value: 'red-white', price: 359 },
    ],
    detail: '<p>全键无冲，热插拔轴体，可编程灯光。</p>',
    specs: [
      { name: '轴体', value: '青轴' },
      { name: '连接方式', value: '有线' },
    ],
    comments: [{ id: 1, user: '用户K', content: '手感清脆。', score: 4 }],
  },
]

function delay(data, ms = 200) {
  return new Promise((resolve) => {
    setTimeout(() => resolve(data), ms)
  })
}

export function getBanners() {
  return delay([...banners])
}

export function getHomeCategories() {
  return delay([...categories])
}

export function getRecommendProducts() {
  return delay(products.slice(0, 10).map(toCardItem))
}

export function getCategoryTree() {
  return delay(JSON.parse(JSON.stringify(categoryTree)))
}

export function getProductList(params = {}) {
  const {
    categoryId,
    keyword = '',
    sort = 'default',
    page = 1,
    pageSize = 10,
  } = params

  let list = [...products]

  if (categoryId) {
    const id = Number(categoryId)
    list = list.filter(
      (item) => item.categoryId === id || item.parentCategoryId === id,
    )
  }

  if (keyword) {
    const key = String(keyword).trim().toLowerCase()
    list = list.filter((item) => item.name.toLowerCase().includes(key))
  }

  if (sort === 'sales') {
    list.sort((a, b) => b.sales - a.sales)
  } else if (sort === 'price-asc') {
    list.sort((a, b) => a.price - b.price)
  } else if (sort === 'price-desc') {
    list.sort((a, b) => b.price - a.price)
  }

  const total = list.length
  const start = (page - 1) * pageSize
  const records = list.slice(start, start + pageSize).map(toCardItem)

  return delay({ list: records, total, page, pageSize })
}

export function getProductDetail(id) {
  const product = products.find((item) => item.id === Number(id))
  if (!product) {
    return delay(null)
  }
  return delay(JSON.parse(JSON.stringify(product)))
}

function toCardItem(item) {
  return {
    id: item.id,
    name: item.name,
    price: item.price,
    sales: item.sales,
    image: item.image,
    categoryId: item.categoryId,
  }
}
