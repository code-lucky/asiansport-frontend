import request from '../index'

//獲取活動列表
export function getList(params) {
  return request.get({
    url: '/v1/Event/getList',
    params
  })
}

//獲取活動詳情
export function getDetail(params) {
  return request.get({
    url: '/v1/Event/getDetail/' + params.id,
    params
  })
}

//獲取活動項目列表
export function getEventItemList(params) {
  return request.get({
    url: '/v1/Event/getEventItemList',
    params
  })
}

//獲取活動項目詳情
export function getEventItemDetail(params) {
  return request.get({
    url: '/v1/Event/getEventItemDetail/' + params.id,
    params
  })
}

//獲取活動項目表格資料
export function getEventItemPeople(params) {
  return request.get({
    url: '/v1/Event/getEventItemPeople',
    params
  })
}
