import request from '../index'

//獲取隱私權政策
export function getDetail(params) {
  return request.get({
    url: '/v1/Article/PrivacyAndPolicy',
    params
  })
}
