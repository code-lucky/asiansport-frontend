<template>
  <div class="header" ref="headerRef">
    <!-- pc端 -->
    <div v-if="screenWidth > 768">
      <div class="container">
        <div class="header-frame">
          <a href="/"><img class="img" :src="getAssetURL('logos.png')" alt="" /></a>
          <div class="search-box">
            <input type="text" v-model="keyword" :placeholder="$t('index.search')" @keydown.enter="searchHandle" />
            <img :src="getAssetURL('header/search.svg')" @click="searchHandle" />
          </div>
          <div class="nav-list">
            <template v-for="(item, index) in menuList" :key="index">
              <div class="nav-item" @click="menuHandle(item)">
                <el-select v-if="item.id == 1" v-model="textType" placeholder="Select" @change="changeLangurage" :teleported="false">
                  <template #prefix>
                    <div class="prefix">
                      <img class="img-icon" :style="{ width: `${item.width}px`, height: `${item.height}px` }" :src="item.icon" alt="" /><a href="#">{{
                        changeTxt
                      }}</a>
                    </div>
                  </template>
                  <el-option v-for="item in options" :key="item.value" :label="item.name" :value="item.value" />
                </el-select>

                <a :href="item.path" v-if="item.id != 1">
                  <template v-if="item.id == 2">
                    <el-badge :value="cartListCache.length" type="primary">
                      <img :src="item.icon" alt="" :style="{ width: `${item.width}px`, height: `${item.height}px` }" />
                    </el-badge>
                  </template>
                  <img :src="item.icon" alt="" v-else :style="{ width: `${item.width}px`, height: `${item.height}px` }" />
                  <span :style="{ marginLeft: item.id == 2 ? '6px' : '0px' }">{{ $t(item.key) }}</span>
                </a>
              </div>
            </template>
          </div>
        </div>
      </div>
      <div class="header-nav">
        <div class="header-nav-box">
          <div class="header-nav-icon">
            <a href="/"><img :src="getAssetURL('header/home.svg')" alt="" /></a>
          </div>
          <div class="header-nav-item" v-for="(item, idx) in categoryGroupList" :key="idx" @mouseenter="onMouseEnter(idx)" @mouseleave="onMouseLeave">
            <div>
              {{ item[langurageType('name_')] }}
            </div>
          </div>
        </div>
      </div>
      <div class="hover-nav-box" v-if="hoverIndex !== -1" @mouseenter="onMouseEnterHoverBox" @mouseleave="onMouseLeaveHoverBox">
        <div class="hover-nav-content">
          <div class="nav-item-box" v-for="res in categoryGroupList[hoverIndex] ? categoryGroupList[hoverIndex].list : []" :key="res.id">
            <div class="nav-item-label">{{ res[langurageType('name_')] }}</div>
            <div class="nav-item-child">
              <div v-for="result in res.list" :key="result.id">
                <a
                  :href="`/product-list?categoryid=${result.id}&category=${encodeURIComponent(`${categoryGroupList[hoverIndex][langurageType('name_')]},${res[langurageType('name_')]},${result[langurageType('name_')]}`)}`"
                  >{{ result[langurageType('name_')] }}</a
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- 移动端 -->
    <div v-else class="mobile">
      <div class="mobile-logo">
        <a class="logo-image" href="/"><img class="img" :src="getAssetURL('logos.png')" alt="" /></a>
      </div>
      <div class="mobile-icons">
        <div class="mobile-right">
          <div class="mobile-item">
            <a href="#" @click="isShowMenu = true">
              <img :src="getAssetURL('header/menu.svg')" style="height: 30px" />
            </a>
          </div>
          <div class="mobile-item" v-for="(item, idx) in menuList" :key="idx" @click="menuHandle(item)">
            <el-select v-if="item.id == 1" v-model="textType" placeholder="Select" @change="changeLangurage" :teleported="false">
              <template #prefix>
                <div class="prefix">
                  <img class="img-icon" :src="item.icon" alt="" :style="{ width: `${item.width}px !important`, height: `${item.height}px !important` }" />
                </div>
              </template>
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.name"
                :value="item.value"
                :style="{ width: `${item.width}px`, height: `${item.height}px` }"
              />
            </el-select>
            <a :href="item.path" v-else>
              <el-badge color="var(--color-006838)":value="cartListCache.length" type=" " v-if="item.id == 2">
                <img :src="item.icon" :style="{ width: `${item.width}px`, height: `${item.height}px` }" />
              </el-badge>
              <img :src="item.icon" v-else :style="{ width: `${item.width}px`, height: `${item.height}px` }" />
            </a>
          </div>
        </div>
      </div>
      <div class="mobile-search" v-if="showSearch">
        <input type="text" v-model="keyword" :placeholder="$t('index.search')" @keydown.enter="searchHandle" />
        <img :src="getAssetURL('header/search.svg')" @click="searchHandle" />
      </div>
    </div>
    <div class="drawer">
      <el-drawer v-model="drawer" direction="rtl" size="75%">
        <template #header>
          <h4>
            {{ $t('your_cart') }} <span class="cart-num">({{ cartListCache.length }} {{ cartListCache.length > 1 ? $t('items') : $t('item') }})</span>
          </h4>
        </template>
        <template #default>
          <div class="drawer-content">
            <template v-if="cartListCache.length">
              <div class="goods-list">
                <template v-for="item in cartList" :key="item.id">
                  <div class="goods-item">
                    <div>
                      <div class="goods-image" @click="goEvent(item.id)">
                        <img v-if="item.cover_image" class="img" :src="item.cover_image ? item.cover_image : getAssetURL('default.png')" alt="" />
                        <img v-else style="width: 100px; height: 100px" lass="img" :src="getAssetURL('default.png')" alt="" />
                      </div>
                    </div>
                    <div class="goods-content">
                      <div class="goods-content-label">{{ item[langurageType('name_')] }}</div>
                      <div class="goods-content-items" v-for="result in item.options" :key="result.id">
                        <div class="goods-content-label">{{ result[langurageType('product_optiongroup_name_')] }}:</div>
                        <div class="goods-content-item">{{ result[langurageType('product_optiongroup_option_name_')] }}</div>
                      </div>
                      <div class="goods-content-items-line">
                        <div class="goods-content-label" v-if="item.otheritem.length > 0">Your special:</div>
                        <div class="goods-content-item" v-for="result in item.otheritem" :key="result.id">
                          {{ result[langurageType('name_')] }} + ${{ result.price }}
                        </div>
                      </div>
                      <div class="goods-content-qty">
                        <div class="content-qty-label">Qty.</div>
                        <el-input
                          class="content-qty-input"
                          size="large"
                          type="number"
                          style="text-align: center !important; width: 104px"
                          v-model="item.qty"
                          :disabled="item.otheritem.length > 0"
                          @input="changeQty(item)"
                        ></el-input>
                      </div>
                      <div class="goods-content-info">
                        <!-- {{ item.otherItem }}{{  }} -->
                        <div class="content-info-price">${{ calculateUnitPrice(item.price, item.qty, item.otheritem) }}</div>
                        <div class="content-info-del" @click="delCart(item.virtual_id)">
                          <img :src="getAssetURL('trash.svg')" />
                        </div>
                      </div>
                    </div>
                  </div>
                </template>
              </div>
            </template>
            <template v-else>
              <div class="not-data">
                <el-empty :description="$t('empty')" />
              </div>
            </template>
          </div>
        </template>
        <template #footer>
          <div class="cart-price">
            <div class="total-price">
              <span class="total-tip">{{ $t('total_price') }}:</span><span class="price">${{ Number(productsDetail.difference_amount).toFixed(2) }}</span>
            </div>
          </div>
          <div style="flex: auto">
            <div class="footer-btn-box">
              <div class="left-back-btn" @click="drawer = false">
                <div class="back-img">
                  <el-icon class="back-img"><ArrowLeft /></el-icon>
                </div>
                <div class="back-test">{{ $t('back_to_event') }}</div>
              </div>
              <div class="right-confirm-btn">
                <el-button type="primary" @click="goCheckout"
                  >{{ $t('proceed_to_checkout') }}<el-icon class="el-icon--left"><ArrowRight /></el-icon
                ></el-button>
              </div>
            </div>
          </div>
        </template>
      </el-drawer>
    </div>

    <div class="drawer">
      <el-drawer v-model="isShowMenu" direction="ltr" :before-close="handleMenuClose">
        <div class="search-box">
          <input type="text" v-model="keyword" :placeholder="$t('index.search')" @keydown.enter="searchHandle" />
          <img :src="getAssetURL('header/search.svg')" @click="searchHandle" />
        </div>
        <div class="drawer-menu">
          <div class="drawer-item" v-for="(item, idx) in categoryGroupList" :key="idx">
            <div class="drawer-item-label" @click="item.isOpen = !item.isOpen">
              {{ item[langurageType('name_')] }}<el-icon><ArrowDown v-if="item.isOpen" /><ArrowRight v-else /></el-icon>
            </div>
            <div class="drawer-item-childs" v-if="item.isOpen" v-for="res in item.list" :key="res.id">
              <div class="item-child-title">{{ res[langurageType('name_')] }}</div>
              <div class="item-child-items">
                <div class="item-child-item" v-for="result in res.list" :key="result.id">
                  <a
                    :href="`/product-list?categoryid=${result.id}&category=${encodeURIComponent(`${item[langurageType('name_')]},${res[langurageType('name_')]},${result[langurageType('name_')]}`)}`"
                    >{{ result[langurageType('name_')] }}</a
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </el-drawer>
    </div>

    <el-dialog v-model="delCartTip" title="Warning" width="500" align-center>
      <span>{{ $t('is_del_item') }}</span>
      <template #footer>
        <div class="dialog-footer">
          <el-button @click="delCartTip = false">{{ $t('cancel') }}</el-button>
          <el-button type="primary" @click="confirmCart"> {{ $t('confirm') }} </el-button>
        </div>
      </template>
    </el-dialog>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount, computed, watchEffect, onUnmounted } from 'vue'
