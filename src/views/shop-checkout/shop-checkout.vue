<template>
  <div class="shop-checkout">
    <div class="lw50"></div>
    <div class="rw50"></div>
    <div class="container">
      <div class="content-frame">
        <div class="left-frame flex1">
          <div class="breadcrumb">
            <a href="/"
              ><el-icon><ArrowLeftBold /></el-icon>{{ $t('home') }}</a
            >
          </div>
          <div class="shop-list">
            <div class="form">
              <el-select class="select-store" v-model="formData.shipping_method" :placeholder="$t('please_select')" size="large" @change="changeType">
                <el-option v-for="item in typeList" :key="item.key" :label="item[langurageType('name_')]" :value="item.key" />
              </el-select>

              <div class="form-title">{{ $t('client') }}</div>
              <el-form ref="formRef" :model="formData" :rules="rules">
                <el-card class="card">
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('title')" prop="title">
                        <el-select v-model="formData.title" :placeholder="$t('please_select')" size="large">
                          <el-option v-for="item in genderList" :key="item.key" :label="item[langurageType('name_')]" :value="item.key" />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('order.chinese_name')" prop="chinese_name">
                        <el-input size="large" v-model="formData.chinese_name" :placeholder="$t('please_input')" clearable />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('last_name')" prop="last_name">
                        <el-input size="large" v-model="formData.last_name" :placeholder="$t('please_input')" clearable />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('first_name')" prop="first_name">
                        <el-input size="large" v-model="formData.first_name" :placeholder="$t('please_input')" clearable />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('client_phone')" prop="phone">
                        <el-input size="large" v-model="formData.phone" :placeholder="$t('please_input')" clearable />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('client_email')" prop="email">
                        <el-input size="large" v-model="formData.email" :placeholder="$t('please_input')" clearable />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame" v-if="formData.shipping_method == 'pickup'">
                    <div class="input-box">
                      <el-form-item :label="$t('store')" prop="branch_id">
                        <el-select v-model="formData.branch_id" :placeholder="$t('please_select')" size="large" @change="changeBranch">
                          <el-option v-for="item in storeList" :key="item.id" :label="item[langurageType('name_')]" :value="item.id" />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('country_region')" prop="shipping_nation">
                        <el-select
                          v-model="formData.shipping_nation"
                          :placeholder="$t('please_select')"
                          size="large"
                          @change="changNation(1)"
                          :disabled="formData.shipping_method == 'pickup'"
                        >
                          <el-option v-for="item in nationList" :key="item.id" :label="item[langurageType('name_')]" :value="item.id" />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('shipping_area')" prop="shippingarea_id">
                        <el-select
                          v-model="formData.shippingarea_id"
                          :placeholder="$t('please_select')"
                          size="large"
                          @change="changeCopyAddress"
                          :disabled="formData.shipping_method == 'pickup'"
                        >
                          <el-option v-for="item in area1" :key="item.id" :label="item[langurageType('name_')]" :value="item.id" />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('address')" prop="shipping_address">
                        <el-input
                          size="large"
                          v-model="formData.shipping_address"
                          @input="changeCopyAddress"
                          :placeholder="$t('please_input')"
                          clearable
                          :disabled="formData.shipping_method == 'pickup'"
                        />
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('country_region')" prop="billing_nation">
                        <el-select
                          v-model="formData.billing_nation"
                          :placeholder="$t('please_select')"
                          size="large"
                          :disabled="copyAddress"
                          @change="changNation(2)"
                        >
                          <el-option v-for="item in nationList" :key="item.id" :label="item[langurageType('name_')]" :value="item.id" />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('bill_area')" prop="billingarea_id">
                        <el-select
                          v-model="formData.billingarea_id"
                          :placeholder="$t('please_select')"
                          size="large"
                          :disabled="copyAddress"
                          @change="changeFreight"
                        >
                          <el-option v-for="item in area2" :key="item.id" :label="item[langurageType('name_')]" :value="item.id" />
                        </el-select>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('bill_address')" prop="billing_address">
                        <el-input
                          size="large"
                          v-model="formData.billing_address"
                          :disabled="copyAddress"
                          :placeholder="$t('please_input')"
                          clearable
                          @input="changeFreight"
                        />
                        <el-checkbox v-model="copyAddress" @change="changeCopyAddress">Same with Shipping Address</el-checkbox>
                      </el-form-item>
                    </div>
                  </div>
                  <div class="input-frame">
                    <div class="input-box">
                      <el-form-item :label="$t('order.company_name')" prop="company_name">
                        <el-input size="large" v-model="formData.company_name" :placeholder="$t('please_input')" clearable />
                      </el-form-item>
                    </div>
                  </div>
                </el-card>
              </el-form>
            </div>
          </div>
        </div>
        <div class="right-frame flex1">
          <div class="right-header">
            <h4>
              {{ $t('order_summary') }} <span class="cart-num">({{ cartList.length }} {{ cartList.length > 1 ? $t('items') : $t('item') }})</span>
            </h4>
          </div>
          <div class="drawer-content">
            <div class="goods-list">
              <template v-if="cartList.length">
                <template v-for="item in cartList" :key="item.id">
                  <div class="goods-item">
                    <div>
                      <div class="goods-image" @click="goEvent(item.id)">
                        <img class="img" v-if="item.cover_image" :src="item.cover_image ? item.cover_image : getAssetURL('default.png')" alt="" />
                        <img class="img" style="width: 100px; height: 100px;object-fit: contain;" v-else :src="getAssetURL('default.png')" alt="" />
                      </div>
                    </div>
                    <div class="goods-content">
                      <div class="goods-content-label">{{ item.name_tc }}</div>
                      <div class="goods-content-items" v-for="result in item.options" :key="result.id">
                        <div class="goods-content-label">{{ result[langurageType('product_optiongroup_name_')] }}:</div>
                        <div class="goods-content-item">{{ result[langurageType('product_optiongroup_option_name_')] }}</div>
                      </div>
                      <div class="goods-content-items-line">
                        <div class="goods-content-label" v-if="item.otheritem.length">Your special:</div>
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
              </template>
              <template v-else>
                <div class="not-data">
                  <el-empty :description="$t('empty')" />
                </div>
              </template>
            </div>
          </div>
          <div class="cart-price">
            <div class="coupon-box">
              <div class="coupon-input"><el-input size="large" v-model="code" style="width: 240px" :placeholder="$t('your_coupon_code')" clearable /></div>
              <div class="coupon-btn">
                <el-button type="primary" size="large" color="#d3dde6" @click="verificationCoupon">{{ $t('apply_coupon') }}</el-button>
              </div>
            </div>
            <div class="price-box">
              <div class="price-tip">{{ $t('subtotal') }}:</div>
              <div class="price-name">${{ Number(productsDetail.products_price).toFixed(2) }}</div>
            </div>
            <div class="price-box">
              <div class="price-tip">{{ $t('shipping') }}:</div>
              <div class="price-name">${{ Number(productsDetail.shipping_price).toFixed(2) }}</div>
            </div>
            <div class="price-box">
              <div class="price-tip">{{ $t('coupon_code') }}:</div>
              <div class="price-name">
                {{ productsDetail.coupons && productsDetail.coupons.coupons_code ? productsDetail.coupons.coupons_code : '-' }}
                <div class="close-icon" v-if="coupon_code"><el-button type="danger" size="small" :icon="Close" circle @click="closeConpon" /></div>
              </div>
            </div>
            <div class="price-box">
              <div class="price-tip">{{ $t('coupon') }}:</div>
              <div class="price-name">{{ productsDetail.coupon_amount ? '$' + Number(productsDetail.coupon_amount).toFixed(2) : '-' }}</div>
            </div>
            <div class="line"></div>
            <div class="price-box">
              <div class="total-price-tip">{{ $t('total_price') }}:</div>
              <div class="total-price-name">${{ Number(productsDetail.difference_amount).toFixed(2) }}</div>
            </div>
          </div>
          <div class="submit-btn">
            <el-button type="primary" @click="payEvent">{{ $t('pay_event') }}</el-button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, reactive, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'
