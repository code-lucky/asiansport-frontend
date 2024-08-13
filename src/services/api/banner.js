import request from '../index'

//獲取使用條款
export function getWebsiteBannerDetail(params) {
  return request.get({
    url: 'v1/Website/getWebsiteBannerDetail',
    params
  })
}
