<template>
  <div class="shop-catalog">
    <div class="container">
      <div class="breadcrumb">
        <!-- <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">Home</el-breadcrumb-item>
          <el-breadcrumb-item class="active">Shop catalog</el-breadcrumb-item>
        </el-breadcrumb> -->
      </div>
      <div class="catalog-logo">
        <img class="catalog-img" :src="bannerDetail.banner_filenamepath" alt="" />
        <!-- <div class="catalog-logo-box">
          <div class="logo-left">
            <div class="left-box">
              <div class="logo-title">KTSI HK Youth Fencing Open</div>
            </div>
          </div>
          <div class="logo-right">
            <img :src="getAssetURL('fencing001.jpg')" alt="" />
          </div>
        </div> -->
      </div>
      <div class="catalog-frame">
        <!-- <div class="catalog-title-box">
          <div class="left-frame filter-pc"></div>
          <div class="right-frame right-title">Home decoration</div>
        </div> -->
        <div class="catalog-box">
          <div class="left-frame filter-pc">
            <div class="filter-title">{{ $t('categories') }}</div>
            <!-- <div class="catalog-menu">
              <el-checkbox-group v-model="catalogValue">
                <template v-for="(item, index) in categoriesList" :key="index">
                  <div class="menu-title" :class="{ activeColor: currentActive === index }" @click="changeActiveIndex(index)">
                    <div class="menu-name">{{ item.name }}</div>
                    <div class="menu-icon" :style="{ transform: currentActive === index ? 'rotate(180deg)' : 'rotate(0deg)' }">
                      <el-icon><ArrowDown /></el-icon>
                    </div>
                  </div>
                  <div class="menu-iten-list" ref="menuUpRef" :style="{ display: currentActive === index ? 'block' : 'none' }">
                    <template v-for="(itm, indx) in item.list" :key="indx">
                      <div class="menu-item">
                        <el-checkbox :value="itm.value">
                          <div class="item-name">{{ itm.name }}</div>
                          <div class="item-num">{{ itm.value }}</div>
                        </el-checkbox>
                      </div>
                    </template>
                  </div>
                </template>
              </el-checkbox-group>
            </div>
            <div class="filter-title">Price</div>
            <div class="slider"><el-slider v-model="priceSlider" :format-tooltip="formatTooltip" range :max="80" /></div>
            <div class="slider-input-box">
              <div class="slider-input">
                <div class="slider-tip">From</div>
                <div class="input"><el-input v-model="priceSlider[0]" type="number" :max="80" :min="0" /></div>
              </div>
              <div class="slider-input">
                <div class="slider-tip">To</div>
                <div class="input"><el-input v-model="priceSlider[1]" type="number" :max="80" :min="0" /></div>
              </div>
            </div>
            <div class="filter-title">Color</div>
            <div class="color-list">
              <template v-for="(item, index) in colorList" :key="index">
                <div class="color-item" :class="{ activeBorder: isActiveColor(item.name) }" @click="changeColor(item)">
                  <div class="color" :style="{ backgroundColor: item.name }"></div>
                </div>
              </template>
            </div>
            <div class="filter-title">Brand</div> -->
            <div class="checkbox-brand">
              <el-checkbox-group v-model="eventCategory" @change="changeEventCategory">
                <template v-for="(item, index) in eventCategoryList" :key="index">
                  <div class="brand-item">
                    <el-checkbox :value="item.id">
                      <div class="item-name">{{ item[langurageType('name_')] }}</div>
                      <!-- <div class="item-num">{{ item.value }}</div> -->
                    </el-checkbox>
                  </div>
                </template>
              </el-checkbox-group>
            </div>
          </div>
          <div class="right-frame">
            <!-- <div class="right-top">
              <div class="goods-tap">
                <div class="tap">
                  Vases
                  <div class="btn-icon"><el-button :icon="Close" circle /></div>
                </div>
                <div class="tap">
                  Clocks
                  <div class="btn-icon"><el-button :icon="Close" circle /></div>
                </div>
                <div class="tap">
                  Tither Room
                  <div class="btn-icon"><el-button :icon="Close" circle /></div>
                </div>
                <div class="tap">
                  $10 - $50
                  <div class="btn-icon"><el-button :icon="Close" circle /></div>
                </div>
                <div class="removefilter"><el-button type="primary" color="#d3dde6 " round>Remove all filters</el-button></div>
              </div>
              <div class="sort-frame">
                <div class="sort-box">
                  <div class="sort-tip">Sort by</div>
                  <div class="sort-name">
                    <el-select v-model="sort_type" placeholder="Select" style="width: 140px" clearable :teleported="false">
                      <el-option v-for="item in sortList" :key="item.value" :label="item.label" :value="item.value" />
                    </el-select>
                  </div>
                </div>
              </div>
            </div> -->
            <!-- <div class="goods-list">
              <template v-for="item in goodList" :key="item.id">
                <div class="goods-item" @click="goProject(item.id)">
                  <div class="goods-image">
                    <div class="image">
                      <img class="img" :src="getAssetURL(item.image)" alt="" />
                      <div class="goods-icon">
                        <div class="goods-tap"><div class="tap bg-primary">New</div></div>
                        <div class="goods-collection"><img class="img" :src="getAssetURL('goods/icons8-love-24.png')" alt="" /></div>
                      </div>
                    </div>
                  </div>
                  <div class="goods-content">
                    <div class="goods-name">{{ item.name }}</div>
                    <div class="goods-color">
                      <template v-for="(color, indexC) in item.colorList" :key="indexC">
                        <div class="color-item" :class="{ activeGoodColor: item.color === color.name }">
                          <div class="color" :style="{ background: color.name }"></div>
                        </div>
                      </template>
                    </div>
                  </div>
                  <div class="goods-price">
                    <div class="price">
                      <span class="new-price mr5">{{ item.new_price }}</span
                      ><span class="old-price">{{ item.old_price }}</span>
                    </div>
                    <div class="goods-cat">
                      <el-icon size="20" class="cat-icon"><ShoppingCart /></el-icon>
                    </div>
                  </div>
                </div>
              </template>
            </div> -->

            <div class="event-list">
              <template v-if="list.length">
                <template v-for="(item, index) in list" :key="item.id">
                  <div class="event-item">
                    <div class="event">
                      <router-link :to="`/event/${item.id}`">
                        <div class="event-image">
                          <div
                            class="img"
                            :style="{ 'background-image': `url(${item.cover_filenamepath ? item.cover_filenamepath : getAssetURL('Bushes.jpg')})` }"
                          ></div>
                        </div>
                        <div class="event-info">
                          <div class="event-name">{{ item[langurageType('name_')] }}</div>
                          <div class="event-date">{{ $t('date') }}：{{ item.start_date }} {{ item.start_time }}</div>
                          <div class="event-organize">
                            {{ $t('organiser') }}：{{ item[langurageType('clubs_name_')] ? item[langurageType('clubs_name_')] : '-' }}
                          </div>
                        </div>
                        <div class="tap-list">
                          <div class="tap-item">{{ item[langurageType('eventcategory_name_')] }}</div>
                        </div>
                      </router-link>
                    </div>
                  </div>
                </template>
              </template>
              <template v-else>
                <div class="not-data" style="flex: 1; padding: 100px 0">
                  <el-empty :description="$t('empty')" />
                </div>
              </template>
            </div>

            <div class="load-btn">
              <el-button v-if="pageDate.page < pageDate.page_total" type="success" color="#448c74">{{ $t('load_more_event') }}</el-button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="filter-btn">
      <el-button type="success" color="#448c74" size="large" @click="openDrawer"
        ><img class="img" :src="getAssetURL('goods/icons8-filter-20.png')" alt="" /> {{ $t('filters') }}</el-button
      >
    </div>
    <div class="drawer">
      <el-drawer v-model="drawer" direction="ltr" size="40%">
        <template #header>
          <h4>{{ $t('filters') }}</h4>
        </template>
        <template #default>
          <div class="drawer-content">
            <div class="left-frame">
              <div class="filter-title">{{ $t('categories') }}</div>
              <!-- <div class="catalog-menu">
                <el-checkbox-group v-model="catalogValue">
                  <template v-for="(item, index) in categoriesList" :key="index">
                    <div class="menu-title" :class="{ activeColor: currentActive === index }" @click="changeActiveIndex(index)">
                      <div class="menu-name">{{ item.name }}</div>
                      <div class="menu-icon" :style="{ transform: currentActive === index ? 'rotate(180deg)' : 'rotate(0deg)' }">
                        <el-icon><ArrowDown /></el-icon>
                      </div>
                    </div>
                    <div class="menu-iten-list" ref="menuUpRef" :style="{ display: currentActive === index ? 'block' : 'none' }">
                      <template v-for="(itm, indx) in item.list" :key="indx">
                        <div class="menu-item">
                          <el-checkbox :value="itm.value">
                            <div class="item-name">{{ itm.name }}</div>
                            <div class="item-num">{{ itm.value }}</div>
                          </el-checkbox>
                        </div>
                      </template>
                    </div>
                  </template>
                </el-checkbox-group>
              </div>
              <div class="filter-title">Price</div>
              <div class="slider"><el-slider v-model="priceSlider" :format-tooltip="formatTooltip" range :max="80" /></div>
              <div class="slider-input-box">
                <div class="slider-input">
                  <div class="slider-tip">From</div>
                  <div class="input"><el-input v-model="priceSlider[0]" type="number" :max="80" :min="0" /></div>
                </div>
                <div class="slider-input">
                  <div class="slider-tip">To</div>
                  <div class="input"><el-input v-model="priceSlider[1]" type="number" :max="80" :min="0" /></div>
                </div>
              </div>
              <div class="filter-title">Color</div>
              <div class="color-list">
                <template v-for="(item, index) in colorList" :key="index">
                  <div class="color-item" :class="{ activeBorder: isActiveColor(item.name) }" @click="changeColor(item)">
                    <div class="color" :style="{ backgroundColor: item.name }"></div>
                  </div>
                </template>
              </div>
              <div class="filter-title">Brand</div> -->
              <div class="checkbox-brand">
                <el-checkbox-group v-model="eventCategory2">
                  <template v-for="(item, index) in eventCategoryList" :key="index">
                    <div class="brand-item">
                      <el-checkbox :value="item.id">
                        <div class="item-name">{{ item[langurageType('name_')] }}</div>
                        <!-- <div class="item-num">{{ item.value }}</div> -->
                      </el-checkbox>
                    </div>
                  </template>
                </el-checkbox-group>
              </div>
            </div>
          </div>
        </template>
        <template #footer>
          <div style="flex: auto">
            <el-button type="primary" color="#448c74" @click="confirmFilter">{{ $t('confirm') }}</el-button>
          </div>
        </template>
      </el-drawer>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

