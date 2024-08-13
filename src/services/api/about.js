import request from '../index'

//獲取關於我們
export function getDetail(params) {
  return request.get({
    url: '/v1/Article/Aboutus',
    params
  })
}