import { Search } from '@element-plus/icons-vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

import { storeToRefs } from 'pinia'
import useMainStore from '@/store/modules/main'
import useShopStore from '@/store/modules/shop'
import ProductStore from '@/store/modules/product'

import { useI18n } from 'vue-i18n'
import getLangurageType from '@/hooks/langurageType'

import { debounce } from '@/utils/util.js'
import { on, off, emit } from '@/utils/eventbus.js'
const route = useRoute()
const router = useRouter()

const useMain = useMainStore()
const { height, textType } = storeToRefs(useMain)

const useShop = useShopStore()
const { cartListCache, cartList, productsDetail } = storeToRefs(useShop)
useShop.getCartListAction()

const useProduct = ProductStore()
const { categoryGroupList } = storeToRefs(useProduct)
useProduct.getCategoryGroupListAction()
const keyword = ref('')

watchEffect(() => {
  keyword.value = route.query.eventname ? route.query.eventname : ''
})

const delCartTip = ref(false)

const delCartId = ref(0)

const { langurageType } = getLangurageType()

const screenWidth = ref(window.innerWidth)
const showSearch = ref(false)

const hoverIndex = ref(-1)
const isHovering = ref(false)

const changeHoverIndex = (index) => {
  hoverIndex.value = index
}

const hoverTimeout = ref(null)

