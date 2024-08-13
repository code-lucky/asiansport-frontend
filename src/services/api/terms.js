import request from '../index'

//獲取使用條款
export function getDetail(params) {
  return request.get({
    url: '/v1/Article/terms',
    params
  })
}
