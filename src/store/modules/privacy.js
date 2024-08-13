import { defineStore } from 'pinia'
import { getDetail } from '@/services/api/privacy'

const usePrivacyStore = defineStore('privacy', {
  state: () => ({
    detail: {}
  }),
  actions: {
    //獲取詳情
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
    }
  }
})

export default usePrivacyStore
