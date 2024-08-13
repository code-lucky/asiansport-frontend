<template>
  <div class="main">
    <div class="banner">
      <el-carousel arrow="never" :height="bannerHeight + 'px'">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          <div class="image">
            <img :src="item.banner_filename" alt="" />
          </div>
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="container">
      <h2>{{ $t('our_brands') }}</h2>
      <div class="our-brand">
        <div class="brand-content">
          <!-- <div class="brand-pre" :class="brandIndex == 1 ? 'disable-btn' : ''" @click="pre">
            <el-icon><ArrowLeftBold /></el-icon>
          </div> -->
          <!-- <div class="brand-list">
            <template v-for="(item, idx) in brandList">
              <div class="brand-item" v-if="idx < brandNumber * brandIndex && idx > brandNumber * brandIndex - brandNumber - 1" @click="goProductList(item.id)">
                <img :src="item.cover_filenamepath ? item.cover_filenamepath : getAssetURL('default.png')" alt="" />
              </div>
            </template>
          </div> -->
          <div class="brand-list" v-if="brandList.length">
            <el-carousel :interval="0" indicator-position="none" style="width: 100%" :activeIndex="brandIndex" arrow="always" @change="changeBrandIndex()" autoplay="false">
              <el-carousel-item v-for="(i, index) in Math.ceil(Number(brandList.length / brandNumber))" :key="index" class="brand-box">
                <div class="brand-content-box">
                  <template v-for="(item, idx) in brandList" :key="idx">
                    <div
                      class="brand-item"
                      v-if="idx < brandNumber * (index + 1) && idx > brandNumber * (index + 1) - brandNumber - 1"
                      @click="goProductList(item.id)"
                    >
                      <img :src="item.cover_filenamepath ? item.cover_filenamepath : getAssetURL('default.png')" alt="" />
                    </div>
                  </template>
                </div>
              </el-carousel-item>
            </el-carousel>
          </div>
          <!-- <div class="brand-next" :class="isLastPage ? 'disable-btn' : ''" @click="next">
            <el-icon><ArrowRightBold /></el-icon>
          </div> -->
        </div>
      </div>

      <div class="product-content">
        <h2>{{ $t('popular_products') }}</h2>

        <div class="product-list">
          <div class="product-item" v-for="(item, idx) in productList" :key="idx" @click="getDetail(item)">
            <div class="product-img">
              <img v-if="item.cover_image" :src="item.cover_image ? item.cover_image : getAssetURL('default.png')" alt="" />
              <img v-else style="width: 100px; height: 100px" :src="getAssetURL('default.png')" alt="" />
            </div>
            <div class="product-detail">{{ item[langurageType('name_')] }}</div>
            <div class="product-info">
              <div>${{ item.price }}</div>
              <div>
                <img :src="getAssetURL('cart-icon.png')" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <MoreBtn @getMore="getProductList" v-if="pageForm.page_total > pageForm.page" />
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted, computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'
import MoreBtn from '@/components/more-btn/index.vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/modules/main'
import useBrandStore from '@/store/modules/brand'
import useProductStore from '@/store/modules/product'
import getLangurageType from '@/hooks/langurageType'
const route = useRoute()
const router = useRouter()
const useMain = useMainStore()
const useBrand = useBrandStore()
const useProduct = useProductStore()
const brandNumber = ref(5)
const brandIndex = ref(0)

const isLastPage = ref(false)

const { bannerList } = storeToRefs(useMain)
const { brandList } = storeToRefs(useBrand)
const { productList, pageForm } = storeToRefs(useProduct)

const eventList = ref([])
useMain.getWebsiteBannerAction()
useProduct.getHotProductListAction(pageForm.value)
const { langurageType } = getLangurageType()

// 获取brand列表
useBrand.getBrandListAction()

const getProductList = async () => {
  pageForm.value.page++
  await useProduct.getHotProductListAction(pageForm.value)
}

const bannerHeight = ref(0)

const changeBrandIndex = (current, prev) => {
  console.log('current', current)
  brandIndex.value = current
}

