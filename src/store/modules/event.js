import { defineStore } from 'pinia'
import { getList, getDetail, getEventItemList, getEventItemDetail, getEventItemPeople } from '@/services/api/event'

const useEventStore = defineStore('event', {
  state: () => ({
    list: [],
    pageDate: {
      page: 1,
      items_per_page: 9,
      page_total: 1
    },
    detail: {},
    eventItemList: [],
    eventItemPageDate: {
      page: 1,
      items_per_page: 24,
      page_total: 1
    },
    eventItemDetail: {},
    eventItemPeople: {}
  }),
  actions: {
    //獲取活動列表
    async getListAction(data) {
      const res = await getList({ ...data, ...this.pageDate })
      if (res.code == 200) {
        this.list = res.data.list
        this.pageDate.page = res.data.page
        this.pageDate.page_total = res.data.page_total
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    //獲取活動列表
    async getListAction2(data) {
      const res = await getList({ ...data, page: 1, items_per_page: 4 })
      if (res.code == 200) {
        return res.data.list
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },

    //獲取活動詳情
    async getDetailAction(data) {
      const res = await getDetail({ ...data })
      if (res.code == 200) {
        this.detail = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },

    //獲取活動項目列表
    async getEventItemListAction(data) {
      const res = await getEventItemList({ ...data })
      if (res.code == 200) {
        this.eventItemList = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },

    //獲取活動項目詳情
    async getEventItemDetailAction(data) {
      const res = await getEventItemDetail({ ...data })
      if (res.code == 200) {
        this.eventItemDetail = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },

    //獲取活動項目表格資料
    async getEventItemPeopleAction(data) {
      const res = await getEventItemPeople({ ...data })
      if (res.code == 200) {
        this.eventItemPeople = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    }
  }
})

export default useEventStore
