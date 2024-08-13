<template>
  <div class="order-detail" v-if="detail && JSON.stringify(detail) != '{}'">
    <h3>{{ $t('order.order_hint') }}</h3>
    <hr class="line" />
    <div class="order-detail-content">
      <div class="item">
        <div class="item-label">{{ $t('order.order_no') }}：</div>
        <span>{{ detail.order_no }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.order_price') }}：</div>
        <span>{{ detail.order_price ? '$' + Number(detail.order_price).toFixed(2) : '-' }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.order_status') }}：</div>
        <span :style="{ color: detail.display_order_status_text_color }">{{
          detail[langurageType('display_order_status_name_')] ? detail[langurageType('display_order_status_name_')] : '-'
        }}</span>
        <el-button
          type="primary"
          style="margin-left: 4px"
          @click="repayment(detail.id)"
          v-if="detail.display_order_status == 'pending' || detail.display_order_status == 'paid'"
          >{{ $t('repayment') }}</el-button
        >
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.order_date') }}：</div>
        <span>{{ detail.order_date ? detail.order_date : '-' }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.last_name') }}：</div>
        <span>{{ detail.address.last_name ? detail.address.last_name : '-' }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.first_name') }}：</div>
        <span>{{ detail.address.first_name ? detail.address.first_name : '-' }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.chinese_name') }}：</div>
        <span>{{ detail.address.chinese_name ? detail.address.chinese_name : '-' }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.title') }}：</div>
        <span>{{ detail.address.title ? detail.address.title : '-' }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.company_name') }}：</div>
        <span>{{ detail.address.company_name ? detail.address.company_name : '-' }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.phone') }}：</div>
        <span>{{ detail.address.phone ? detail.address.phone : '-' }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.email') }}：</div>
        <span>{{ detail.address.email ? detail.address.email : '-' }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.address') }}：</div>
        <span>{{ detail.address.shipping_address ? detail.address.shipping_address : '-' }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{ $t('order.bill_address') }}：</div>
        <span>{{ detail.address.billing_address ? detail.address.billing_address : '-' }}</span>
      </div>
    </div>
  </div>
  <div v-else>
    <el-empty :image-size="200" />
  </div>

  <div
    class="order-detail product"
    v-if="detail && JSON.stringify(detail) != '{}'"
    v-for="(item, idx) in detail.order_summary.products"
    :key="idx"
    @click="goProductDetail(item.product_id)"
  >
    <h3>{{ $t('product_qty', { qty: idx + 1 }) }}</h3>
    <hr class="line" />
    <div class="order-detail-contents">
      <div class="item">
        <div class="item-label">{{ $t('order.product_name') }}：</div>
        <div>
          <span>{{ item[langurageType('product_name_')] }} - {{ item[langurageType('product_item_name_')] }}</span>
          <!-- <div class="other-items">
            <div v-for="res in item.otheritem" :key="res.id">
              <el-tag type="warning">{{ res[langurageType('product_name_')] }} + ${{ res.price }}</el-tag>
            </div>
          </div> -->
        </div>
      </div>
      <div class="item other-box">
        <div class="item">
          <div class="item-label">{{ $t('order.product_price') }}：</div>
          <span>{{ item.price ? '$' + Number(item.price).toFixed(2) : '-' }}</span>
        </div>
        <div class="item">
          <div class="item-label">{{ $t('order.product_quantity') }}：</div>
          <span>{{ item.qty ? item.qty : '-' }}</span>
        </div>
      </div>
    </div>
  </div>

  <div class="order-detail" v-if="detail && JSON.stringify(detail) != '{}'">
    <h3>{{$t('shipping')}}</h3>
    <hr class="line" />
    <div class="order-detail-contents">
      <div class="item">
        <div class="item-label">{{$t('delivery_to')}}：</div>
        <span>{{ detail.address[langurageType('billingarea_name_')] ? detail.address[langurageType('billingarea_name_')] : detail.address.billingarea_name_en }}</span>
      </div>
      <div class="item">
        <div class="item-label">{{$t('shipping_price')}}：</div>
        <span>${{ detail.shipping_price ? Number(detail.shipping_price).toFixed(2) : '-' }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'
import { storeToRefs } from 'pinia'
import useOrderStore from '@/store/modules/order'
import useCartStore from '@/store/modules/cart'

import getLangurageType from '@/hooks/langurageType'
const useOrder = useOrderStore()
const prop = defineProps({
  detail: {
    type: String,
    default: Object
  }
})

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
    formData.append('order_id', prop.detail.id)
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
}

const goProductDetail = (id) => {
  location.href = `/product-detail/${id}`
}

const repayment = (id) => {
  let dataForm = new FormData()
  dataForm.append('order_id', id)
  // 加載狀態
  let loading = ElLoading.service({
    lock: true,
    text: 'Loading',
    customClass: 'osloading'
  })
  useOrder.getBBmslAction(dataForm).then((result) => {
    if (result.code == 200) {
      location.href = result.data.checkoutUrl
      loading.close()
    } else {
      Swal.fire({
        text: result.message,
        icon: 'error',
        confirmButtonText: t('got_it')
      })
      loading.close()
    }
  })
}
</script>

<style scoped lang="less">
.order {
  padding: 40px 20px;
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
  background-color: #fff;
  .order-detail-content {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 20px;
    margin-top: 20px;

    .item {
      width: calc(33% - 20px);
      display: flex;
      align-items: center;

      img {
        max-width: 250px;
        width: 100%;
      }
    }

    .item-label {
      flex-shrink: 0;
      line-height: 20px;
      // width: 100px;
    }
    .item-name {
    }

    span {
      // flex: 1;
      word-break: break-all;
      line-height: 20px;
    }
  }

  .order-detail-contents {
    display: flex;
    flex-wrap: wrap;
    gap: 20px;
    margin-top: 20px;

    .item {
      width: calc(50% - 20px);
      display: flex;

      img {
        max-width: 250px;
        width: 100%;
      }
    }

    .item-label {
      flex-shrink: 0;
      line-height: 20px;
      // width: 100px;
    }
    .item-name {
    }

    span {
      // flex: 1;
      word-break: break-all;
      line-height: 20px;
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
    .order-detail-content,
    .order-detail-contents {
      .item {
        width: calc(100% - 20px);
      }
    }

    .other-box {
      display: flex;
      flex-wrap: wrap;
      gap: 20px;
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

.default-tag {
  border: 0;
  margin-right: 4px;
}

.other-items {
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  margin-top: 6px;
}

.product {
  cursor: pointer;
}
</style>