function resetBannerHeight() {
  const screenWidth = document.documentElement.scrollWidth
  let countWidth = 0
  let rate = 0
  let oriWidth = 1920
  let oriHeight = 600
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

const resetBrandNumber = () => {
  // brandIndex.value = 0
  // isLastPage.value = false
  // const containerWidth = document.querySelector('.brand-list').offsetWidth
  // const itemWidth = 230 // 每个brand-item的宽度
  // brandNumber.value = Math.floor(containerWidth / itemWidth)
  // if (brandNumber.value > 5) {
  //   brandNumber.value = 5
  // } else if (brandNumber.value < 1) {
  //   brandNumber.value = 1
  // }

  // 頁面大小小於768px
  if (document.documentElement.scrollWidth < 680) {
    brandIndex.value = 0
    brandNumber.value = 1
  } else if (document.documentElement.scrollWidth < 1200) {
    brandIndex.value = 0
    brandNumber.value = 3
  } else if (document.documentElement.scrollWidth < 800) {
    brandIndex.value = 0
    brandNumber.value = 2
  } else {
    brandIndex.value = 0
    brandNumber.value = 5
  }
}

const getDetail = (item) => {
  console.log(item)
  router.push('/product-detail/' + item.id)
}

const pre = () => {
  if (brandIndex.value > 1) {
    brandIndex.value--
    isLastPage.value = false
  }
}

const next = () => {
  if (brandIndex.value < Math.ceil(brandList.value.length / brandNumber.value)) {
    brandIndex.value++
  }

  // 增加後判斷是否為最後一頁,如果是最後一頁則設置一個標識
  if (brandIndex.value == Math.ceil(brandList.value.length / brandNumber.value)) {
    isLastPage.value = true
  }
}

const goProductList = (id) => {
  location.href = '/product-list?brand=' + id
}

onMounted(() => {
  resetBannerHeight()
  resetBrandNumber()
  window.addEventListener('resize', resetBannerHeight)
  window.addEventListener('resize', resetBrandNumber)

  useProduct.resetProductList()
})
onUnmounted(() => {
  window.removeEventListener('resize', resetBannerHeight)
  window.removeEventListener('resize', resetBrandNumber)
})
</script>

<style scoped lang="less">
.main {
  background-color: var(--color-333333);
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
  max-width: 1280px;
  width: 100%;
  padding: 30px 0px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  h2 {
    color: #fff;
    margin-bottom: 20px;
  }
}

.our-brand {
  width: 100%;
  .brand-content {
    width: 100%;
    display: flex;
    align-items: center;
    gap: 30px;
    .brand-pre,
    .brand-next {
      width: 40px;
      height: 40px;
      background-color: #fff;
      border-radius: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      cursor: pointer;
    }
    .brand-list {
      width: calc(100% - 80px - 80px);
      display: flex;
      justify-content: center;
      flex: 1;
      gap: 28px;
      .brand-item {
        width: 200px;
        height: 200px;
        background-color: #fff;
        border-radius: 15px;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;
        cursor: pointer;
        img {
          object-fit: cover;
          width: 100%;
          height: 100%;
        }
      }
    }
  }
}

.product-content {
  max-width: 1200px;
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  h2 {
    color: #fff;
    font-size: 24px;
    text-align: center;
    margin-bottom: 28px;
  }
  .product-list {
    padding: 0 30px;
    display: grid;
    width: 100%;
    flex-wrap: wrap;
    grid-template-columns: repeat(4, 1fr);
    gap: 48px;
    box-sizing: border-box;
    .product-item {
      display: flex;
      flex-direction: column;
      gap: 6px;
      cursor: pointer;
      justify-content: space-between;
      .product-img {
        width: 100%;
        height: 250px;
        background-color: #fff;
        border-radius: 15px;
        display: flex;
        align-items: center;
        justify-content: center;
        overflow: hidden;

        img {
          width: 100%;
          height: 100%;
        }
      }

      .product-detail {
        color: #c09456;
        // 自動換行
        white-space: normal;
      }

      .product-info {
        color: #fff;
        display: flex;
        align-items: center;
        justify-content: space-between;
      }
    }

    .product-img img:hover {
      transform: scale(1.05);
      transition: transform 0.3s ease;
    }
  }
}

.disable-btn {
  background-color: #ccc !important;
  cursor: not-allowed !important;
}

.brand-box {
  display: flex;
  align-items: center;
  justify-content: center;
}

.brand-content-box {
  gap: 28px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
}

:deep(.brand-list .el-carousel__arrow--left) {
  background-color: #fff;
  color: #333;
}

:deep(.brand-list .el-carousel__arrow--right) {
  background-color: #fff;
  color: #333;
}

@media (max-width: 1310px) {
  .brand-content {
    padding: 0 20px;
  }
}

@media (max-width: 1200px) {
  .product-content {
    .product-list {
      grid-template-columns: repeat(3, 1fr);

      .product-item {
        width: 250px;
      }
    }
  }
}

@media (max-width: 900px) {
  .product-content {
    .product-list {
      display: flex;
      justify-content: center;
    }
  }
}

// @media (max-width: 600px) {
//   .brand-list {
//     display: flex;
//     justify-content: center !important;
//     gap: 20px;
//   }
// }

// @media (max-width: 620px) {
//   .brand-list {
//     flex: 0 !important;
//   }
//   .brand-content {
//     justify-content: center !important;
//   }
// }

// @media (max-width: 420px) {
//   .brand-content {
//     gap: 10px !important;
//   }
// }

@media (max-width: 680px) {
  .brand-content-box {
    justify-content: center;
  }
}
</style>