import { storeToRefs } from 'pinia'
import useCartStore from '@/store/modules/cart'
import useMainStore from '@/store/modules/main'
import useShopStore from '@/store/modules/shop'
import useOrderStore from '@/store/modules/order'
import ProductStore from '@/store/modules/product'
import { ArrowRight, Close, Plus, Minus, Delete } from '@element-plus/icons-vue'
import { deleteCart, getCouponIsCanUse } from '@/services/api/cart'
import getLangurageType from '@/hooks/langurageType'
import Swal from 'sweetalert2'
import { useI18n } from 'vue-i18n'
import { debounce } from '@/utils/util.js'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const useCart = useCartStore()
const { list, priceSummary, session_id } = storeToRefs(useCart)

const useMain = useMainStore()

const useProduct = ProductStore()
const { categoryGroupList } = storeToRefs(useProduct)
useProduct.getCategoryGroupListAction()
// const { nationList, textType } = storeToRefs(useMain)

// useMain.getNationListAction()

const useShop = useShopStore()
const { cartListCache, cartList, productsDetail, storeList } = storeToRefs(useShop)
useShop.getCartListAction()
useShop.getStoreListAction()

const useOrder = useOrderStore()

// const areaList = ref([])
const { areaList, nationList } = storeToRefs(useOrder)
useOrder.getNationListAction()
// useOrder.getAreaListAction()
const copyAddress = ref(false)

