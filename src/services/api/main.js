import request from '../index'

//獲取活動分類列表
export function getEventCategoryList(params) {
  return request.get({
    url: '/v1/EventCategory/getList',
    params
  })
}

//獲取地區列表
export function getNationList(params) {
  return request.get({
    url: '/v1/Nation/list',
    params
  })
}

//獲取SEO
export function getSeo(params) {
  return request.get({
    url: '/v1/Website/getSeo',
    params
  })
}

//獲取Banner
export function getWebsiteBanner(params) {
  return request.get({
    url: '/v1/Website/getWebsiteBanner',
    params
  })
}

//獲取Banner(根據id)
export function getWebsiteBannerDetail(params) {
  return request.get({
    url: '/v1/Website/getWebsiteBannerDetail',
    params
  })
}

//發送請求
export function sendContacUs(data) {
  return request.post({
    url: '/v1/ContacUs/send',
    data
  })
}
