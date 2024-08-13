<template>
  <div class="continer">
    <div class="continer-login">
      <!-- <ProfileHeader /> -->
      <SidebarMenu />
      <div class="login-content">
        <h2>{{ $t('profile.my_order') }}</h2>
        <div class="table-head">
          <div class="table-head-w">{{ $t('orderlist.order_date') }}</div>
          <div class="table-head-w">{{ $t('orderlist.order_no') }}</div>
          <div class="table-head-w">{{ $t('orderlist.order_price') }}</div>
          <div class="table-head-s">{{ $t('orderlist.order_status') }}</div>
          <div class="table-head-s" v-if="screenWidth > 768">{{ $t('orderlist.handle') }}</div>
        </div>
        <div class="list-items">
          <div class="list-item" v-for="(item, idx) in orderList" :key="idx" @click="goDetail">
            <div class="list-item-w">{{ item.date }}</div>
            <div class="list-item-w">{{ item.order_no }}</div>
            <div class="list-item-w">HKD${{ item.price }}</div>
            <div class="list-item-s">
              <el-tag
                class="default-tag"
                :style="{ color: orderStatus[item['order_status']].text_color, background: orderStatus[item['order_status']].bg_color }"
                >{{ item.order_status_text }}</el-tag
              >
            </div>
            <div class="list-item-s" v-if="screenWidth > 768">
              <a href="/order-detail/1">{{ $t('orderlist.show') }}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import SidebarMenu from './component/sidebar-menu.vue'
import { ref, reactive, onMounted } from 'vue'
import ProfileHeader from './component/profile-header.vue'
import { useI18n } from 'vue-i18n'
import getLangurageType from '@/hooks/langurageType'
import { useRoute, useRouter } from 'vue-router'
const { langurageType } = getLangurageType()
const { t, locale } = useI18n()

const route = useRoute()
const router = useRouter()
// 查看订单详情
const goDetail = () => {
  router.push('/order-detail/1')
}

const orderList = ref([
  {
    date: '2024-01-22 15:33',
    order_no: 'W2400052',
    price: '888.88',
    order_status: 'fullpaid',
    order_status_text: '已完成'
  },
  {
    date: '2024-01-22 15:33',
    order_no: 'W2400052',
    price: '888.88',
    order_status: 'paid',
    order_status_text: '未全付'
  },
  {
    date: '2024-01-22 15:33',
    order_no: 'W2400052',
    price: '888.88',
    order_status: 'pending',
    order_status_text: '待付款'
  },
  {
    date: '2024-01-22 15:33',
    order_no: 'W2400052',
    price: '888.88',
    order_status: 'canceled',
    order_status_text: '已取消'
  },
  {
    date: '2024-01-22 15:33',
    order_no: 'W2400052',
    price: '888.88',
    order_status: 'canceled',
    order_status_text: '已取消'
  }
])

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

const screenWidth = ref(0)

const resetSize = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', resetSize)
  screenWidth.value = window.innerWidth
})
</script>
<style scoped lang="less">
.continer {
  background-color: rgba(250, 250, 250, 1);
}
.continer-login {
  display: flex;
  justify-content: center;
  padding: 40px 10px;
  color: #333;
  align-items: flex-start;
  gap: 30px;
  .login-content {
    max-width: 840px;
    width: 100%;
    box-shadow: 0 0 6px #e7e7e7;
    border-radius: 15px;
    padding: 20px 20px 40px 20px;
    position: relative;
    background-color: #fff;

    h2{
      margin-bottom: 20px;
    }
    .table-head {
      font-size: 16px;
      font-weight: bold;
      display: flex;
      justify-content: space-between;
      padding: 16px 10px;
      // border-bottom: 1px solid #e7e7e7;
      margin-bottom: 4px;
      background-color: rgba(226,235,222,1);
      .table-head-w {
        width: calc((100% - 20%) / 3);
      }

      .table-head-s {
        width: calc(20% / 2);
      }

      .table-head-s:last-child {
        text-align: right;
      }
    }

    .list-items {
      display: flex;
      flex-direction: column;
      font-size: 16px;
      .list-item {
        padding: 10px 10px;
        // border-radius: 10px;
        display: flex;
        justify-content: space-between;
        width: 100%;
        cursor: pointer;
        // border-bottom: 1px solid rgba(187,187,187,1);
        .list-item-w {
          width: calc((100% - 20%) / 3);
        }

        .list-item-s {
          width: calc(20% / 2);
          a {
            text-decoration: underline;
          }
        }

        .list-item-s:last-child {
          text-align: right;
        }
      }

      // .list-item:hover {
      //   background-color: rgba(240, 240, 240, 1);
      // }

      .list-item:nth-child(2n){
        background-color: rgba(239,239,239,1);
      }
    }
  }
}

// 小於768px
@media screen and (max-width: 768px) {
  .table-head-w,
  .table-head-s {
    font-size: 14px;
    gap: 10px;
    padding: 4px;
    width: calc(100% / 4 - 10px - 8px) !important;
    text-align: center;
  }
  .list-item-w,
  .list-item-s {
    font-size: 12px;
    gap: 10px;
    padding: 0 4px;
    width: calc(100% / 4 - 10px - 8px) !important;
    text-align: center;

    // 文字自動換行
    text-align: center;
    word-wrap: break-word; /* 文字自动换行 */
  }

  .continer-login {
    padding-top: 20px;
    flex-direction: column;
    gap: 20px;
    .login-content {
      padding: 10px 10px;

      .list-items {
        .list-item {
          padding: 10px 0;
        }
      }
    }
  }
}

.default-tag {
  border: 0;
  margin-right: 4px;
}
</style>
