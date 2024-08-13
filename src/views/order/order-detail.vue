<template>
  <div class="order">
    <div class="container">
      <SidebarMenu />

      <div class="content-box">
        <div class="content-box-back">
          <a href="/order-list">
            <el-icon><ArrowLeft /></el-icon>
            <span>{{ $t('back_order_list') }}</span>
          </a>
        </div>
        <DetailBox :detail="detail" />
      </div>
    </div>
  </div>
</template>

<script setup>
import SidebarMenu from '../user/component/sidebar-menu.vue'
import DetailBox from './component/detail.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'
import { storeToRefs } from 'pinia'
import useOrderStore from '@/store/modules/order'
import useCartStore from '@/store/modules/cart'

import getLangurageType from '@/hooks/langurageType'


const orderStatus = ref({
  pending: {
    text_color: 'rgb(255, 188, 0)',
    bg_color: 'rgb(255, 188, 0, 0.2)'
  },
  paid: {
    text_color: 'rgb(255, 188, 0)',
    bg_color: 'rgb(255, 188, 0, 0.2)'
  },
  overpaid: {
    text_color: 'rgb(255, 188, 0)',
    bg_color: 'rgb(255, 188, 0, 0.2)'
  },
  fullpaid: {
    text_color: 'rgb(10, 207, 151)',
    bg_color: 'rgb(10, 207, 151, 0.2)'
  },
  canceled: {
    text_color: 'rgb(250, 92, 124, 1)',
    bg_color: 'rgb(250, 92, 124, 0.2)'
  }
})

const route = useRoute()

const useOrder = useOrderStore()
const { detail } = storeToRefs(useOrder)

const useCart = useCartStore()

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const { langurageType } = getLangurageType()

const order_no = ref(route.query.order_no ? route.query.order_no : '')
const client_phone = ref('')

const goPayment = () => {
  ElMessageBox.confirm(t('payment_tip') + '?', {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel')
  }).then(() => {
    let formData = new FormData()
    formData.append('order_id', detail.value.id)
    useCart.getBBmslAction(formData)
  })
}

const submit = async () => {
  if (!order_no.value) {
    ElMessage({
      showClose: true,
      message: t('order.order_no_hint'),
      type: 'error'
    })
    return
  }
  if (!client_phone.value) {
    ElMessage({
      showClose: true,
      message: t('order.phone_hint'),
      type: 'error'
    })
    return
  }
  await useOrder.getDetailAction({
    order_no: order_no.value,
    client_phone: client_phone.value
  })
}
onMounted(() => {
  detail.value = {}

  // 獲取路由id
  const orderId = route.params.order_id

  useOrder.getDetailAction({
    order_no: 'O24000011',
    client_phone: '13155993112'
  })
})
</script>

<style scoped lang="less">
.container {
  display: flex;
  justify-content: center;
  gap: 30px;
  
}
.order {
  padding: 40px 20px;
  background-color: rgba(250, 250, 250, 1);
}

.content-box-back {
  margin-bottom: 20px;
  a {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 16px;
  }
  a:hover{
    color: var(--color-b27437);
  }
}

.content-box {
  max-width: calc(1200px - 270px - 30px - 60px);
}

.order-search {
  width: 100%;
  min-height: 100px;
  background-color: #fff;
  box-shadow: 0 0 6px #e7e7e7;
  border-radius: 10px;
  padding: 20px;

  display: flex;
  align-items: center;
  gap: 40px;

  .search-icon {
    margin-right: 4px;
  }
}

.order-detail {
  width: 100%;
  box-shadow: 0 0 6px #e7e7e7;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 40px;
  

  .order-detail-content {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;
    .item {
      width: calc(33% - 20px);
      display: flex;

      img {
        max-width: 250px;
        width: 100%;
      }
    }

    .item-label {
      flex-shrink: 0;
      // width: 100px;
    }
    .item-name {
    }

    span {
      flex: 1;
      word-break: break-all;
    }
  }
}

.line {
  border: 0;
  height: 1px;
  background: #e7e7e7;
  margin-top: 14px;
}

// 小於1024px
@media (max-width: 1024px) {
  .order-detail {
    .order-detail-content {
      .item {
        width: calc(50% - 20px);
      }
    }
  }
}

@media (max-width: 768px) {
  .container {
    flex-direction: column;
  }
}

@media (max-width: 680px) {
  .order-detail {
    .order-detail-content {
      .item {
        width: calc(100% - 20px);
      }
    }
  }

  .order-search {
    flex-direction: column;
    gap: 20px;

    .order-search-btn {
      width: 100%;
      border-radius: 50px;
    }
  }
}
</style>
