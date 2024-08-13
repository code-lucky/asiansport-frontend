import { defineStore } from 'pinia'
import cache from '@/utils/cache'
import { addCart, getList, deleteCart, submitCart, getPriceSummary, addOrder, getBBmsl } from '@/services/api/cart'
import router from '@/router'
import i18n from '@/utils/i18n'

const t = i18n.global.t

const useCartStore = defineStore('cart', {
  state: () => ({
    height: 0,
    list: [],
    session_id: cache.getCache('session_id') ? cache.getCache('session_id') : '',
    priceSummary: {}
  }),
  actions: {
    //加入購物車
    async addCartAction(data) {
      // const { t } = useI18n()

      const res = await addCart(data)
      if (res.code == 200) {
        console.log(res.data)
        ElMessage({
          showClose: true,
          message: t('add_tip'),
          type: 'success'
        })
        if (!this.session_id) {
          this.session_id = res.data.session_id
          cache.setCache('session_id', res.data.session_id)
        }
        setTimeout(() => {
          this.getListAction()
        }, 300)
        console.log('return true')
        return true
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })

        return false
      }
    },
    //獲取購物車列表
    async getListAction(data) {
      const res = await getList({ ...data, session_id: this.session_id })
      if (res.code == 200) {
        this.list = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    //刪除購物車
    async deleteCartAction(data) {
      // const { t } = useI18n()

      const res = await deleteCart({ ...data })
      if (res.code == 200) {
        console.log(res.data)
        ElMessage({
          showClose: true,
          message: t('del_tip'),
          type: 'success'
        })
        setTimeout(() => {
          this.getListAction()
        }, 300)
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    //購物車結算
    async getPriceSummaryAction(data) {
      const res = await getPriceSummary(data)
      if (res.code == 200) {
        this.priceSummary = res.data
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    //獲取產品金額
    async submitCartAction(data) {
      const res = await submitCart({ session_id: this.session_id, ...data })
      if (res.code == 200) {
        console.log(res.data)
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    //創建訂單
    async addOrderAction(data) {
      // const { t } = useI18n()
      const res = await addOrder(data)
      if (res.code == 200) {
        console.log(res.data)
        ElMessage({
          showClose: true,
          message: t('submit_tip'),
          type: 'success'
        })
        // router.push('/payment/success')
        this.list = []
        this.session_id = ''
        cache.deleteCache('session_id')
        let formData = new FormData()
        formData.append('order_id', res.data)
        this.getBBmslAction(formData)
        // this.getListAction()
      } else {
        ElMessage({
          showClose: true,
          message: res.message,
          type: 'error'
        })
      }
    },
    //獲取bbmsl付款鏈接
    async getBBmslAction(data) {
      const res = await getBBmsl(data)
      if (res.code == 200) {
        const loading = ElLoading.service({
          lock: true
        })
        window.location.assign(res.data.checkoutUrl).then(() => {
          loading.close()
        })
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

export default useCartStore
