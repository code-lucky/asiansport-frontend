<template>
  <div class="main">
    <div class="banner">
      <div class="image">
        <img :src="productBanner.banner_filenamepath ? productBanner.banner_filenamepath : getAssetURL('banner1.png')" alt=""  :style="{ height: bannerHeight + 'px' }"/>
      </div>
      <!-- <el-carousel arrow="never" :height="bannerHeight + 'px'">
        <el-carousel-item v-for="(item, index) in bannerList" :key="index">
          
        </el-carousel-item>
      </el-carousel> -->
    </div>
    <div class="container">
      <div class="brand-menu">
        <h5>{{ $t('brands') }}</h5>
        <div class="brand-items">
          <el-checkbox-group color="var(--color-212529)" v-model="brandIds" @change="changeBrand">
            <template v-for="(item, index) in brandList" :key="index">
              <div class="brand-item">
                <el-checkbox :value="item.id">
                  <div class="item-name">{{ item[langurageType('name_')] }}</div>
                </el-checkbox>
              </div>
            </template>
          </el-checkbox-group>
        </div>
      </div>
      <div class="product">
        <div class="product-navgation">
          <el-breadcrumb :separator-icon="ArrowRight" v-if="category_id">
            <el-breadcrumb-item>List</el-breadcrumb-item>
            <el-breadcrumb-item v-for="(item, idx) in categoryData" :key="idx">{{ item }}</el-breadcrumb-item>
          </el-breadcrumb>
          <el-breadcrumb :separator-icon="ArrowRight" v-else>
            <el-breadcrumb-item>search result for</el-breadcrumb-item>
            <el-breadcrumb-item>{{ searchData }}</el-breadcrumb-item>
          </el-breadcrumb>
        </div>
        <div class="product-list">
          <div class="product-item" v-for="(item, idx) in productList" :key="idx" @click="goDetail(item.id)">
            <div class="product-img">
              <img v-if="item.cover_image" :src="item.cover_image ? item.cover_image : getAssetURL('default.png')" alt="" />
              <img v-else style="width: 100px; height: 100px;object-fit: contain;" :src="getAssetURL('default.png')" alt="" />
            </div>
            <div class="product-detail">{{ item[langurageType('name_')] }}</div>
            <div class="product-info">
              <div>${{ item.price }}</div>
              <div>
                <img :src="getAssetURL('cart-icon.svg')" />
              </div>
            </div>
          </div>
        </div>

        <MoreBtn @getMore="getProductList" v-if="pageForm.page_total > pageForm.page" />
      </div>
    </div>

    <div class="filter-btn">
      <el-button type="primary" size="large" @click="openDrawer"><img class="img" :src="getAssetURL('filter.png')" alt="" /> {{ $t('filters') }}</el-button>
    </div>

    <div class="drawer">
      <el-drawer v-model="isFilter" direction="ltr" :before-close="handleMenuClose">
        <div class="search-box">
          <input type="text" v-model="keywords" :placeholder="$t('index.search')" @keydown.enter="searchDatas" />
          <img :src="getAssetURL('header/search.svg')" @click="searchDatas" />
        </div>
        <div class="drawer-label">{{ $t('brands') }}</div>
        <div class="brand-items">
          <el-checkbox-group v-model="brandIds2">
            <template v-for="(item, index) in brandList" :key="index">
              <div class="brand-item">
                <el-checkbox :value="item.id">
                  <div class="item-name">{{ item[langurageType('name_')] }}</div>
                </el-checkbox>
              </div>
            </template>
          </el-checkbox-group>
        </div>

        <template #footer>
          <div style="flex: auto">
            <el-button type="primary" @click="confirmFilter">{{ $t('confirm') }}</el-button>
          </div>
        </template>
      </el-drawer>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { ArrowRight, Plus, Upload } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'
import MoreBtn from '@/components/more-btn/index.vue'
import { storeToRefs } from 'pinia'
import useMainStore from '@/store/modules/main'
import useBrandStore from '@/store/modules/brand'
import useProductStore from '@/store/modules/product'
import getLangurageType from '@/hooks/langurageType'
import { on, off } from '@/utils/eventbus.js'
const route = useRoute()
const router = useRouter()

