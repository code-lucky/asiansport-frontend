<template>
  <div class="main">
    <!-- <div class="banner">
      <el-carousel arrow="never" :height="bannerHeight + 'px'">
        <el-carousel-item v-for="(item, index) in 1" :key="index">
          <div class="image">
            <img :src="getAssetURL('banner1.png')" alt="" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div> -->

    <div class="container">
      <div class="product-detail">
        <div class="pro-info">
          <div class="pro-info-imgs">
            <div class="info-imgs-img">
              <img
                :src="
                  productDetail && productDetail.image_list && productDetail.image_list.length > 0
                    ? productDetail.image_list[imgIndex].cover_filenamepath
                    : getAssetURL('default.png')
                "
                :class="!(productDetail && productDetail.image_list && productDetail.image_list.length > 0) ? 'default-img' : ''"
                alt=""
              />
            </div>
            <div class="info-imgs-box" v-if="productDetail.image_list && productDetail.image_list.length > 0">
              <div class="info-imgs-pre" :class="imgIndex == 0 ? 'disable-btn' : ''" @click="pre">
                <el-icon><ArrowLeftBold /></el-icon>
              </div>
              <div class="info-imgs-items" v-if="productDetail && productDetail.image_list && productDetail.image_list.length > 0">
                <template v-for="(item, idx) in productDetail.image_list" :key="idx">
                  <div
                    class="info-imgs-item"
                    v-if="Math.floor(imgIndex / 3) === Math.floor(idx / 3)"
                    :style="{ border: imgIndex == idx ? '2px solid var(--color-006838)' : '' }"
                  >
                    <img :src="item.cover_filenamepath" alt="" @click="setImgsIndex(idx)" />
                  </div>
                </template>
              </div>
              <div
                class="info-imgs-next"
                v-if="productDetail && productDetail.image_list && productDetail.image_list.length"
                :class="imgIndex == productDetail.image_list.length - 1 ? 'disable-btn' : ''"
                @click="next"
              >
                <el-icon><ArrowRightBold /></el-icon>
              </div>
            </div>
          </div>

          <div class="mobile-imgs">
            <div class="mobile-imgs-pre" :class="imgIndex == 0 ? 'disable-btn' : ''" @click="pre">
              <el-icon><ArrowLeftBold /></el-icon>
            </div>
            <div class="mobile-imgs-items">
              <img
                :src="
                  productDetail && productDetail.image_list && productDetail.image_list.length > 0 ? productDetail.image_list[imgIndex].cover_filenamepath : ''
                "
                alt=""
              />
            </div>
            <div
              class="mobile-imgs-next"
              v-if="productDetail && productDetail.image_list && productDetail.image_list.length"
              :class="imgIndex == productDetail.image_list.length - 1 ? 'disable-btn' : ''"
              @click="next"
            >
              <el-icon><ArrowRightBold /></el-icon>
            </div>

            <div class="mobile-imgs-next disable-btn" v-else>
              <el-icon><ArrowRightBold /></el-icon>
            </div>
          </div>

          <div class="pro-info-spec">
            <div class="info-spec-title">{{ productDetail[langurageType('name_')] }}</div>
            <div class="info-spec-sku" v-for="(item, idx) in productDetail.option_group" :key="idx">
              <div class="spec-sku-title">{{ item[langurageType('name_')] }}</div>
              <div class="spec-sku-items">
                <div
                  class="spec-sku-item"
                  :class="res.id == skuIndex[idx] ? 'spec-sku-item-check' : ''"
                  v-for="(res, index) in item.options"
                  :key="index"
                  @click="changeSukId(idx, res.id)"
                >
                  {{ res[langurageType('name_')] }}
                </div>
              </div>
            </div>
            <div class="info-spec-sku" v-if="otherItemList.length > 0">
              <div class="spec-sku-title">MAKE IT YOURS!</div>
              <div class="spec-sku-items">
                <div
                  class="spec-sku-item"
                  :class="otherItems.includes(item.id) ? 'spec-sku-item-check' : ''"
                  v-for="(item, idx) in otherItemList"
                  @click="changeItems(item.id)"
                >
                  {{ item[langurageType('name_')] }} + ${{ item.price }}
                </div>
              </div>
            </div>
            <div class="info-spec-qty">
              <div class="spec-qty-prices">
                <div class="spec-qty-price">${{ totalPrice }}</div>
                <!-- <div class="spec-qty-price">${{ skuDetail.price ? skuDetail.price : '0.00' }}</div> -->
                <div class="spec-qty-discount" v-if="skuDetail.original_price && skuDetail.original_price != '0.00'">${{ skuDetail.original_price }}</div>
              </div>
              <div class="spec-qty-qtys">
                <div class="spec-qty-label">Qty.</div>
                <div class="spec-qty-qtybox">
                  <el-input type="number" size="large" v-model="quantity" input-style="text-align:center;width:104px;"></el-input>
                </div>
              </div>
            </div>
            <!-- <div class="info-spec-price">${{ totalPrice }}</div> -->
            <div class="info-spec-btn">
              <el-button type="primary" @click="addCart">
                <img :src="getAssetURL('header/shop.svg')" class="el-icon--left" />
                {{ $t('add_cart') }}
              </el-button>
            </div>
          </div>
        </div>
        <div class="pro-detail">
          <h2>{{ $t('product_detail') }}</h2>
          <div class="detail-line"></div>
          <div class="detail-content" v-html="replaceContent(productDetail[langurageType('description_')])"></div>
        </div>
      </div>
    </div>

    <div class="filter-btn">
      <el-button type="primary" size="large" @click="addCart"
        ><img class="el-icon--left" :src="getAssetURL('cart.png')" alt="" />
        {{ $t('add_cart') }}
      </el-button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { getAssetURL } from '@/utils/load_assets'
