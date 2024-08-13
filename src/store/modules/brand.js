import { defineStore } from 'pinia'
import { getBrandList } from '@/services/api/brand'

const useBrandStore = defineStore('brand', {
  state: () => ({
    brandList: []
  }),
  actions: {
    //獲取詳情
    async getBrandListAction(data) {
      const res = await getBrandList({ ...data })
      if (res.code == 200) {
        this.brandList = res.data
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

export default useBrandStore