const menuList = [
  {
    id: 1,
    name: '繁體中文',
    path: '#',
    icon: getAssetURL('header/globe.svg'),
    width: 28,
    height: 28
  },
  {
    id: 2,
    name: '購物車',
    path: '#',
    icon: getAssetURL('header/shop.svg'),
    key: 'index.cart',
    width: 28,
    height: 28
  },
  {
    id: 3,
    name: '訂單',
    path: '/order',
    icon: getAssetURL('order.svg'),
    key: 'index.order',
    width: 32,
    height: 32
  }
  // {
  //   id: 4,
  //   name: '會員',
  //   path: '/login',
  //   icon: getAssetURL('header/user.svg'),
  //   key: 'index.user',
  //   width: 28,
  //   height: 24
  // }
]

const navList = [
  {
    name: 'EVENT',
    path: '/product-list',
    label: 'Clothing'
  },
  {
    name: 'CONTACT',
    path: '/contact',
    label: 'Gloves'
  },
  {
    name: 'index.order_inquiry',
    path: '/order',
    label: 'Weapon & Accessories'
  }
]

const navLists = ref([
  {
    id: 1,
    label: 'Clothing',
    isOpen: false,
    children: [
      {
        id: 1,
        label: 'Extremities Protectors',
        children: [
          {
            id: 1,
            label: 'Gloves'
          }
        ],
        children: [
          {
            id: 1,
            label: 'Gloves'
          }
        ],
        children: [
          {
            id: 1,
            label: 'Gloves'
          }
        ]
      }
    ]
  },
  {
    id: 1,
    label: 'Clothing',
    isOpen: false,
    children: [
      {
        id: 1,
        label: 'Extremities Protectors',
        children: [
          {
            id: 1,
            label: 'Gloves'
          }
        ],
        children: [
          {
            id: 1,
            label: 'Gloves'
          }
        ],
        children: [
          {
            id: 1,
            label: 'Gloves'
          }
        ]
      }
    ]
  }
])
const headerRef = ref(null)
const isShowMenu = ref(false)
const drawer = ref(false)