const useBrand = useBrandStore()
const useMain = useMainStore()
const useProduct = useProductStore()
const { bannerList } = storeToRefs(useMain)
useMain.getWebsiteBannerAction()
const { brandList } = storeToRefs(useBrand)
useBrand.getBrandListAction()

const { productList, pageForm, productBanner } = storeToRefs(useProduct)
useProduct.getProductBannerListAction()
const { langurageType } = getLangurageType()
const brandIds = ref([])
const bannerHeight = ref(0)

// 根据条件筛选商品
const searchData = ref('')
const category_id = ref([])
const brandIds2 = ref([])
const isFilter = ref(false)

const categoryData = ref('')

const keywords = ref('')

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

const goDetail = (id) => {
  router.push('/product-detail/' + id)
}

const changeBrand = () => {
  useProduct.resetProductList()
  pageForm.value.items_per_page = 9
  useProduct.getProductListAction({
    ...pageForm.value,
    productbrand_id: JSON.stringify(brandIds.value),
    productcategory_id: category_id.value ? JSON.stringify([category_id.value]) : '',
    search_data: searchData.value
  })
}

const openDrawer = () => {
  isFilter.value = true
}

const getProductList = () => {
  pageForm.value.page++
  useProduct.getProductListAction({
    ...pageForm.value,
    productbrand_id: JSON.stringify(brandIds.value),
    productcategory_id: category_id.value ? JSON.stringify([category_id.value]) : '',
    search_data: searchData.value
  })
}

const getSearchData = (keyword) => {
  useProduct.resetProductList()
  pageForm.value.items_per_page = 9
  searchData.value = keyword

  console.log(brandIds.value, category_id.value)

  useProduct.getProductListAction({
    ...pageForm.value,
    productbrand_id: JSON.stringify(brandIds.value),
    productcategory_id: category_id.value ? JSON.stringify([category_id.value]) : '',
    search_data: searchData.value
  })
}

const searchDatas = () => {
  location.href = '/product-list?keyword=' + keywords.value
}

const confirmFilter = () => {
  useProduct.resetProductList()
  pageForm.value.items_per_page = 9
  brandIds.value = brandIds2.value
  // searchData.value = keywords.value
  useProduct.getProductListAction({
    ...pageForm.value,
    productbrand_id: JSON.stringify(brandIds.value),
    productcategory_id: category_id.value ? JSON.stringify([category_id.value]) : '',
    search_data: searchData.value
  })
  isFilter.value = false
}

onMounted(() => {
  searchData.value = route.query.keyword

  category_id.value = route.query.categoryid

  const data = route.query.category

  categoryData.value = data ? data.split(',') : []

  brandIds.value = route.query.brand ? [route.query.brand] : []

  resetBannerHeight()
  window.addEventListener('resize', resetBannerHeight)
  useProduct.resetProductList()
  pageForm.value.items_per_page = 9
  useProduct.getProductListAction({
    ...pageForm.value,
    productbrand_id: JSON.stringify(brandIds.value),
    productcategory_id: category_id.value ? JSON.stringify([category_id.value]) : '',
    search_data: searchData.value
  })

  on('search-data', getSearchData)
})
onUnmounted(() => {
  window.removeEventListener('resize', resetBannerHeight)
  off('search-data', getSearchData)
})
</script>

<style scoped lang="less">
.main {
  background-color: var(--color-fff);

  .banner {
    max-width: 1920px;
    width: 100%;
    margin: 0 auto;

    img{
      width: 100%;
    }
  }
}

.container {
  max-width: 1260px;
  width: 100%;
  padding: 30px;
  display: flex;
  align-items: flex-start;
  gap: 54px;

  h2 {
    color: #fff;
    margin-bottom: 20px;
  }
}

.brand-menu {
  width: 288px;
  display: flex;
  align-items: flex-start;
  background-color: #fff;
  border-radius: 15px;
  flex-direction: column;
  padding: 20px;
  flex-shrink: 0;
  box-shadow: 0 0 6px #e7e7e7;
  h5 {
    margin: 0;
    margin-bottom: 12px;
  }

  .brand-items {
    display: flex;
    justify-content: center;
    align-items: center;
    flex-wrap: wrap;
    
    .brand-item {
      background-color: #fff;
    }
  }
}

