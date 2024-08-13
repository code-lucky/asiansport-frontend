import request from '../index'

//獲取地區列表
export function getNationList() {
  return request.get({
    url: '/v1/Nation/getList',
  })
}