import { storeToRefs } from 'pinia'
import useEventStore from '@/store/modules/event'
import useMainStore from '@/store/modules/main'

import { ArrowRight, Close } from '@element-plus/icons-vue'

import getLangurageType from '@/hooks/langurageType'

const route = useRoute()
const router = useRouter()

const useEvent = useEventStore()
const { list, pageDate } = storeToRefs(useEvent)

const useMain = useMainStore()
const { eventCategoryList, bannerDetail } = storeToRefs(useMain)

const eventname = ref('')
const eventCategory = ref([])
const eventCategory2 = ref([])

const categroycode = ref([])
if (Array.isArray(route.query.categroycode)) {
  categroycode.value = [...route.query.categroycode]
} else {
  categroycode.value = route.query.categroycode ? [route.query.categroycode] : []
}
eventname.value = route.query.eventname ? route.query.eventname : ''
eventCategory.value = [...categroycode.value]
watch(
  route,
  () => {
    if (Array.isArray(route.query.categroycode)) {
      categroycode.value = [...route.query.categroycode]
    } else {
      categroycode.value = route.query.categroycode ? [route.query.categroycode] : []
    }
    eventname.value = route.query.eventname ? route.query.eventname : ''
    eventCategory.value = [...categroycode.value]
    pageDate.value = {
      page: 1,
      items_per_page: 9,
      page_total: 1
    }
    if (categroycode.value.length) {
      useEvent.getListAction({ eventcategory_ids: JSON.stringify(categroycode.value), name: eventname.value })
    } else {
      useEvent.getListAction({ name: eventname.value })
    }
  },
  { deep: true, immediate: true }
)

