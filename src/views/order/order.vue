<template>
  <div class="order">
    <div class="container">
      <div class="order-search">
        <el-input size="large" v-model="order_no" clearable :placeholder="$t('order.order_no_hint')"> </el-input>

        <el-input size="large" v-model="client_phone" clearable :placeholder="$t('order.phone_hint')"> </el-input>

        <el-button size="large" type="primary" @click="submit" class="order-search-btn"
          ><el-icon class="search-icon"><Search /></el-icon>{{ $t('order.search') }}</el-button
        >
      </div>

      <DetailBox :detail="detail" />
    </div>
  </div>
</template>

<script setup>
import DetailBox from './component/detail.vue'
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'
import { storeToRefs } from 'pinia'
import useOrderStore from '@/store/modules/order'
import useCartStore from '@/store/modules/cart'

import getLangurageType from '@/hooks/langurageType'

const route = useRoute()

const useOrder = useOrderStore()
const { detail } = storeToRefs(useOrder)

const useCart = useCartStore()

import { useI18n } from 'vue-i18n'
const { t, locale } = useI18n()
const { langurageType } = getLangurageType()

const order_no = ref(route.query.order_no ? route.query.order_no : '')
const client_phone = ref(route.query.phone ? route.query.phone : '')

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

  if (route.query.order_no && route.query.phone) {
    useOrder.getDetailAction({
      order_no: order_no.value,
      client_phone: client_phone.value
    })
  }
})
</script>

<style scoped lang="less">
.order {
  padding: 40px 20px;
  background-color: var(--color-ffffff);
}

.order-search {
  width: 100%;
  min-height: 100px;
  background-color: #fff;
  box-shadow: 0 0 6px #e7e7e7;
  border-radius: 10px;
  padding: 20px;
  margin-bottom: 30px;
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
  margin-top: 40px;

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
