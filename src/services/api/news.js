import request from '../index'

//獲取資訊列表
export function getList(params) {
  return request.get({
    url: '/v1/News/getList',
    params
  })
}

// 獲取最新資訊分類列表
export function geCategorytList(params) {
    return request.get({
      url: '/v1/News/getNewsTypeList',
    })
  }

//獲取最新資訊關聯列表
export function getNewsRelationList(params) {
  return request.get({
    url: '/v1/News/getNewsRelationList',
    params
  })
}

// 獲取最新資訊詳情
export function getDetail(params) {
    return request.get({
      url: '/v1/News/getDetail',
      params
    })
  }