useMain.getEventCategoryListAction()
useMain.getWebsiteBannerDetailAction({ id: 4 })
// useEvent.getListAction()

const { langurageType } = getLangurageType()

const menuUpRef = ref(null)
const catalogValue = ref([])
const currentActive = ref(0)
const priceSlider = ref([10, 50])

const changeEventCategory = (e) => {
  pageDate.value = {
    page: 1,
    items_per_page: 9,
    page_total: 1
  }
  if (route.query.eventname) {
    router.push({
      path: '/events',
      query: {
        categroycode: e,
        eventname: route.query.eventname
      }
    })
  } else {
    router.push({
      path: '/events',
      query: {
        categroycode: e
      }
    })
  }
}

const openDrawer = () => {
  drawer.value = true
  eventCategory2.value = [...eventCategory.value]
}
const confirmFilter = () => {
  drawer.value = false
  eventCategory.value = [...eventCategory2.value]
  pageDate.value = {
    page: 1,
    items_per_page: 9,
    page_total: 1
  }
  if (route.query.eventname) {
    router.push({
      path: '/events',
      query: {
        categroycode: [...eventCategory.value],
        eventname: route.query.eventname
      }
    })
  } else {
    router.push({
      path: '/events',
      query: {
        categroycode: [...eventCategory.value]
      }
    })
  }

  // useEvent.getListAction({ eventcategory_ids: JSON.stringify(eventCategory2.value) })
}