const options = [
  {
    value: 'tc',
    name: '繁體中文'
  },
  {
    value: 'en',
    name: 'ENG'
  }
]

const changeTxt = computed(() => {
  let obj = options.find((item) => {
    return textType.value === item.value
  })
  if (obj) {
    return obj.name
  } else {
    return ''
  }
})

const { locale, t } = useI18n()
const changeLangurage = (test) => {
  textType.value = test
  if (test === 'tc') {
    locale.value = 'zh'
    localStorage.setItem('lang', 'zh')
  } else if (test === 'sc') {
    locale.value = 'sc'
    localStorage.setItem('lang', 'sc')
  } else {
    locale.value = 'en'
    localStorage.setItem('lang', 'en')
  }
  window.location.reload()
}

const goCheckout = () => {
  if (cartList.value.length) {
    drawer.value = false
    router.push('/create-order')
  } else {
    ElMessage({
      showClose: true,
      message: t('cart_tip'),
      type: 'error'
    })
  }
}

const changeQty = (item) => {
  console.log(item)
  // 限制只能輸入正整數
  item.qty = item.qty.replace(/[^\d]/g, '')
  item.qty = item.qty < 1 ? 1 : item.qty
  changeQtyHandle(item)
}

const changeQtyHandle = debounce((item) => {
  let qty = 0
  let resultData = []
  // 用product_item_id去查找是否有相同的商品，如果有就把qty加起來
  cartListCache.value.forEach((res) => {
    if (res.product_item_id === item.item_id) {
      if (res.virtual_id === item.virtual_id) {
        qty = Number(item.qty) + Number(qty)
      } else {
        qty = Number(res.qty) + Number(qty)
      }
      resultData.push(res)
    }
  })
  // 獲取當前product_item_id的qty
  useProduct.getProductStock(resultData[0].productId, resultData[0].skuIds).then((result) => {
    if (result) {
      console.log(result.qty)
      if (result.qty < qty) {
        ElMessage({
          showClose: true,
          message: t('stock_not_enough'),
          type: 'error'
        })
        // 如果庫存不足,要先減去其他商品的qty，然後得出當前商品的qty
        // 獲取其他商品的qty總和
        const otherData = resultData.filter((data) => {
          return data.virtual_id !== item.virtual_id
        })

        const otherQty = otherData.reduce((total, item) => {
          return Number(total) + Number(item.qty)
        }, 0)

        item.qty = Number(result.qty) - Number(otherQty)
        useShop.changeQtyAction(item.virtual_id, item.qty)
      } else {
        useShop.changeQtyAction(item.virtual_id, item.qty)
      }
      const resultQty = result.qty
    }
  })
})

