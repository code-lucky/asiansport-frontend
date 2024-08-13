<template>
  <div class="app">
    <main-header ref="mainHeaderRef" />
    <div class="app-content" :style="{ 'padding-top': height + 'px','min-height': 'calc(100vh - 210px - ' + height + 'px)'}">
      <!-- <div>{{ $t('focus') }}</div> -->
      <RouterView />
    </div>
    <MainFooter />
    <to-top v-if="isShowTop"></to-top>
  </div>
</template>

<script setup>
import { ref, onMounted, onBeforeMount } from 'vue'

import { storeToRefs } from 'pinia'
import useMainStore from '@/store/modules/main'

import ToTop from '@/components/to-top/to-top.vue'
import MainHeader from '@/components/main-header/main-header.vue'
import MainFooter from '@/components/main-footer/main-footer.vue'

import _ from 'underscore'

const useMain = useMainStore()
const { height, seo } = storeToRefs(useMain)

const mainHeaderRef = ref(null)

useMain.getSeoAction().then(() => {
  if (Object.keys(seo.value).length) {
    document.title = seo.value.sitename_tc // 修改网站标签页的标题
    document.querySelector('meta[name="websitetitle"]').setAttribute('content', seo.value.websitetitle_tc)
    document.querySelector('meta[name="description"]').setAttribute('content', seo.value.seo_description_tc)
    document.querySelector('meta[name="keywords"]').setAttribute('content', seo.value.seo_keyword_tc)
  }
})

const isShowTop = ref(false)
const handleScroll = () => {
  const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0
  if (scrollTop > 500) {
    isShowTop.value = true
  } else {
    isShowTop.value = false
  }
}

const throttled = _.throttle(handleScroll, 100)

onMounted(() => {
  if (mainHeaderRef.value) {
    setTimeout(() => {
      height.value = mainHeaderRef.value.$el.offsetHeight
    }, 100)
  }
  window.addEventListener('scroll', throttled)
})

onBeforeMount(() => {
  window.removeEventListener('scroll', throttled)
})
</script>

<style scoped lang="less"></style>
<style>
.el-drawer {
  background-color: #c09456 !important;
}
</style>
