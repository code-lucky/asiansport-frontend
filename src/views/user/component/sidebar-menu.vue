<template>
  <div class="sidebar-container" v-if="screenWidth > 768">
    <div class="sidebar-menu">
      <div class="sidebar-menu-label">{{ $t('basic_information') }}</div>
      <div class="sidebar-menu-items">
        <div class="sidebar-menu-item" v-for="(item, index) in menuList" :key="index">
          <a :href="item.link" :style="{ color: currentRouter == item.link ? 'var(--color-b27437)' : '' }">{{ $t(item.key) }}</a>
        </div>
      </div>
    </div>
    <div class="sidebar-menu">
      <div class="sidebar-menu-items">
        <div class="sidebar-menu-item">
          <a href="#" @click="logoutTip = true">{{ $t('profile.logout') }}</a>
        </div>
      </div>
    </div>
  </div>

  <div class="sidebar-mobile" v-else>
    <div class="sidebar-mobile-items">
      <div class="sidebar-mobile-item" v-for="(item, index) in menuList" :key="index">
        <a :href="item.link" :style="{ color: currentRouter == item.link ? 'var(--color-b27437)' : '' }">{{ $t(item.key) }}</a>
      </div>

      <div class="sidebar-mobile-item">
        <a href="#" @click="logoutTip = true">{{ $t('profile.logout') }}</a>
      </div>
    </div>
  </div>

  <el-dialog v-model="logoutTip" :title="$t('logout')" :width="screenWidth > 560 ? 500 : '90%'" :before-close="handleClose">
    <span>{{ $t('logout_tip') }}</span>
    <template #footer>
      <div class="dialog-footer">
        <el-button @click="logoutTip = false">{{ $t('cancel') }}</el-button>
        <el-button type="primary" @click="logout"> {{ $t('confirm') }} </el-button>
      </div>
    </template>
  </el-dialog>
</template>
<script setup>
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import getLangurageType from '@/hooks/langurageType'
import { useRoute, useRouter } from 'vue-router'
const { langurageType } = getLangurageType()
const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const menuList = ref([
  {
    id: '1',
    name: '我的資訊',
    key: 'profile.personal_information',
    link: '/profile'
  },
  {
    d: '2',
    name: '我的訂單',
    key: 'profile.my_order',
    link: '/order-list'
  }
])

const currentRouter = ref('')

const logoutTip = ref(false)

const handle = (id) => {
  if (id == 3) {
    logoutTip.value = true
  }
}

const handleClose = () => {
  logoutTip.value = false
}

const logout = () => {
  location.href = '/login'
}

const screenWidth = ref(window.innerWidth)

const resetSize = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', resetSize)

  // 如果是订单详情页，也变色'我的订单'
  if(route.name == 'order-detail'){
    currentRouter.value = '/order-list'
    return
  }
  // 获取当前路由地址
  currentRouter.value = '/' + route.name
})
</script>
<style scoped lang="less">
.sidebar-menu {
  width: 270px;
  border-radius: 15px;
  padding: 12px;
  background-color: #fff;
  margin-bottom: 16px;
  box-shadow: 0 0 6px #e7e7e7;
}

.sidebar-menu-label {
  padding: 8px 0px;
  color: rgba(16, 16, 16, 1);
  font-size: 16px;
  font-weight: bold;
}

.sidebar-menu-item {
  height: 40px;
  line-height: 40px;
  text-indent: 14px;
  font-size: 14px;
  border-bottom: 1px solid rgba(238, 238, 238, 1);
  a:hover {
    color: var(--color-b27437);
  }
}

.sidebar-menu-item:last-child {
  border: 0;
}

.sidebar-mobile {
  width: 100%;
  height: 54px;
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  box-shadow: 0 0 6px #e7e7e7;
  .sidebar-mobile-items {
    display: flex;
    justify-content: center;
    .sidebar-mobile-item {
      padding: 0 20px;
      border-right: 1px solid rgba(238, 238, 238, 1);
    }

    .sidebar-mobile-item:last-child {
      border: 0;
    }
  }
}
</style>