.product {
  margin-top: 10px;
}

:deep(.el-breadcrumb) {
  .is-link {
    color: var(--color-fff);
  }

  .el-breadcrumb__separator {
    color: var(--color-fff);
  }

  .active {
    span {
      color: var(--color-fff);
    }
  }

  .el-breadcrumb__inner {
    color: var(--color-fff);
  }
}

.product-list {
  display: flex;
  width: 100%;
  flex-wrap: wrap;
  gap: 54px;
  box-sizing: border-box;
  margin-top: 37px;
  margin-bottom: 60px;
  .product-item {
    display: flex;
    flex-direction: column;
    gap: 6px;
    cursor: pointer;
    justify-content: space-between;
    width: 250px;
    
    .product-img {
      width: 100%;
      height: 250px;
      background-color: #fff;
      border-radius: 15px;
      display: flex;
      align-items: center;
      justify-content: center;
      overflow: hidden;
      border: 1px solid rgba(187,187,187,1);
      img {
        width: 100%;
        height: 100%;
        border-radius: 15px;
      }
    }

    .product-detail {
      // color: #c09456;
      // 自動換行
      white-space: normal;
    }

    .product-info {
      // color: #fff;
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
  }

  .img {
    width: 17px;
    height: 17px;
    margin-right: 5px;
  }
}

.drawer {
  .search-box {
    position: relative;
    display: flex;
    align-items: center;
    input {
      width: 100%;
      height: 40px;
      line-height: 40px;
      padding: 0 10px;
      border-radius: 5px;
      background-color: rgba(244, 244, 244, 1);
      border: none;
      outline: none;
    }
    img {
      cursor: pointer;
      width: 30px;
      height: 30px;
      position: absolute;
      right: 10px;
    }
  }

  .drawer-label {
    font-size: 16px;
    color: var(--color-212529);
    padding: 12px 0;
  }

  .brand-item {
    :deep(.el-checkbox__label) {
      color: var(--color-212529);
    }

    :deep(.el-checkbox__input.is-checked .el-checkbox__inner) {
      background-color: var(--color-212529);
      border-color: var(--color-212529);
    }
  }

  :deep(.el-drawer) {
    min-width: 320px;
    width: 320px !important;
    .el-drawer__header {
      margin-bottom: 10px;
      font-size: 24px;
      color: var(--color-212529);
      font-weight: bold;
      h4 {
        display: flex;
        align-items: center;
        margin: 10px 0;
      }
      .cart-num {
        margin-left: 15px;
        font-size: 16px;
        font-weight: normal;
        color: var(--color-212529);
      }
    }

    .drawer-content {
      height: 100%;
      font-size: 16px;
      overflow-y: auto;
      .not-data {
        width: 100%;
        height: 100%;
        display: flex;
        align-items: center;
        justify-content: center;
      }
    }
    .footer-btn-box {
      display: flex;
      align-items: center;
      justify-content: space-between;
      .left-back-btn {
        display: flex;
        align-items: center;
        color: #000;
        cursor: pointer;
        font-size: 16px;
        .back-img {
          position: relative;
          top: 1px;
          margin-right: 2px;
        }
        .back-test {
        }
        &:hover {
          color: var(--color-b27437);
        }
      }
      .right-confirm-btn {
        .el-button {
          height: 40px;
          padding: 8px 15px;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .brand-menu {
    display: none;
  }

  .filter-btn {
    display: block;
  }

  .product-list {
    gap: 20px;
  }
}

@media (max-width: 680px) {
  .product-list {
    display: flex;
    justify-content: center;
  }
}

:deep(.el-breadcrumb__inner:hover) {
  color: var(--color-fff) !important;
}

:deep(.el-breadcrumb) {
  font-size: 16px !important;
  display: flex;
  align-items: center;
  flex-wrap: wrap;
  line-height: 28px;
}

:deep(.el-breadcrumb__item:last-child) {
  font-size: 28px !important;
}
</style>