const { langurageType } = getLangurageType()
const genderList = ref([
  {
    key: 'mr',
    name_en: 'Mr',
    name_tc: '先生'
  },
  {
    key: 'ms',
    name_en: 'Ms',
    name_tc: '女士'
  },
  {
    key: 'mrs',
    name_en: 'Mrs',
    name_tc: '太太'
  }
])
const code = ref('')
const coupon_code = ref('')

const formRef = ref(null)

const typeList = ref([
  {
    name_en: 'Delivery Service',
    name_tc: '送貨上門',
    id: 1,
    key: 'delivery'
  },
  {
    name_en: 'Self Pickup',
    name_tc: '門店自提',
    id: 2,
    key: 'pickup'
  }
])

const formData = ref({
  title: '',
  last_name: '',
  first_name: '',
  chinese_name: '',
  email: '',
  phone: '',
  company_name: '',
  shipping_address: '',
  billing_address: '',
  shippingarea_id: '',
  billingarea_id: '',
  shipping_nation: '',
  billing_nation: '',
  shipping_method: 'delivery',
  branch_id: undefined
})

const area1 = ref([])
const area2 = ref([])

const form = ref({
  client_phone: '',
  client_email: '',
  client_name: '',
  client_remark: ''
})

const rules = reactive({
  title: [{ required: true, message: t('please_select') + ' ' + t('title'), trigger: 'change' }],
  last_name: [{ required: true, message: t('please_input') + ' ' + t('last_name'), trigger: 'blur' }],
  first_name: [{ required: true, message: t('please_input') + ' ' + t('first_name'), trigger: 'blur' }],
  email: [{ required: true, message: t('please_input') + ' ' + t('email'), trigger: 'blur' }],
  phone: [{ required: true, message: t('please_input') + ' ' + t('phone'), trigger: 'blur' }],
  shipping_address: [{ required: true, message: t('please_input') + ' ' + t('address'), trigger: 'blur' }],
  billing_address: [{ required: true, message: t('please_input') + ' ' + t('bill_address'), trigger: 'blur' }],
  shippingarea_id: [{ required: true, message: t('please_select') + ' ' + t('shipping_area'), trigger: 'change' }],
  billingarea_id: [{ required: true, message: t('please_select') + ' ' + t('bill_area'), trigger: 'change' }],
  branch_id: [{ required: true, message: t('please_select') + ' ' + t('store'), trigger: 'change' }],
  shipping_nation: [{ required: true, message: t('please_select') + ' ' + t('store'), trigger: 'change' }],
  billing_nation: [{ required: true, message: t('please_select') + ' ' + t('store'), trigger: 'change' }]
})

const sumPriceFn = () => {
  let goodsList = list.value.map((item) => {
    return {
      event_id: item.event_id,
      event_level_id: item.event_level_id,
      event_item_id: item.event_item_id
    }
  })
  let goods = {
    coupon_code: coupon_code.value,
    goods: goodsList
  }
  let formData = new FormData()
  formData.append('goods', JSON.stringify(goods))
  useCart.getPriceSummaryAction(formData)
}

// sumPriceFn()

const genderName = computed(() => {
  return (key) => {
    if (genderList.value.length) {
      let flag = genderList.value.find((item) => {
        return item.key == key
      })
      if (flag) {
        return flag['name_' + textType.value]
      } else {
        return '-'
      }
    } else {
      return '-'
    }
  }
})
const nationName = computed(() => {
  return (id) => {
    if (nationList.value.length) {
      let flag = nationList.value.find((item) => {
        return Number(item.id) == Number(id)
      })
      if (flag) {
        return flag['name_' + textType.value]
      } else {
        return '-'
      }
    } else {
      return '-'
    }
  }
})