const categoriesList = [
  {
    name: 'Living room',
    list: [
      {
        name: 'View all',
        value: '697'
      },
      {
        name: 'Vases',
        value: '234'
      },
      {
        name: 'Mirrors',
        value: '182'
      },
      {
        name: 'Paintings',
        value: '133'
      },
      {
        name: 'Furniture',
        value: '24'
      },
      {
        name: 'Clocks',
        value: '49'
      },
      {
        name: 'Photo frames',
        value: '75'
      }
    ]
  },
  {
    name: 'Kitchen',
    list: [
      {
        name: 'View all',
        value: '813'
      },
      {
        name: 'Cutlery',
        value: '387'
      },
      {
        name: 'Storage',
        value: '124'
      },
      {
        name: 'Waste bins',
        value: '59'
      },
      {
        name: 'Holders',
        value: '227'
      },
      {
        name: 'Sinks',
        value: '16'
      }
    ]
  },
  {
    name: 'Bathroom',
    list: [
      {
        name: 'View all',
        value: '1416'
      },
      {
        name: 'Showers',
        value: '113'
      },
      {
        name: 'Basins',
        value: '98'
      },
      {
        name: 'Dispensers',
        value: '205'
      },
      {
        name: 'Cleaning',
        value: '747'
      },
      {
        name: 'Holders',
        value: '253'
      }
    ]
  },
  {
    name: 'Bedroom',
    list: [
      {
        name: 'View all',
        value: '1219'
      },
      {
        name: 'Furniture',
        value: '43'
      },
      {
        name: 'Bed linen',
        value: '528'
      },
      {
        name: 'Lighting',
        value: '391'
      },
      {
        name: 'Storage',
        value: '75'
      },
      {
        name: 'Mirrors',
        value: '182'
      }
    ]
  }
]

const sort_type = ref('popular')
const sortList = [
  {
    value: 'popular',
    label: 'Most popular'
  },
  {
    value: 'low-high',
    label: 'Low-High price'
  },
  {
    value: 'high-low',
    label: 'High-Low price'
  },
  {
    value: 'rating',
    label: 'Average rating'
  },
  {
    value: 'az',
    label: 'A-Z order'
  },
  {
    value: 'za',
    label: 'Z-A order'
  }
]

const brandList = ref([
  {
    name: 'Pazolinni',
    value: '48'
  },
  {
    name: 'Tither Room',
    value: '32'
  },
  {
    name: 'Moissy Decor',
    value: '25'
  },
  {
    name: 'Victorio Via',
    value: '56'
  }
])
const currentColorIndex = ref([{ name: '#1d211f' }])
const colorList = ref([{ name: '#1d211f' }, { name: '#d9c9a1' }, { name: '#a1b7d9' }, { name: '#74947d' }, { name: '#af8352' }, { name: '#c0c0c0' }])

const goodList = ref([
  {
    id: 1,
    image: 'goods/g1.png',
    name: 'Ceramic flower pot',
    colorList: [{ name: '#1d211f' }, { name: '#d9c9a1' }, { name: '#a1b7d9' }],
    color: '#1d211f',
    new_price: '$19.00',
    old_price: '$35.00'
  },
  {
    id: 2,
    image: 'goods/g2.png',
    name: 'Pendant lamp',
    colorList: [{ name: '#1d211f' }, { name: '#d9c9a1' }, { name: '#a1b7d9' }],
    color: '#1d211f',
    new_price: '$19.00',
    old_price: '$35.00'
  },
  {
    id: 3,
    image: 'goods/g3.png',
    name: 'Living room table',
    colorList: [{ name: '#1d211f' }, { name: '#d9c9a1' }, { name: '#a1b7d9' }],
    color: '#1d211f',
    new_price: '$19.00',
    old_price: '$35.00'
  }
])

