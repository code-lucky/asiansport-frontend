import request from '../index'

//獲取使用條款
export function getContactus(params) {
  return request.get({
    url: '/v1/Article/Contactus',
    params
  })
}
