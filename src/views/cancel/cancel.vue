<template>
  <div class="payment-success">
    <div class="image-icon">
      <el-icon style="color: #f56c6c"><CircleCloseFilled /></el-icon>
    </div>
    <div>
      <h1>{{ $t('cancel_tip') }}</h1>
    </div>
    <div class="payment-info">
      <div class="info-test mb10">{{ $t('test_tip0') }}</div>
      <div class="info-test mb10">{{ $t('test_tip1') }} {{ order_no }}</div>
      <div class="info-test mb10">
        {{ $t('test_tip2') }}
        <a style="color: blue" :href="`https://www.sportsFay.com/order?order_no=${order_no}`" target="_blank">{{ $t('index.order_inquiry') }}</a
        >{{ $t('test_tip6') }}。
      </div>
      <div class="info-test">{{ $t('test_tip3') }}： <a style="color: blue" href="https://info@sportsFay.com" target="_blank">info@sportsFay.com</a></div>
      <!-- <div class="info-test">{{ $t('phone_tip') }} : 96530815</div> -->
      <!-- <div class="info-test">電郵: info@flying-journey.com.hk</div> -->
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'
import useShopStore from '@/store/modules/shop'
import { storeToRefs } from 'pinia'

const router = useRouter()
const route = useRoute()

const order_no = ref(route.query.order_no ?? '')

const useShop = useShopStore()
onMounted(() => {
  // 清空購物車
  // useShop.clearCartAction()
})
</script>
<style scoped lang="less">
.image-icon {
  font-size: 190px;
  height: 200px;
}
.payment-success {
  padding: 40px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background-color: var(--color-fff);
  // color: #FFF;
}

.payment-info {
  margin-top: 20px;
  font-size: 20px;
  line-height: 28px;
  text-align: center;
}
.mb10 {
  margin-bottom: 15px;
}

@media screen and (max-width: 768px) {
  .image-icon {
    font-size: 140px;
    height: 150px;
  }
  .payment-success {
    padding: 40px 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
  }
  h1 {
    font-size: 25px;
  }

  .payment-info {
    margin-top: 20px;
    font-size: 18px;
    line-height: 24px;
    text-align: center;
  }
  .mb10 {
    margin-bottom: 10px;
  }
}

a{
  color: var(--color-006838) !important;
  text-decoration: underline;
}
</style>