import { storeToRefs } from 'pinia'
import getLangurageType from '@/hooks/langurageType'
import useProductStore from '@/store/modules/product'
import useShopStore from '@/store/modules/shop'
import { useRoute, useRouter } from 'vue-router'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'
import { emit } from '@/utils/eventbus.js'
const route = useRoute()
const router = useRouter()
const { t } = useI18n()
const useProduct = useProductStore()
const useShop = useShopStore()
const { productDetail, otherItemList } = storeToRefs(useProduct)
const { cartListCache } = storeToRefs(useShop)
useShop.getCartListAction()
const { langurageType } = getLangurageType()
const bannerHeight = ref(0)
const skuIndex = ref([])
const productId = ref(route.params.id)
const skuDetail = ref({})

const otherItems = ref([])

const quantity = ref(1)

const imgIndex = ref(0)

function resetBannerHeight() {
  const screenWidth = document.documentElement.scrollWidth
  let countWidth = 0
  let rate = 0
  let oriWidth = 1920
  let oriHeight = 400
  if (screenWidth < 1920) {
    countWidth = screenWidth
    rate = screenWidth / oriWidth
    bannerHeight.value = oriHeight * rate
  }
  if (screenWidth >= 1920) {
    countWidth = 1920
    rate = countWidth / oriWidth
    bannerHeight.value = oriHeight * rate
  }
}

const changeItems = (id) => {
  if (otherItems.value.includes(id)) {
    otherItems.value = otherItems.value.filter((item) => item !== id)
  } else {
    otherItems.value.push(id)
  }
}

const changeSukId = (index, id) => {
  skuIndex.value[index] = id
  getStockDetail()
}

const getStockDetail = () => {
  // 调用接口获取商品库存
  useProduct.getProductStock(productId.value, skuIndex.value).then((result) => {
    if (result) {
      skuDetail.value = result
    } else {
      skuDetail.value = {}
    }
  })
}

