<template>
  <div class="to-top">
    <div class="toimage-icon">
      <el-button @click="toTop" :icon="Top" size="large" circle />
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

import { Top } from '@element-plus/icons-vue'

const toTop = () => {
  // 增加動畫滾動效果
  // window.scrollTo(0, 0)
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}
</script>

<style scoped lang="less">
.to-top {
  position: fixed;
  right: 15px;
  bottom: 20%;
  z-index: 1;
  .toimage-icon {
  }
}
</style>
