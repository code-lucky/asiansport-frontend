import { defineStore } from 'pinia'
import { getEventCategoryList, getNationList, getSeo, getWebsiteBanner, getWebsiteBannerDetail, sendContacUs } from '@/services/api/main'

import { getAssetURL } from '@/utils/load_assets'
const useMainStore = defineStore('main', {
  state: () => ({
    height: 0,
    eventCategoryList: [],
    nationList: [],
    seo: {},
    textType: 'tc',
    bannerList: [],
    bannerDetail: {}
  }),
  actions: {
    //獲取活動分類列表
    async getEventCategoryListAction(data) {
      const res = await getEventCategoryList({ ...data })
      if (res.code == 200) {
        this.eventCategoryList = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },

    //獲取地區列表
    async getNationListAction(data) {
      const res = await getNationList({ ...data })
      if (res.code == 200) {
        this.nationList = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },

    //獲取seo
    async getSeoAction(data) {
      const res = await getSeo({ ...data })
      if (res.code == 200) {
        this.seo = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },

    //獲取Banner
    async getWebsiteBannerAction(data) {
      const res = await getWebsiteBanner(data)
      if (res.code == 200) {
        this.bannerList = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },

    //獲取Banner
    async getWebsiteBannerDetailAction(data) {
      const res = await getWebsiteBannerDetail(data)
      if (res.code == 200) {
        this.bannerDetail = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },

    //
    async sendContacUsAction(data) {
      const res = await sendContacUs(data)
      if (res.code == 200) {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'success'
        })
        return true
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
        return false
      }
    }
  }
})

export default useMainStore