// 新增購物車
const addCart = () => {
  // 獲取新增購物車資料
  if (!quantity.value) {
    Swal.fire({
      title: 'Warning',
      text: t('enter_quantity'),
      icon: 'warning',
      confirmButtonText: t('confirm')
    })
    return
  }

  if (quantity.value > skuDetail.value.qty) {
    Swal.fire({
      title: 'Warning',
      text: t('stock_not_enough'),
      icon: 'warning',
      confirmButtonText: t('confirm')
    })
    return
  }

  const otherArr = otherItems.value.map((id) => {
    return {
      product_otheritem_id: id,
      qty: 1,
      discount_fee: 0
    }
  })

  const data = {
    product_item_id: skuDetail.value.product_item_id,
    qty: quantity.value,
    otheritem: otherArr,
    discount_fee: 0,
    skuIds: skuIndex.value,
    productId: productId.value
  }

  if (!data.product_item_id) {
    Swal.fire({
      title: 'Error',
      text: t('not_found_products'),
      icon: 'error',
      confirmButtonText: t('confirm')
    })
    return
  }

  // 判斷當前stock是否足夠

  // 獲取cacheCart中相同的商品
  const cartData = cartListCache.value.filter((item) => item.product_item_id == data.product_item_id)
  const allQty = cartData.reduce((total, item) => {
    return Number(total) + Number(item.qty)
  }, 0)

  if(Number(allQty) + Number(data.qty) > skuDetail.value.qty) {
    Swal.fire({
      title: 'Warning',
      text: t('stock_not_enough'),
      icon: 'warning',
      confirmButtonText: t('confirm')
    })
    return
  }

  useShop.addCartAction(data).then((res) => {
    ElMessage({
      message: t('add_cart_success'),
      type: 'success',
      showClose: true
    })
    emit('open-cart', true)
  })
}

const totalPrice = computed(() => {
  const price = skuDetail.value.price ? Number(skuDetail.value.price) * quantity.value : 0
  // 獲取otheritem的價格
  const otherPrice = otherItems.value.reduce((total, id) => {
    const item = otherItemList.value.find((item) => item.id === id)
    return Number(total) + Number(item.price)
  }, 0)
  console.log(otherPrice)

  return Number(Number(price) + Number(otherPrice)).toFixed(2)
})

const setImgsIndex = (index) => {
  imgIndex.value = index
}

const next = () => {
  if (imgIndex.value < productDetail.value.image_list.length - 1) {
    imgIndex.value++
  }
}

const pre = () => {
  if (imgIndex.value > 0) {
    imgIndex.value--
  }
}