const changeType = () => {
  if (formData.value.shipping_method == 'delivery') {
    formData.value.branch_id = undefined
    formData.value.shippingarea_id = ''
    formData.value.shipping_address = ''
  }
}

const verificationCoupon = () => {
  if (code.value.trim() === '') {
    ElMessage({
      showClose: true,
      message: t('coupon_tip'),
      type: 'error'
    })
  } else {
    // await useShop.getPriceSummaryAction(code.value)

    useOrder.verificationCoupon({ coupon_code: code.value }).then(async (res) => {
      console.log(res)
      if (res.code == 200) {
        await useShop.getPriceSummaryAction(code.value, formData.value)
      } else {
        Swal.fire({
          text: res.message,
          icon: 'error',
          confirmButtonText: t('got_it')
        })
      }
    })
  }
}

const closeConpon = () => {
  ElMessageBox.confirm(`${t('del_coupon_tip')}?`, {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel'),
    center: true
  }).then(() => {
    coupon_code.value = ''
    sumPriceFn()
  })
}

const changNation = (idx) => {
  if (idx == 1) {
    formData.value.shippingarea_id = ''
    useOrder.getAreaListAction({ nation_id: formData.value.shipping_nation }).then((res) => {
      area1.value = res

      // if (area1.value.length > 0) {
      //   formData.value.shippingarea_id = area1.value[0].id
      // } else {
      //   formData.value.shippingarea_id = ''
      // }
    })
    changeCopyAddress()
  } else if (idx == 2) {
    formData.value.billingarea_id = ''
    useOrder.getAreaListAction({ nation_id: formData.value.billing_nation }).then((res) => {
      area2.value = res
      // if (area2.value.length > 0) {
      //   formData.value.billingarea_id = area2.value[0].id
      // } else {
      //   formData.value.billingarea_id = ''
      // }
      // billingarea_id
    })
  }
}

const delCart = (id) => {
  // useCart.deleteCartAction({ id })
  ElMessageBox.confirm(t('del_test_tip') + '?', {
    confirmButtonText: t('confirm'),
    cancelButtonText: t('cancel')
  }).then(() => {
    useShop.deleteCartAction(id)
  })
}

// 修改分店，賦值ShippingArea， 賦值ShippingAddress
const changeBranch = () => {
  const key = langurageType.value('address_')

  const branch = storeList.value.find((item) => {
    return item.id == formData.value.branch_id
  })
  formData.value.shipping_address = branch[key]
  formData.value.shipping_nation = branch.nation_id
  useOrder.getAreaListAction({ nation_id: formData.value.shipping_nation }).then((res) => {
    area1.value = res
    formData.value.shippingarea_id = branch.shippingarea_id
  })
  changeCopyAddress()
}

const payEvent = () => {
  if (cartList.value.length == 0) {
    Swal.fire({
      text: t('cart_empty'),
      icon: 'error',
      confirmButtonText: t('got_it')
    })
    return
  }

  formRef.value?.validate((valid) => {
    if (valid) {
      const products = cartListCache.value.map((item) => {
        return {
          product_item_id: item.product_item_id,
          qty: item.qty,
          otheritem: item.otheritem,
          discount_fee: item.discount_fee
        }
      })

      let data = new FormData()
      data.append('products', JSON.stringify(products))
      data.append('coupon_code', productsDetail.value.coupons && productsDetail.value.coupons.coupons_code ? productsDetail.value.coupons.coupons_code : '')
      data.append('order_source', 'website')
      data.append('address', JSON.stringify(formData.value))

      useOrder.createOrderAction(data).then((res) => {
        if (res && res.code == 200) {
          let dataForm = new FormData()
          dataForm.append('order_id', res.data.order_id)
          useOrder.getBBmslAction(dataForm).then((result) => {
            if (result.code == 200) {
              const loading = ElLoading.service({
                lock: true
              })
              // 清空購物車
              useShop.clearCartAction()
              window.location.assign(result.data.checkoutUrl).then(() => {
                loading.close()
              })
              // loading.close()
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
      })
    } else {
      ElMessage({
        showClose: true,
        message: t('form_tip'),
        type: 'error'
      })
    }
  })
}

const goEvent = (id) => {
  router.push('/product-detail/' + id)
}

const calculateUnitPrice = (price, qty, otherItem) => {
  const uniPrice = Number(price) * Number(qty)

  console.log(otherItem)

  const otherPrice = otherItem.reduce((total, item) => {
    return total + Number(item.price)
  }, 0)

  return Number(Number(uniPrice) + Number(otherPrice)).toFixed(2)
}

const changeQty = (item) => {
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
        useShop.changeQtyAction(item.virtual_id, item.qty).then(res=>{
          changeShipping()
        })
      } else {
        useShop.changeQtyAction(item.virtual_id, item.qty).then(res=>{
          changeShipping()
        })
      }
      const resultQty = result.qty
    }
  })
})

