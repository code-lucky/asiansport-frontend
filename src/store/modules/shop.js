import { defineStore } from 'pinia'
import cache from '@/utils/cache'
import { getPriceSummary, getStoreList } from '@/services/api/shop'
import router from '@/router'
import i18n from '@/utils/i18n'

const t = i18n.global.t

const useShopStore = defineStore('shop', {
    state: () => ({
        height: 0,
        cartList: [],
        priceSummary: {},
        cartListCache: cache.getCache('cartList') ? cache.getCache('cartList') : [],
        productsDetail: {},
        storeList: [],
    }),
    actions: {
        // 新增後存儲到緩存本地前端緩存裡
        async addCartAction(data) {
            try {
                this.cartListCache = cache.getCache('cartList') ? cache.getCache('cartList') : []
                // 获取到当前的商品id的商品列表
                // let items = this.cartListCache.filter(item => item.product_item_id == data.product_item_id)

                // 获取到当前的商品id的商品列表,并且otheritem为空
                let index = this.cartListCache.findIndex(item => item.otheritem.length == 0 && item.product_item_id == data.product_item_id)
                if (index > -1 && data.otheritem.length == 0) {
                    this.cartListCache[index].qty = Number(this.cartListCache[index].qty) + Number(data.qty)
                } else {
                    if (data.otheritem.length > 0) {
                        for (let i = 0; i < data.qty; i++) {
                            const virtual_id = new Date().getTime() + Math.floor(Math.random() * 1000)
                            const newData = { ...data, virtual_id, qty: 1 }
                            this.cartListCache.push(newData)
                        }
                    } else {
                        // 生成一个虚拟id,用时间戳+随机数
                        data.virtual_id = new Date().getTime() + Math.floor(Math.random() * 1000)
                        this.cartListCache.push(data)
                    }
                }
                cache.setCache('cartList', this.cartListCache)
                await this.getCartListAction()
                return { status: true }
            } catch (e) {
                return { status: false }
            }
        },
        // 獲取購物車列表
        async getCartListAction() {
            this.cartListCache = cache.getCache('cartList') ? cache.getCache('cartList') : []
            let formData = new FormData()
            formData.append('products', JSON.stringify(this.cartListCache))
            const res = await getPriceSummary(formData)
            this.cartList = res.data.products.map((item, idx) => {
                return { ...item, virtual_id: this.cartListCache[idx].virtual_id }
            })
            this.productsDetail = res.data
        },
        // 獲取價格預覽顯示購物車列表,使用優惠券獲或使用address
        async getPriceSummaryAction(coupon, address) {
            this.cartListCache = cache.getCache('cartList') ? cache.getCache('cartList') : []
            let formData = new FormData()
            formData.append('products', JSON.stringify(this.cartListCache))
            formData.append('coupon_code', coupon)
            formData.append('address', JSON.stringify(address))
            const res = await getPriceSummary(formData)

            this.cartList = res.data.products.map((item, idx) => {
                return { ...item, virtual_id: this.cartListCache[idx].virtual_id }
            })

            console.log('this.cartList', this.cartList)

            this.productsDetail = res.data
        },
        // 提交購物車
        async submitCartAction() {

        },
        // 新增訂單
        async addOrderAction() {

        },
        // 清空購物車
        async clearCartAction() {
            this.cartListCache = []
            this.cartList = []
            cache.setCache('cartList', this.cartListCache)
        },
        async changeQtyAction(id, qty) {
            try {
                this.cartListCache = this.cartListCache.map(item => {
                    if (item.virtual_id == id) {
                        item.qty = Number(qty)
                    }
                    return item
                })
                cache.setCache('cartList', this.cartListCache)
                await this.getCartListAction()
                return { status: true, message: 'Change Successly!' }
            } catch (e) {
                return { status: false, message: 'Change Failed!' }
            }
        },
        // 刪除購物車
        async deleteCartAction(id) {
            // 根據id刪除指定購物車
            try {
                this.cartListCache = this.cartListCache.filter(item => item.virtual_id != id)
                cache.setCache('cartList', this.cartListCache)
                await this.getCartListAction()
                return { status: true, message: t('delete_success') }
            } catch (e) {
                return { status: false, message: 'Delete Failed!' }
            }
        },
        // 獲取門店列表
        async getStoreListAction() {
            const res = await getStoreList()
            if (res.code == 200) {
                this.storeList = res.data
              } else {
                ElMessage({
                  showClose: true,
                  message: res.message,
                  type: 'error'
                })
              }
        },
    }
})

export default useShopStore
