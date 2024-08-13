import { defineStore } from 'pinia'
import { getList, getDetail, geCategorytList, getNewsRelationList } from '@/services/api/news'
import HElMessage from '@/utils/useMessage'
const useNewsStore = defineStore('news', {
    state: () => ({
        detail: {},
        list: [],
        categoryList: [],
        newsRelationList: []
    }),
    actions: {
        //獲取詳情
        async getDetailAction(data) {
            const res = await getDetail({ ...data })
            if (res.code == 200) {
                this.detail = res.data
            } else {
                HElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async getListAction(data) {
            const res = await getList({ ...data })
            if (res.code == 200) {
                this.list = this.list.concat(res.data.list)
                return res.data
            } else {
                HElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
                return {}
            }
        },
        async getCategoryListAction(data) {
            const res = await geCategorytList({ ...data })
            if (res.code == 200) {
                this.categoryList = res.data
            } else {
                HElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
        },
        async getNewsRelationListAction(data) {
            const res = await getNewsRelationList({ ...data })
            if (res.code == 200) {
                this.getNewsRelationList = res.data
            } else {
                HElMessage({
                    showClose: true,
                    message: res.message,
                    type: 'error'
                })
            }
        }
    }
})

export default useNewsStore
