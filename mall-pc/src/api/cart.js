import request from '../utils/request'

/**
 * 创建订单：对接 mall-order（Seata 分布式事务：下单+扣库存）
 */
export function createOrder(data) {
  return request.post('/order', data)
}

/**
 * 订单列表
 */
export function getOrderList(params = {}) {
  return request.get('/order/list', {
    params: {
      pageNum: params.pageNum || 1,
      pageSize: params.pageSize || 10,
    },
  })
}

/**
 * 订单详情
 */
export function getOrderDetail(id) {
  return request.get(`/order/${id}`)
}
