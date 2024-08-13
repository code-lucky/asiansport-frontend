import request from '../index'

// 獲取品牌列表
export function getBrandList(params) {
  return request.get({
    url: '/v1/Product/brandList',
    params
  })
}