const formatTooltip = (value) => {
  return '$' + value
}

const changeActiveIndex = (index) => {
  if (currentActive.value === index) {
    currentActive.value = -1
  } else {
    currentActive.value = index
  }
}

const isActiveColor = computed(() => {
  return (color) => {
    if (color) {
      let flag = currentColorIndex.value.find((item) => {
        return item.name === color
      })
      if (flag === undefined) {
        return false
      } else {
        return true
      }
    } else {
      return false
    }
  }
})

const changeColor = (obj) => {
  let flag = currentColorIndex.value.find((item) => {
    return item.name === obj.name
  })
  if (flag === undefined) {
    currentColorIndex.value.push(obj)
  } else {
    currentColorIndex.value = currentColorIndex.value.filter((item) => {
      return item.name !== obj.name
    })
  }
}

const goProject = (id) => {
  router.push(`/project-detail/${id}`)
}

const drawer = ref(false)
</script>

<style scoped lang="less">
.shop-catalog {
  .breadcrumb {
    padding: 30px 30px;
    :deep(.el-breadcrumb) {
      .is-link {
        color: var(--color-858c97);
      }
      .active {
        span {
          color: var(--color-b27437);
        }
      }
    }
  }
  .catalog-logo {
    padding: 0 30px;
    margin-bottom: 50px;
    .catalog-img {
      width: 100%;
      border-radius: 12px;
    }
    .catalog-logo-box {
      display: flex;
      padding-left: 80px;
      border-radius: 12px;
      // background: var(--color-e3e5e9);
      background: var(--color-006838);
      overflow: hidden;
    }
    .logo-left {
      flex: 1;
      display: flex;
      align-items: center;
      .logo-tip {
        margin-bottom: 20px;
        font-size: 12px;
        // color: var(--color-576071);
        color: var(--color-fff);
      }
      .logo-title {
        margin-bottom: 20px;
        font-size: 40px;
        color: var(--color-fff);
        .logo-active {
          color: var(--color-b27437);
        }
      }
      .logo-btn {
        .btn {
          padding: 12px 18px;
          font-size: 14px;
          color: var(--color-212529);
          background: var(--color-e3e5e9);
          border-color: var(--color-212529);
          &:hover {
            background: var(--color-212529);
            color: var(--color-fff);
          }
        }
      }
    }
    .logo-right {
      flex: 1;
      img {
        width: 100%;
      }
    }
  }
  .catalog-frame {
    padding: 0 15px;
    .catalog-title-box {
      display: flex;
      margin-bottom: 30px;
      .right-title {
        font-size: 36px;
        font-weight: bold;
      }
    }
    .catalog-box {
      display: flex;
    }
    .right-top {
      display: flex;
      justify-content: space-between;
      .goods-tap {
        display: flex;
        flex-wrap: wrap;
        .tap {
          display: flex;
          align-items: center;
          padding: 4px 10px;
          margin: 0 5px 5px 0;
          color: var(--color-576071);
          border: 1px solid var(--color-e3e9ef);
          border-radius: 30px;
          font-size: 12px;
        }
        .btn-icon {
          margin-left: 5px;
          :deep(.el-button) {
            width: 16px;
            height: 16px;
          }
        }
        .removefilter {
          margin-right: 10px;
          :deep(.el-button) {
            height: 28px;
            padding: 4px 10px;
            font-size: 12px;
          }
        }
      }
      .sort-frame {
        flex-shrink: 0;
      }
      .sort-box {
        display: flex;
        align-items: center;
        font-size: 13px;
        .sort-tip {
          margin-right: 8px;
        }
        .sort-name {
          :deep(.el-select) {
            --el-font-size-base: 12px;
            .el-select__wrapper {
              font-size: 12px;
            }
          }
        }
      }
    }
    .goods-list {
      display: flex;
      flex-wrap: wrap;
      // margin: 20px -15px 0;
      margin: 0px -15px 0;

      font-size: 16px;
      .goods-item {
        width: 33.33%;
        padding: 0 12px;
        margin-bottom: 20px;
        .goods-image {
          width: 100%;
          padding: 15px;
          background: var(--color-f6f9fc);
          border-radius: 12px;
          .image {
            position: relative;
            width: 100%;
            padding: 24px;
            .img {
              width: 100%;
            }
            .goods-icon {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              display: flex;
              justify-content: space-between;
              .goods-tap {
                .tap {
                  font-size: 12px;
                  padding: 5px 9px;
                  font-weight: 550;
                  border-radius: 30px;
                }
              }
              .goods-collection {
                width: 32px;
                height: 32px;
                display: flex;
                align-items: center;
                justify-content: center;
                border-radius: 50%;
                background: var(--color-fff);
                opacity: 0;
                transition: opacity 0.3s ease-in;
                cursor: pointer;
                .img {
                  width: 20px;
                  height: 20px;
                }
              }
              .bg-danger {
                background: rgba(237, 80, 80, 0.1);
                color: rgba(237, 80, 80, 1);
              }
              .bg-primary {
                background: rgba(68, 140, 116, 0.1);
                color: rgba(68, 140, 116, 1);
              }
            }
          }
          &:hover {
            .image {
              .goods-icon {
                .goods-collection {
                  opacity: 1;
                }
              }
            }
          }
        }
        .goods-content {
          display: flex;
          justify-content: space-between;
          padding: 10px 0;
          .goods-name {
            font-weight: 600;
            color: var(--color-434a57);
            cursor: pointer;
            &:hover {
              color: var(--color-b27437);
            }
          }
          .goods-color {
            display: flex;
            .color-item {
              width: 16px;
              height: 16px;
              display: flex;
              align-items: center;
              justify-content: center;
              margin-left: 5px;
              border-radius: 50%;
              cursor: pointer;
            }
            .color {
              width: 10px;
              height: 10px;
              border-radius: 50%;
            }
            .activeGoodColor {
              border: 1px solid var(--color-d7dde2);
            }
          }
        }
        .goods-price {
          display: flex;
          justify-content: space-between;
          .price {
            display: flex;
            align-items: flex-end;
            .new-price {
              color: var(--color-576071);
            }
            .old-price {
              font-size: 14px;
              text-decoration: line-through;
              color: var(--color-b4bbc3);
            }
            .mr5 {
              margin-right: 5px;
            }
          }
          .goods-cat {
            cursor: pointer;
            &:hover {
              .cat-icon {
                color: var(--color-b27437);
              }
            }
          }
        }
      }
    }

    .event-list {
      display: flex;
      flex-wrap: wrap;
      margin: 0px -15px 0;
      .event-item {
        width: 33.33%;
        padding: 0 12px;
        margin-bottom: 20px;
        .event {
          border-radius: 12px;
          border: 1px solid var(--color-e3e9ef);
          overflow: hidden;
          .event-image {
            width: 100%;
            overflow: hidden;

            .img {
              padding: 40% 0 30%;
              background-position: center center;
              background-repeat: no-repeat;
              background-size: 100%;
              transition: transform 0.2s ease-in-out;
            }
          }
          .event-info {
            padding: 15px 15px 0;
            font-size: 13px;
            .event-name {
              height: 44px;
              margin-bottom: 5px;
              line-height: 22px;
              font-size: 16px;
              font-weight: bold;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
            .event-date {
              margin-bottom: 5px;
              line-height: 18px;
            }
            .event-organize {
              height: 36px;
              margin-bottom: 5px;
              line-height: 18px;
              overflow: hidden;
              text-overflow: ellipsis;
              display: -webkit-box;
              -webkit-line-clamp: 2;
              -webkit-box-orient: vertical;
            }
          }
          .tap-list {
            padding: 0 10px 10px;
            display: flex;
            flex-wrap: wrap;
            .tap-item {
              display: inline-block;
              line-height: 22px;
              padding: 0 8px;
              margin: 0 5px 5px;
              font-size: 13px;
              border-radius: 22px;
              box-shadow: #d3d3d3 inset 0 0 0 1px;
            }
          }
          &:hover {
            border-color: var(--color-858c97);
            .event-image {
              .img {
                transform: scale(1.1);
              }
            }
          }
        }
      }
    }

    .load-btn {
      display: flex;
      justify-content: center;
      margin: 30px 0 50px;
      :deep(.el-button) {
        height: 45px;
        padding: 10px 22px;
        font-size: 16px;
        border-radius: 12px;
      }
    }
    .left-frame {
      flex: 3;
      padding: 0 15px;
    }
    .right-frame {
      flex: 9;
      padding: 0 15px;
    }
  }
  .filter-title {
    font-size: 20px;
    font-weight: bold;
    margin-bottom: 10px;
  }
  .catalog-menu {
    margin-bottom: 10px;
    :deep(.el-checkbox-group) {
      .menu-title {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 10px 0 5px;
        color: var(--color-434a57);
        cursor: pointer;
        .menu-name {
          line-height: 24px;
          font-size: 16px;
        }
        .menu-icon {
          font-size: 14px;
          transition: transform 0.2s ease-in-out;
        }
      }

      .menu-iten-list {
        transition: height 0.35s ease;
        overflow: hidden;
        .menu-item {
          .el-checkbox {
            width: 100%;
            .el-checkbox__label {
              flex: 1;
              display: flex;
              align-items: center;
              justify-content: space-between;
              font-size: 14px;
            }
          }
        }
      }
      .activeColor {
        color: var(--color-b27437);
      }
    }
  }
  .slider {
    :deep(.el-slider) {
      --el-slider-height: 3px;
      --el-slider-button-wrapper-size: 17px;
      --el-slider-button-wrapper-offset: -10px;
      --el-slider-main-bg-color: var(--color-b27437);
      .el-slider__button.dragging,
      .el-slider__button.hover,
      .el-slider__button:hover {
        transform: scale(1);
      }
      .el-slider__button {
        background: var(--color-b27437);
      }
    }
  }
  .slider-input-box {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 20px;
    .slider-input {
      display: flex;
      align-items: center;
      .slider-tip {
        margin-right: 20px;
      }
    }
  }
  .color-list {
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 20px;
    .color-item {
      width: 36px;
      height: 36px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin: 0 8px 8px 0;
      border-radius: 50%;
      cursor: pointer;
      .color {
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
    }
  }
  .activeBorder {
    border: 1px solid var(--color-d7dde2);
  }
  .checkbox-brand {
    margin-bottom: 50px;
    :deep(.el-checkbox-group) {
      .brand-item {
        .el-checkbox {
          width: 100%;
          .el-checkbox__label {
            flex: 1;
            display: flex;
            align-items: center;
            justify-content: space-between;
            font-size: 14px;
          }
        }
      }
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
    }
    .img {
      width: 17px;
      height: 17px;
      margin-right: 5px;
    }
  }
}
.drawer {
  :deep(.el-drawer) {
    min-width: 320px;
    .el-drawer__header {
      margin-bottom: 10px;
      font-size: 24px;
      color: var(--color-212529);
      h4 {
        margin: 10px 0;
      }
    }
  }
}

@media screen and (max-width: 1000px) {
  .shop-catalog {
    .catalog-logo {
      .catalog-logo-box {
        display: block;
        padding-left: 0px;
      }
      .logo-left {
        padding: 30px;
        text-align: center;
        .logo-title {
          font-size: 30px;
        }
      }
    }
    .catalog-frame {
      .filter-pc {
        display: none;
      }
    }
    .filter-btn {
      display: block;
    }
  }
}
@media screen and (max-width: 800px) {
  .shop-catalog {
    .catalog-frame {
      .event-list {
        .event-item {
          width: 50%;
        }
      }
    }
  }
}
@media screen and (max-width: 768px) {
  .shop-catalog {
    .catalog-frame {
      .goods-list {
        .goods-item {
          width: 50%;
        }
      }
    }
  }
}
@media screen and (max-width: 620px) {
  .shop-catalog {
    .catalog-logo {
      .logo-left {
        .logo-title {
          font-size: 25px;
        }
      }
    }
  }
}
@media screen and (max-width: 568px) {
  .shop-catalog {
    .catalog-frame {
      .goods-list {
        .goods-item {
          width: 100%;
        }
      }
    }
  }
}
@media screen and (max-width: 540px) {
  .shop-catalog {
    .catalog-frame {
      .event-list {
        .event-item {
          width: 100%;
        }
      }
    }
  }
}
</style>