// 生成一個處理富文本內容的函數
const replaceContent = (content) => {
  content = content?.replace(
    /<figure class="image"/g,
    '<figure class="image" style="display: flex; justify-content: center;padding:20px 0px;margin:0;"'
  )
  content = content?.replace(
    /<figure class="image image-style-side"/g,
    '<figure class="image" style="display: flex; justify-content: right;padding:0;"'
  )
  content = content?.replace(
    /<figure class="media"/g,
    '<figure class="media" style="margin:0;padding:0;padding: 20px 0px;"'
  )
  processOembedTags()

  // 給a鏈接添加target="_blank"屬性
  content = content?.replace(/<a/g, '<a target="_blank"')
  // 如果没有 http 或 https 开头，添加 https://
  content = content?.replace(/<a\s+(?:[^>]*?\s+)?href=(["'])(?!http:\/\/|https:\/\/|\/\/)(.*?)\1/gi, '<a href="https://$2"');
  return content
}

const processOembedTags = () => {
  const oembedElements = document.querySelectorAll('oembed')

  oembedElements.forEach(async (element) => {
    const url = element.getAttribute('url')

    // 处理 YouTube 链接
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      const videoId = url.split('v=')[1] || url.split('/')[3]
      const iframe = document.createElement('iframe')
      iframe.width = '100%'
      iframe.height = '360'
      iframe.src = `https://www.youtube.com/embed/${videoId}`
      iframe.frameborder = '0'
      iframe.allow = 'accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture'
      iframe.allowFullscreen = true
      element.parentNode.replaceChild(iframe, element)
      console.log('`https://www.youtube.com/embed/${videoId}`', `https://www.youtube.com/embed/${videoId}`)
    }
    
    // 你可以在这里添加其他类型的嵌入处理
  })
}

onMounted(() => {
  resetBannerHeight()
  window.addEventListener('resize', resetBannerHeight)

  useProduct.getProductDetailAction(productId.value).then((res) => {
    if (res) {
      skuIndex.value = res.option_group.map((item) => item.options[0].id)
      if (res.option_group.length > 0) {
        getStockDetail()
      }
      // getStockDetail()
    }
  })

  useProduct.getProductOtherListAction(productId.value)
})
onUnmounted(() => {
  window.removeEventListener('resize', resetBannerHeight)
})
</script>

<style scoped lang="less">
.main {
  background-color: var(--color-fff);

  .banner {
    max-width: 1920px;
    margin: 0 auto;

    :deep(.el-carousel__button) {
      width: 15px;
      height: 15px;
      border-radius: 50%;
    }

    :deep(.el-carousel__container) {
      overflow: hidden;
    }

    :deep(.el-carousel__indicators--outside) {
      button {
        background-color: #988250;
      }
    }

    .image {
      position: relative;

      img {
        width: 100%;
      }

      .banner-tip {
        position: absolute;
        top: 20%;
        left: 50%;
        transform: translateX(-50%);
        width: 90%;
        text-align: center;

        .banner-title {
          margin-bottom: 30px;
          font-size: 34px;
          color: var(--color-fff);
        }

        .banner-test {
          font-size: 16px;
          color: rgba(255, 255, 255, 0.65);
        }
      }
    }
  }
}

.container {
  max-width: 1200px;
  width: 100%;
  padding: 30px;
  display: flex;
  gap: 54px;
}

.product-detail {
  max-width: 1200px;
  width: 100%;
}

.pro-info {
  display: flex;
  flex-wrap: wrap;
  gap: 27px;
}

.pro-info-imgs {
  max-width: 500px;
  width: 100%;
  .info-imgs-img {
    width: 100%;
    border-radius: 15px;
    background-color: var(--color-fff);
    height: 500px;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 1px solid rgba(187,187,187,1);
    img {
      width: 100%;
      border-radius: 15px;
    }

    .default-img {
      width: 200px;
      height: 200px;
      object-fit: contain;
    }
  }

  .info-imgs-box {
    display: flex;
    align-items: center;
    gap: 25px;
    margin-top: 10px;
    .info-imgs-items {
      flex: 1;
      display: flex;
      gap: 35px;
      .info-imgs-item {
        width: 100px;
        height: 100px;
        background-color: #fff;
        display: flex;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        cursor: pointer;
        img {
          width: 100%;
          border-radius: 15px;
        }
      }
    }

    .info-imgs-pre,
    .info-imgs-next {
      width: 40px;
      height: 40px;
      background-color: #fff;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 40px;
      cursor: pointer;
    }
  }
}

.pro-info-spec {
  flex: 1;
  .info-spec-title {
    // color: var(--color-006838);
    font-size: 28px;
    font-weight: bold;
    margin-bottom: 30px;
  }
}

.info-spec-sku {
  .spec-sku-title {
    line-height: 23px;
    // color: rgba(255, 255, 255, 1);
    font-size: 16px;
    font-weight: bold;
    margin-bottom: 10px;
    margin-top: 16px;
  }

  .spec-sku-items {
    display: flex;
    gap: 10px;
    flex-wrap: wrap;
    .spec-sku-item {
      // color: rgba(255, 255, 255, 1);
      font-size: 14px;
      text-align: center;
      border: 1px solid rgba(187,187,187,1);
      min-width: 90px;
      height: 40px;
      border-radius: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
      padding: 0 10px;
    }

    .spec-sku-item-check {
      background-color: var(--color-006838);
      color: #fff;
      border: 0;
    }
  }
}

.info-spec-price {
  line-height: 50px;
  color: var(--color-006838);
  font-size: 36px;
  font-weight: bold;
  margin-top: 23px;
}

.info-spec-qty {
  display: flex;
  align-items: center;
  gap: 42px;
  flex-wrap: wrap;
  margin-top: 32px;
  .spec-qty-prices {
    display: flex;
    align-items: center;
    gap: 8px;
    .spec-qty-price {
      // color: rgba(255, 255, 255, 1);
      font-size: 28px;
      font-weight: bold;
    }
    .spec-qty-discount {
      color: rgba(189, 49, 36, 1);
      font-size: 14px;
      text-decoration: line-through;
    }
  }

  .spec-qty-qtys {
    display: flex;
    align-items: center;
    gap: 10px;
    .spec-qty-label {
      // color: rgba(255, 255, 255, 1);
      font-size: 14px;
      font-weight: bold;
    }
  }
}

.info-spec-btn {
  margin-top: 16px;
  :deep(.el-button) {
    max-width: 360px;
    width: 100%;
    height: 40px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 10px;
  }
}

.mobile-imgs {
  display: none;
  align-items: center;
  justify-content: center;
  gap: 10px;
  .mobile-imgs-pre,
  .mobile-imgs-next {
    width: 40px;
    height: 40px;
    background-color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 40px;
    flex-shrink: 0;
  }

  .mobile-imgs-items {
    max-width: 247px;
    width: 100%;
    height: 247px;
    border-radius: 10px;
    background-color: #fff;
    display: flex;
    align-items: center;
    img {
      width: 100%;
      border-radius: 10px;
    }
  }
}

.disable-btn {
  background-color: #ccc !important;
  cursor: not-allowed !important;
}

@media (max-width: 960px) {
  .pro-info-imgs {
    max-width: 400px;
  }
  .info-imgs-img {
    height: 400px !important;
  }
  .info-imgs-box {
    gap: 10px !important;
  }

  .info-imgs-items {
    gap: 15px !important;
  }
  .info-imgs-item {
    width: 90px !important;
    height: 90px !important;
  }
  .info-imgs-pre,
  .info-imgs-next {
    width: 30px;
    height: 30px;
    flex-shrink: 0;
  }
}

@media (max-width: 768px) {
  .pro-info-imgs {
    max-width: 500px;
  }
  .info-imgs-img {
    height: 500px !important;
  }
  .pro-info {
    flex-direction: column;
  }

  .info-imgs-box {
    gap: 25px !important;
  }

  .info-imgs-items {
    gap: 35px !important;
  }
  .info-imgs-item {
    width: 100px !important;
    height: 100px !important;
  }
  .info-imgs-pre,
  .info-imgs-next {
    width: 40px;
    height: 40px;
    flex-shrink: 0;
  }
}

@media (max-width: 580px) {
  .pro-info-imgs {
    display: none;
  }

  .filter-btn {
    display: block !important;
  }

  .info-spec-btn {
    display: none;
  }

  .mobile-imgs {
    display: flex;
  }

  .spec-sku-item {
    min-width: 100px !important;
    padding: 0 10px;
  }

  .info-spec-qty {
    gap: 12px;
  }

  .info-spec-price {
    margin-top: 12px;
  }

  .info-spec-qty {
    margin-top: 12px;
  }
}

@media (max-width: 396px) {
  .pro-info-imgs {
    display: none;
  }

  .spec-sku-item {
    min-width: 140px !important;
    padding: 0 10px;
  }
}

.filter-btn {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  display: none;

  :deep(.el-button) {
    width: 100%;
    border-radius: 0;
    color: var(--color-212529);
    line-height: 40px;
  }

  .img {
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
}

.detail-line {
  border: 1px solid rgba(187, 187, 187, 1);
}

h2 {
  color: #fff;
  margin-top: 100px;
  margin-bottom: 20px;
}

.detail-content {
  // color: #fff;
  margin-top: 10px;
  max-width: 1140px;
  width: 100%;
  min-height: 300px;
  overflow: hidden;
}

.detail-content img{
  max-width: 100%;
  height: auto;
}
</style>
