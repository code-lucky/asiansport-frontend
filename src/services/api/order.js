import request from '../index'

// 查询订单
export function getDetail(params) {
  return request.get({
    url: '/v1/Order/searchDetail',
    params
  })
}

// 创建订单
export function createOrder(data) {
  return request.post({
    url: '/v1/Order/createOrder',
    data
  })
}

// 驗證優惠券是否可用
export function verifyCoupon(params){
  return request.get({
    url: '/v1/Coupon/apply',
    params
  })
}

// 開始進行bbmsl支付
export function getBBmsl(data){
  return request.post({
    url: 'v1/Order/getBBmsl',
    data
  })
}

// 获取地区按分組
export function getShippingAreaGroupList(){
  return request.get({
    url: 'v1/Order/getShippingAreaGroupList',
  })
}

// 获取地区按國家
export function getShippingAreaList(params){
  return request.get({
    url: 'v1/Order/getShippingAreaList',
    params
  })
}