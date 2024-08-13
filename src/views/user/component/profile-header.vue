<template>
  <div class="nav-header">
    <div class="nav-header-item" v-for="(item, idx) in navList" :key="idx">
      <a :href="item.link" :style="{ color: currentRouter == item.link ? 'var(--color-b27437)' : '' }" @click="handle(item.id)">{{ $t(item.key) }}</a>
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
import { ElMessage, ElMessageBox } from 'element-plus'
import { ref, reactive, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import getLangurageType from '@/hooks/langurageType'
import { useRoute, useRouter } from 'vue-router'
const { langurageType } = getLangurageType()
const { t, locale } = useI18n()
const route = useRoute()
const router = useRouter()
const navList = [
  {
    id: 1,
    key: 'profile.personal_information',
    link: '/profile'
  },
  {
    id: 2,
    key: 'profile.my_order',
    link: '/order-list'
  },
  {
    id: 3,
    key: 'profile.logout',
    link: '#'
  }
]

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
  // 获取当前路由地址
  currentRouter.value = '/' + route.name
})
</script>
<style lang="less" scoped>
.nav-header {
  display: flex;
  margin-bottom: 30px;
  .nav-header-item {
    padding: 0 20px;
    font-size: 16px;
    line-height: 24px;
    border-right: 1px solid #e7e7e7;
    cursor: pointer;

    a:hover {
      color: var(--color-b27437);
    }
  }

  .nav-header-item:last-child {
    border: 0;
  }
}
</style>
