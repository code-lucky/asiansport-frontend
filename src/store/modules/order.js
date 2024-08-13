import { defineStore } from 'pinia'
import { getDetail, createOrder, verifyCoupon, getBBmsl, getShippingAreaList } from '@/services/api/order'
import { getNationList } from '@/services/api/nation'
const usePrivacyStore = defineStore('order', {
  state: () => ({
    detail: {},
    areaList: [],
    nationList: []
  }),
  actions: {
    //獲取詳情
    async getDetailAction(data) {
      const res = await getDetail({ ...data })
      if (res.code == 200) {
        this.detail = res.data
        console.log(this.detail)
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    async createOrderAction(data) {
      const res = await createOrder(data)
      if (res.code == 200) {
        return res
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
        return false
      }
    },
    async verificationCoupon(data) {
      const res = await verifyCoupon({ ...data })
      return res
    },
    async getBBmslAction(data) {
      const res = await getBBmsl(data)
      return res
    },
    async getAreaListAction(data) {
      const res = await getShippingAreaList(data)
      if (res.code == 200) {
        this.areaList = res.data
        return res.data
      } else {
        // ElMessage({
        //   showClose: true,
        //   message: res.message,
        //   type: 'error'
        // })
        return []
      }
    },
    async getNationListAction() {
      const res = await getNationList()
      if (res.code == 200) {
        this.nationList = res.data
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

export default usePrivacyStore
