import request from '../index'

//獲取價格預覽
export function getPriceSummary(data) {
  return request.post({
    url: '/v1/Order/getPriceSummary',
    data
  })
}

// 獲取門店列表
export function getStoreList() {
  return request.get({
    url: '/v1/Branch/getList',
  })
}