const calculateUnitPrice = (price, qty, otherItem) => {
  const uniPrice = Number(price) * Number(qty)

  console.log(otherItem)

  const otherPrice = otherItem.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  return Number(Number(uniPrice) + Number(otherPrice)).toFixed(2)
}

const openCart = () => {
  drawer.value = true
  // 重新請求一下
  useShop.getCartListAction()
}

// 去登录界面
const goToUser = () => {
  router.push('/login')
}

// 去订单界面
const goToOrder = () => {
  router.push('/order')
}

const confirmCart = () => {
  useShop.deleteCartAction(delCartId.value).then((res) => {
    if (res.status) {
      ElMessage({
        showClose: true,
        message: res.message,
        type: 'success'
      })
      useShop.getCartListAction()
      delCartTip.value = false
    } else {
      ElMessage({
        showClose: true,
        message: res.message,
        type: 'error'
      })
    }
  })
}

const delCart = (id) => {
  delCartTip.value = true
  delCartId.value = id
}

const goEvent = (id) => {
  router.push('/product-detail/' + id)
  drawer.value = false
  if (route.name === 'product-detail') {
    window.location.reload()
  }
}

const isMenuFn = () => {
  if (window.innerWidth > 1000) {
    isShowMenu.value = false
    if (headerRef.value) {
      setTimeout(() => {
        height.value = headerRef.value.offsetHeight
      }, 100)
    }
  }
}

onMounted(() => {
  // 從緩存獲取多語言
  let lang = localStorage.getItem('lang')
  if (lang) {
    locale.value = lang
    if (lang === 'zh') {
      textType.value = 'tc'
    } else if (lang === 'sc') {
      textType.value = 'sc'
    } else {
      textType.value = 'en'
    }
  } else {
    // 判斷當前瀏覽器語言環境
    // let lang = navigator.language
    locale.value = 'en'
    textType.value = 'en'
    // textType.value = lang === 'zh' ? 'tc' : 'en'
  }
  isMenuFn()
  window.addEventListener('resize', isMenuFn)
  window.addEventListener('resize', debouncedResetSize)
  on('open-cart', openCartHandle)
})

const resetSize = () => {
  screenWidth.value = window.innerWidth
  if (headerRef.value) {
    setTimeout(() => {
      height.value = headerRef.value.offsetHeight
    }, 100)
  }
}

const debouncedResetSize = debounce(resetSize, 100)

const showSearchHandle = () => {
  showSearch.value = !showSearch.value
  if (headerRef.value) {
    setTimeout(() => {
      height.value = headerRef.value.offsetHeight
    }, 100)
  }
}

const menuHandle = (item) => {
  if (item.name === '購物車') {
    openCart()
  }
}

const handleMenuClose = () => {
  isShowMenu.value = false
}

const searchHandle = () => {
  // 获取当前路径

  location.href = `/product-list?keyword=${keyword.value}`

  // console.log(route.path)
  // if (route.path == '/product-list') {
  //   // 如果当前路径是商品列表页，直接搜索
  //   isShowMenu.value = false
  //   emit('search-data', keyword.value)
  // } else {
  //   location.href = `/product-list?keyword=${keyword.value}`
  // }
}

const handleEnterKey = (event) => {
  if (event.key === 'Enter') {
    searchHandle()
  }
}

const openCartHandle = () => {
  drawer.value = true
}

const onMouseEnter = (index) => {
  clearTimeout(hoverTimeout.value)
  hoverIndex.value = index
  isHovering.value = true
}