const changeCopyAddress = () => {
  if (copyAddress.value) {
    nextTick(() => {
      formData.value.billing_address = formData.value.shipping_address
      formData.value.billingarea_id = formData.value.shippingarea_id

      formData.value.billing_nation = formData.value.shipping_nation
      area2.value = area1.value
    })
  }

  changeShipping()
}

const changeShipping = debounce(() => {
  useShop.getPriceSummaryAction(code.value, formData.value)
})

const changeFreight = () => {
  changeShipping()
}

onMounted(() => {})
</script>

<style scoped lang="less">
.shop-checkout {
  position: relative;
  .lw50 {
    position: absolute;
    top: 0;
    width: 50%;
    height: 100%;
    background: var(--color-f6f9fc);
    z-index: -1;
  }
  .rw50 {
    position: absolute;
    top: 0;
    width: 50px;
    height: 100%;
    z-index: -1;
  }
  .breadcrumb {
    padding: 40px 0px 20px 0px;
    display: flex;
    align-items: center;
    // cursor: pointer;
    a {
      display: flex;
      align-items: center;
    }

    a:hover {
      color: var(--color-c09456);
    }
  }
  .content-frame {
    display: flex;
    padding: 0px 15px 30px;
    .form {
      .form-title {
        margin-bottom: 10px;
        font-size: 18px;
      }
      .application-title {
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: bold;
      }
      .input-frame {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10px;
        .input-box {
          flex: 1;
          padding: 0 10px;
        }
        .i-box {
          width: 50%;
          padding: 0 10px;
        }
      }
      :deep(.el-form) {
        .card {
          margin-bottom: 20px;
          .el-card__body {
            padding-bottom: 0;
          }
        }
        .el-form-item {
          display: block;
          width: 100%;
          margin-bottom: 18px;
          .el-form-item__label {
            height: 16px;
            line-height: 16px;
            margin-bottom: 5px;
            font-size: 14px;
            font-weight: 600;
            // color: #1b2a4e;
          }
        }
        .el-form-item.is-required {
          .el-form-item__label {
            &::before {
              display: none;
            }
            &::after {
              content: '*';
              color: var(--el-color-danger);
              margin-left: 4px;
            }
          }
        }
        .el-select {
          flex: 1;
        }
        .el-input {
          flex: 1;
          .el-input__wrapper {
            font-size: 14px;
          }
        }
        .el-textarea {
          font-size: 14px;
        }
      }
    }
    .left-frame {
      padding: 0 15px;
      .shop-list {
        .shop-item {
          margin-bottom: 20px;
          .shop-name {
            margin-bottom: 10px;
            font-size: 18px;
          }
          .shop-input {
            display: flex;
            align-items: center;
            .shop-input-tip {
              display: inline-block;
              width: 170px;
              padding-right: 10px;
              color: var(--color-576071);
            }
            .shop-input-name {
              flex: 1;
            }
          }
          .card {
            margin-bottom: 10px;
            :deep(.el-card__body) {
              padding: 15px 15px 10px;
            }
            .card-row {
              margin-bottom: 5px;
              .card-name {
                display: flex;

                .cart-tip {
                  display: inline-block;
                  width: 160px;
                  padding-right: 10px;
                  color: var(--color-576071);
                }
              }
            }
          }
          .item-list {
            font-size: 16px;
            .item {
            }
          }
        }
      }
    }
    .right-frame {
      padding: 20px 15px 20px 50px;
      .right-header {
        margin-bottom: 10px;
        font-size: 24px;
        color: var(--color-212529);
        h4 {
          display: flex;
          align-items: center;
          margin: 10px 0 30px;
        }
        .cart-num {
          margin-left: 15px;
          font-size: 16px;
          font-weight: normal;
          color: var(--color-858c97);
        }
      }
      .drawer-content {
        /* height: 100%; */
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
              background: var(--color-f6f9fc);
              border-radius: 12px;
              cursor: pointer;
              border-radius: 15px;
              width: 150px;
              height: 150px;
              display: flex;
              align-items: center;
              justify-content: center;
              .img {
                width: 100%;
                border-radius: 15px;
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
                color: rgba(0, 0, 0, 1);
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 6px;
                font-weight: bold;
                margin-top: 10px;
                .goods-content-label {
                  color: rgba(0, 0, 0, 1);
                  font-size: 16px;
                }
                .goods-content-item {
                  color: rgba(79, 79, 79, 1);
                  font-size: 16px;
                }
              }

              .goods-content-items-line {
                color: rgba(0, 0, 0, 1);
                font-size: 16px;
                display: flex;
                align-items: center;
                gap: 6px;
                font-weight: bold;
                margin-top: 10px;
                flex-direction: column;
                align-items: flex-start;
                .goods-content-label {
                  color: rgba(0, 0, 0, 1);
                  font-size: 16px;
                }
                .goods-content-item {
                  color: rgba(79, 79, 79, 1);
                  font-size: 16px;
                }
              }

              .goods-content-qty {
                color: rgba(0, 0, 0, 1);
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
                  color: rgba(0, 0, 0, 1);
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
        padding: 30px 0;
        font-size: 16px;
        .coupon-box {
          display: flex;
          width: 310px;
          padding: 10px;
          margin-bottom: 30px;
          border: 1px dashed var(--color-e3e9ef);
          border-radius: 12px;
          .coupon-input {
            flex: 1;
            :deep(.el-input) {
              width: 100% !important;
              .el-input__wrapper {
                box-shadow: none;
                border: none;
              }
            }
          }
          .coupon-btn {
            flex-shrink: 0;
          }
        }
        .price-box {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 10px;
          color: var(--color-576071);
          .price-tip {
          }
          .price-name {
            display: flex;
            align-items: center;
            font-weight: bold;
            .close-icon {
              margin-left: 5px;
            }
          }
          .total-price-tip {
            font-size: 20px;
          }
          .total-price-name {
            font-size: 20px;
            font-weight: bold;
            color: var(--color-212529);
          }
        }
        .line {
          margin: 30px 0;
          border-top: 1px solid var(--color-e3e9ef);
        }
      }
      .submit-btn {
        display: flex;
        margin: 30px 0 50px;
        :deep(.el-button) {
          width: 100%;
          height: 45px;
          padding: 10px 22px;
          font-size: 16px;
          border-radius: 12px;
        }
      }
    }
    .flex1 {
      width: 50%;
      flex-shrink: 0;
    }
  }
}
@media screen and (max-width: 1025px) {
  .shop-checkout {
    .content-frame {
      .right-frame {
        .drawer-content {
          .goods-list {
            .goods-item {
              display: block;
            }
          }
        }
      }
    }
  }
}

@media screen and (max-width: 900px) {
  .shop-checkout {
    .lw50 {
      background: var(--color-fff);
    }
    .content-frame {
      display: block;
      .right-frame {
        padding: 20px 15px;
        .drawer-content {
          .goods-list {
            .goods-item {
              display: flex;
            }
          }
        }
      }
      .flex1 {
        width: 100%;
      }
    }
  }
}
@media screen and (max-width: 490px) {
  .shop-checkout {
    .content-frame {
      .right-frame {
        .drawer-content {
          .goods-list {
            .goods-item {
              display: block;
            }
          }
        }
      }
    }
  }
}
@media screen and (max-width: 450px) {
  .shop-checkout {
    .content-frame {
      display: block;
      .left-frame {
        padding: 0px;
      }
      .right-frame {
        padding: 20px 0px;
      }
    }
  }
}

.goods-content-qty {
  :deep(.el-input__wrapper .el-input__inner) {
    text-align: center !important;
  }
}

:deep(.el-form-item__content) {
  display: flex;
  flex-direction: column;
  align-items: flex-end;
}

.select-store {
  padding-bottom: 20px;
}
</style>
