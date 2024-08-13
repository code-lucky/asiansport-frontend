import { defineStore } from 'pinia'
import { getContactus } from '@/services/api/article'

const useArticleStore = defineStore('article', {
  state: () => ({
    contactDetail: {}
  }),
  actions: {
    //獲取詳情
    async getContactDetailAction() {
      const res = await getContactus()
      if (res.code == 200) {
        this.contactDetail = res.data
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

export default useArticleStore
