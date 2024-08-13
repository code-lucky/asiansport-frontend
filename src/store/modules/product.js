import { defineStore } from 'pinia'
import { getProductList, getProductDetail, getProductitemDetail, getProductOtherList, getCategoryList, getCategoryGroupList } from '@/services/api/product'
import { getWebsiteBannerDetail } from '@/services/api/banner'

const useProductStore = defineStore('product', {
    state: () => ({
        productList: [],
        pageForm: {
            page: 1,
            items_per_page: 8,
            page_total: 1
        },
        productDetail: {},
        otherItemList: {},
        categoryList: [],
        categoryGroupList: [],
        productBanner: {}
    }),
    actions: {
        //獲取产品列表
        async getProductListAction(data) {
            const res = await getProductList({ ...data })
            if (res.code == 200) {
                this.productList = this.productList.concat(res.data.list)
                this.pageForm.page_total = res.data.page_total
            } else {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
        },
        // 重置产品列表
        resetProductList() {
            this.productList = []
            this.pageForm = {
                page: 1,
                items_per_page: 8,
                page_total: 1
            }
        },

        // 获取商品详情
        async getProductDetailAction(id) {
            const res = await getProductDetail(id)
            if (res.code == 200) {
                this.productDetail = res.data
                return res.data
            } else {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
            return false
        },

        // 获取产品库存
        async getProductStock(id, option_ids) {
            let formData = new FormData()
            formData.append('option_ids', JSON.stringify(option_ids))
            const res = await getProductitemDetail(id, formData)
            if (res.code == 200) {
                return res.data
            } else {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
            return false
        },

        // 獲取Item详情
        async getProductOtherListAction(id) {
            const res = await getProductOtherList(id)
            if (res.code == 200) {
                this.otherItemList = res.data
                return res.data
            } else {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
            return false
        },

        // 获取热门产品列表
        async getHotProductListAction() {
            const res = await getProductList({ ...this.pageForm, is_popular: 'enable' })
            if (res.code == 200) {
                this.productList = this.productList.concat(res.data.list)
                this.pageForm.page_total = res.data.page_total
                return true
            } else {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
            return false
        },

        async getCategoryListAction() {
            const res = await getCategoryList()
            if (res.code == 200) {
                this.categoryList = res.data
            } else {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async getCategoryGroupListAction() {
            const res = await getCategoryGroupList()
            if (res.code == 200) {
                this.categoryGroupList = res.data
            } else {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
        },
        // 獲取product列表banner
        async getProductBannerListAction() {
            const res = await getWebsiteBannerDetail({id: 4})
            if (res.code == 200) {
                this.productBanner = res.data
                return true
            } else {
                ElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
            return false
        }
    }
})

export default useProductStore
