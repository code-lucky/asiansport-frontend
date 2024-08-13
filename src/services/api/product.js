import request from '../index'

// 獲取品牌列表
export function getProductList(params) {
  return request.get({
    url: '/v1/Product/list',
    params
  })
}

export function getProductDetail(id) {
  return request.get({
    url: `/v1/Product/detail/${id}`,
  })
}

export function getProductitemDetail(id, data) {
  return request.post({
    url: `/v1/Product/itemDetail/${id}`,
    data
  })
}

export function getProductOtherList(id) {
  return request.get({
    url: `/v1/Product/otherItemList/${id}`,
  })
}


// 获取商品分类
export function getCategoryList(){
  return request.get({
    url: '/v1/Product/categoryList',
  })
}


export function getCategoryGroupList(){
  return request.get({
    url: '/v1/Product/categoryGroupList',
  })
}