const onMouseLeave = () => {
  isHovering.value = false
  scheduleClearHoverIndex()
}

const onMouseEnterHoverBox = () => {
  clearTimeout(hoverTimeout.value)
  isHovering.value = true
}

const onMouseLeaveHoverBox = () => {
  isHovering.value = false
  scheduleClearHoverIndex()
}

const scheduleClearHoverIndex = () => {
  hoverTimeout.value = setTimeout(() => {
    if (!isHovering.value) {
      hoverIndex.value = -1
    }
  }, 200)
}

onBeforeMount(() => {
  window.removeEventListener('resize', isMenuFn)
  off('open-cart', openCartHandle)
})

onUnmounted(() => {
  window.removeEventListener('resize', isMenuFn)
  off('open-cart', openCartHandle)
  clearHoverIndex()
})
</script>

<style scoped lang="less">
@keyframes heightAnimation {
  0% {
    height: 0;
  }
  100% {
    height: 100%;
  }
}
.header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  // padding: 10px 0;
  background-color: var(--color-fff);
  // border-bottom: 1px solid rgba(0, 0, 0, 0.1);
  z-index: 1000;
  .header-frame {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 8px 30px;
    gap: 30px;
    height: 106px;
    .logo-image {
      flex-shrink: 0;
      // width: 150px;
      // height: 64px;
      .img {
        width: 90px;
        height: 90px;
        cursor: pointer;
      }
    }
    .search-box {
      max-width: 328px;
      width: 100%;
      height: 40px;
      line-height: 20px;
      border-radius: 5px;
      background-color: rgba(244, 244, 244, 1);
      display: flex;
      align-items: center;
      gap: 6px;
      input {
        background-color: rgba(244, 244, 244, 1);
        border: none;
        outline: none;
        margin-left: 10px;
        flex: 1;
      }
      img {
        cursor: pointer;
        margin-right: 10px;
        width: 31px;
        height: 31px;
      }
    }
    .nav-list {
      flex: 1;
      display: flex;
      flex-shrink: 0;
      gap: 20px;
      justify-content: flex-end;
      font-size: 16px;
      .nav-item {
        display: flex;
        align-items: center;
        gap: 6px;
        line-height: 25px;
        background-color: var(--color-fff);
        color: var(--color-333);
        a {
          display: flex;
          align-items: center;
          gap: 2px;
          color: var(--color-333);
        }

        .prefix {
          color: #212121;
          display: flex;
          .img-icon {
            width: 24px;
            height: 24px;
            margin-right: 8px;
          }
        }

        .prefix:span {
          color: var(--color-b27437);
        }

        :deep(.el-select) {
          .el-select__wrapper {
            box-shadow: none;
            border: none;
            gap: 4px;
          }
          .el-select-dropdown__item {
            padding: 0 20px;
            text-align: center;
          }
        }

        :deep(.el-select__wrapper) {
          font-size: 16px;
          padding: 0;
          // background-color: #333333 !important;
        }
      }
    }
  }

  .header-nav {
    width: 100%;
    height: 60px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: var(--color-f2f2f2);
    .header-nav-box {
      padding: 0 30px;
      width: 1200px;
      display: flex;
      align-items: center;
      .header-nav-icon {
        margin-right: 20px;
        cursor: pointer;
      }

      .header-nav-item {
        min-width: 70px;
        text-align: center;
        border-left: 1px solid #4f4f4f;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        padding: 0 15px;
      }
    }
  }

  // 移動端
  .mobile {
    display: flex;
    height: 116px;
    align-items: center;
    padding: 0 14px;
    justify-content: space-between;
    .mobile-logo {
      display: flex;
      justify-content: center;
    }

    .mobile-icons {
      margin-top: 7px;
      // padding: 6px 14px;
      display: flex;
      align-items: center;

      .mobile-right {
        flex: 1;
        display: flex;
        justify-content: flex-end;
        gap: 12px;
        align-items: center;
      }
    }

    .mobile-item {
      .prefix {
        color: #212121;
        .img-icon {
          width: 24px !important;
          height: 24px;
        }
      }
      .prefix span:hover {
        color: var(--color-b27437);
      }
      :deep(.el-select) {
        .el-select__wrapper {
          box-shadow: none;
          border: none;
          // background-color: #333333 !important;
        }
        .el-select-dropdown__item {
          padding: 0 20px;
          text-align: center;
        }
      }

      :deep(.el-select__suffix) {
        display: none;
      }

      :deep(.el-select__wrapper) {
        font-size: 16px;
        padding: 0;
        line-height: 0;
        min-height: 0;
        gap: 0;
      }
    }

    .mobile-search {
      width: calc(100% - 28px);
      display: flex;
      border-radius: 5px;
      background-color: rgba(244, 244, 244, 1);
      margin: 0 auto;
      align-items: center;
      height: 40px;
      input {
        background-color: rgba(244, 244, 244, 1);
        border: 0;
        outline: none;
        margin-left: 10px;
        flex: 1;
      }

      img {
        margin-right: 10px;
        width: 30px;
        height: 30px;
        cursor: pointer;
      }
    }
  }

  .menu-box {
    .menu-item {
      padding: 10px 0;
      font-size: 16px;
      font-weight: bold;
      text-align: center;
      a {
        &:hover {
          // color: var(--color-f5ba4b);
          color: var(--color-b27437);
        }
      }
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
    :deep(.el-drawer) {
      min-width: 320px;
      width: 630px !important;
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
        border-top: 1px solid #000;
        // border-bottom: 1px solid var(--color-e3e9ef);
        overflow-y: auto;
        .goods-list {
          .goods-item {
            display: flex;
            // align-items: center;
            padding: 20px 0;
            border-bottom: 1px solid #000;
            // &:last-child {
            //   border-bottom: none;
            // }
            .goods-image {
              // padding: 20px;
              margin-right: 20px;
              background: #fff;
              border-radius: 10px;
              cursor: pointer;
              width: 150px;
              height: 150px;
              display: flex;
              align-items: center;
              justify-content: center;
              .img {
                width: 150px;
                height: 150px;
                border-radius: 10px;
              }
            }
            .goods-content {
              flex: 1;
              display: flex;
              flex-direction: column;
              justify-content: space-between;
              padding-right: 10px;
              flex-direction: column;

              .goods-content-label {
                color: rgba(0, 0, 0, 1);
                font-size: 16px;
                font-weight: bold;
              }

              .goods-content-items {
                color: rgba(239, 239, 239, 1);
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 6px;
                font-weight: bold;
                margin-top: 10px;
                .goods-content-label {
                  color: rgba(255, 255, 255, 1);
                  font-size: 16px;
                }
                .goods-content-item {
                  color: rgba(79, 79, 79, 1);
                  font-size: 16px;
                }
              }

              .goods-content-items-line {
                color: rgba(239, 239, 239, 1);
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 6px;
                font-weight: bold;
                margin-top: 10px;
                flex-direction: column;
                align-items: flex-start;
                .goods-content-label {
                  color: rgba(255, 255, 255, 1);
                  font-size: 16px;
                }
                .goods-content-item {
                  color: rgba(79, 79, 79, 1);
                  font-size: 16px;
                }
              }

              .goods-content-qty {
                color: rgba(239, 239, 239, 1);
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 12px;
                margin-top: 10px;
                font-weight: bold;
              }

              .goods-content-info {
                display: flex;
                align-items: center;
                justify-content: space-between;
                margin-top: 9px;
                .content-info-price {
                  color: rgba(255, 255, 255, 1);
                  font-size: 20px;
                  font-weight: bold;
                }
                .content-info-del {
                  cursor: pointer;
                }
              }
            }
          }
        }
        .not-data {
          width: 100%;
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
        }
      }
      .cart-price {
        .total-price {
          display: flex;
          align-items: center;
          justify-content: flex-end;
          padding: 5px 0 20px;
          font-size: 28px;
          .total-tip {
            margin-right: 10px;
            color: var(--color-576071);
          }
          .price {
            font-weight: bold;
          }
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
}
@media screen and (max-width: 1030px) {
  .header {
    .header-frame {
      padding: 8px 15px;
      gap: 10px;
      .logo-image {
        flex-shrink: 1;
        .img {
          width: 100%;
          cursor: pointer;
        }
      }

      .search-box {
        max-width: 300px;
      }

      .nav-list {
        font-size: 14px;
        gap: 10px;
      }
    }
  }
}

@media screen and (max-width: 885px) {
  .header {
    .header-frame {
      padding: 8px 15px;
      gap: 10px;
      .logo-image {
        flex-shrink: 1;
        .img {
          width: 100%;
          cursor: pointer;
        }
      }

      .search-box {
        max-width: 170px;
        input {
          width: 100px;
        }
      }

      .nav-list {
        font-size: 14px;
        gap: 10px;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .header {
    .drawer {
      :deep(.el-drawer) {
        width: 80% !important;
        .drawer-content {
          .goods-list {
            .goods-item {
              display: block;
              .goods-image {
                display: flex;
                align-items: center;
                justify-content: center;
                margin-right: 0px;
                margin-bottom: 20px;
              }
              .goods-content {
                .goods-setting {
                  display: flex;
                  justify-content: space-between;
                }
              }
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 520px) {
  .header {
    .drawer {
      :deep(.el-drawer) {
        .footer-btn-box {
          .left-back-btn {
            display: none;
          }
          .right-confirm-btn {
            flex: 1;
            .el-button {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 450px) {
  .header {
    .header-frame {
      padding: 12px 15px;
    }
  }
}

.drawer-menu {
  .drawer-item {
    margin-top: 20px;
    font-size: 16px;
    color: rgba(51, 51, 51, 1);
    line-height: 28px;
    .drawer-item-label {
      border-bottom: 1px solid rgba(0, 0, 0, 1);
      font-weight: bold;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }

    .drawer-item-childs {
      height: auto;
      // 增加顯示動畫
      animation: heightAnimation 0.3s forwards;
      .item-child-title {
        text-indent: 1rem;
      }

      .item-child-items {
        .item-child-item {
          text-indent: 2rem;
        }
      }
    }
  }
}

.header-nav-item a:hover,
.nav-item a:hover {
  color: var(--color-b27437);
}

:deep(.el-drawer__header) {
  padding: 10px;
  margin: 0px !important;
}

:deep(.el-drawer__close-btn) {
  font-size: 28px;
  font-weight: bold;
}

.nav-item-box {
  font-size: 16px;
  color: #333333;
  border-left: 1px solid rgba(51, 51, 51, 1);
  padding-right: 50px;
  margin-bottom: 30px;
  .nav-item-label {
    // border-left: 3px solid rgba(51, 51, 51, 1);
    padding: 0 10px;
    margin-bottom: 4px;
    font-weight: bold;
  }
  .nav-item-child {
    text-indent: 2rem;
    cursor: pointer;
  }

  .nav-item-child div:hover {
    color: var(--color-b27437);
  }
}
.goods-content-qty {
  :deep(.el-input__wrapper .el-input__inner) {
    text-align: center !important;
  }
}

.hover-nav-content {
  max-width: 1200px;
  margin: 0 auto;
  padding: 10px 30px 40px 74px;
  display: grid;
  grid-template-columns: repeat(4, 1fr);
}

.hover-nav-box {
  width: 100%;
  background-color: var(--color-f2f2f2);
  // max-height: 400px;
  overflow-y: auto;
  // 隱藏滾動條
  -ms-overflow-style: none;
  scrollbar-width: none;
  // padding-bottom: 20px;
}

.nav-item-child a:hover {
  color: var(--color-b27437);
}

:deep(.el-empty__description p) {
  color: #fff !important;
}

.nav-item-child a {
  line-height: 28px;
}
</style>
