import request from '../index'

//加入購物車
export function addCart(data) {
  return request.post({
    url: '/v1/ShoppingCart/add',
    data
  })
}
//獲取購物車列表
export function getList(params) {
  return request.get({
    url: '/v1/ShoppingCart/list',
    params
  })
}
//刪除購物車
export function deleteCart(data) {
  return request.post({
    url: '/v1/ShoppingCart/delete/' + data.id
  })
}
//購物車結算
export function submitCart(data) {
  return request.post({
    url: '/v1/ShoppingCart/settle',
    data
  })
}

//獲取產品金額
export function getPriceSummary(data) {
  return request.post({
    url: '/v1/Order/getPriceSummary',
    data
  })
}

//驗證優惠卷是否可用
export function getCouponIsCanUse(data) {
  return request.post({
    url: '/v1/Order/getCouponIsCanUse',
    data
  })
}

//創建訂單
export function addOrder(data) {
  return request.post({
    url: '/v1/Order/add',
    data
  })
}

//獲取bbmsl付款鏈接
export function getBBmsl(data) {
  return request.post({
    url: '/v1/Order/getBBmsl',
    data
  })
}
