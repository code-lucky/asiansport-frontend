<template>
  <!-- <div class="view-image" @wheel="changeWheel"> -->
  <div class="view-image">
    <div class="usb-btn close" @click="onCloseImage">
      <el-icon><Close /></el-icon>
    </div>
    <div class="usb-btn left" @click="onLeftMore">
      <el-icon><ArrowLeft /></el-icon>
    </div>
    <div class="usb-btn right" @click="onRightMore">
      <el-icon><ArrowRight /></el-icon>
    </div>
    <!-- <div class="usb-actions">
      <div class="icon">
        <el-icon @click="downMore"><ZoomOut /></el-icon>
      </div>
      <div class="icon">
        <el-icon @click="upMore"><ZoomIn /></el-icon>
      </div>
    </div> -->

    <div class="image-frame">
      <div class="image_canvas" ref="canvasRef">
        <template v-for="(item, index) in list" :key="index">
          <img
            :style="{ display: currentIndex === index ? 'block' : 'none', transform: `scale(${scale}) rotate(${0}deg)` }"
            :src="item.cover_filenamepath"
            alt=""
          />
        </template>
        <!-- <div class="list-num">123</div> -->
        <div class="image-box">
          <div class="usb-btn2 mr5" @click="lMore" v-if="isShowBtn" :class="{ no: translate === 0 }">
            <el-icon><ArrowLeft /></el-icon>
          </div>
          <div class="image-list-box">
            <div class="image-list" :style="{ transform: `translateX(${translate}px)` }">
              <template v-for="(item, index) in list" :key="index">
                <div class="image">
                  <img :class="{ 'active-image': currentIndex === index }" @click="onChangeIndex(index)" :src="item.cover_filenamepath" alt="" />
                </div>
              </template>
            </div>
          </div>
          <div class="usb-btn2 ml5" @click="rMore" v-if="isShowBtn" :class="{ no: (list.length * 110 + translate) / 110 <= (width - 70) / 110 }">
            <el-icon><ArrowRight /></el-icon>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted, onUnmounted, ref, watchEffect } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

const emit = defineEmits(['closeImage', 'leftMore', 'rightMore', 'changeIndex'])
const prop = defineProps({
  list: {
    type: Array,
    default: () => {
      return []
    }
  },
  currentIndex: {
    type: Number,
    default: 0
  },
  showPerview: {
    type: Boolean,
    default: false
  }
})

const scale = ref(1)
const rotate = ref(0)

const translate = ref(0)

const canvasRef = ref(null)

const width = ref(prop.list.length * 110)

const changeWheel = (e) => {
  if (e.deltaY < 0) {
    if (scale.value < 7.4) {
      let str = scale.value + 0.2
      scale.value = Number(str.toFixed(2))
    }
  } else {
    if (scale.value > 0.2) {
      let str = scale.value - 0.2
      scale.value = Number(str.toFixed(2))
    }
  }
}
const downMore = () => {
  if (scale.value > 0.2) {
    let str = scale.value - 0.2
    scale.value = Number(str.toFixed(2))
  }
}
const upMore = () => {
  if (scale.value < 7.4) {
    let str = scale.value + 0.2
    scale.value = Number(str.toFixed(2))
  }
}

const isShowBtn = computed(() => {
  if (prop.list.length * 110 > width.value) {
    return true
  } else {
    return false
  }
})

const onCloseImage = () => {
  emit('closeImage')
}
const onLeftMore = () => {
  scale.value = 1
  rotate.value = 0
  emit('leftMore')
}
const onRightMore = () => {
  scale.value = 1
  rotate.value = 0
  emit('rightMore')
}

const onChangeIndex = (e) => {
  scale.value = 1
  rotate.value = 0
  emit('changeIndex', e)
}
const changeWidth = () => {
  width.value = canvasRef.value?.offsetWidth ?? 0
  translate.value = 0
}

watchEffect(() => {
  if (prop.showPerview) {
    setTimeout(() => {
      changeWidth()
    }, 800)
  }
})

onMounted(() => {
  window.addEventListener('resize', changeWidth)
})
onUnmounted(() => {
  window.removeEventListener('resize', changeWidth)
})
const rMore = () => {
  if ((prop.list.length * 110 + translate.value) / 110 <= (width.value - 70) / 110) {
    console.log()
  } else {
    translate.value = translate.value - 110
  }
}

const lMore = () => {
  if (translate.value === 0) {
    console.log()
  } else {
    translate.value = translate.value + 110
  }
}
</script>

<style scoped lang="less">
.view-image {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  z-index: 2013;
  background: rgba(0, 0, 0, 0.5);

  .usb-btn {
    width: 44px;
    height: 44px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
    flex-shrink: 0;
  }
  .close {
    position: absolute;
    right: 40px;
    top: 40px;
  }
  .left {
    position: absolute;
    top: 50%;
    left: 40px;
    transform: translateY(-50%);
  }
  .right {
    position: absolute;
    top: 50%;
    right: 40px;
    transform: translateY(-50%);
  }
  .usb-actions {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: rgba(0, 0, 0, 0.2);
    border-color: #fff;
    border-radius: 22px;
    bottom: 120px;
    height: 44px;
    left: 50%;
    padding: 0 24px;
    transform: translate(-50%);
    width: 120px;
    z-index: 1;
    .icon {
      height: 100%;
      display: flex;
      align-items: center;
      font-size: 24px;
      color: #fff;
      :deep(.el-icon) {
        cursor: pointer;
      }
    }
  }
  .image-frame {
    width: 100%;
    height: 100%;
    position: relative;
    top: 45%;
    transform: translateY(-50%);
    display: flex;
    justify-content: center;
    padding: 0 30px;
    // align-items: center;
  }
  .image_canvas {
    // width: 100%;
    height: 70%;
    position: relative;
    // top: 45%;
    top: 50%;
    transform: translateY(-50%);
    display: flex;
    align-items: center;
    justify-content: center;
    user-select: none;
    img {
      max-width: 100%;
      max-height: 100%;
    }
  }
  .list-num {
    position: absolute;
    width: 1024px;
    height: 768px;
    max-height: 100%;
    max-width: 100%;
    right: 0px;
    bottom: 0px;
  }
  .image-box {
    width: 100%;
    position: absolute;
    // left: 50%;
    left: 0;
    bottom: -85px;
    // bottom: -120px;
    display: flex;
    align-items: center;
  }
  .image-list-box {
    // padding: 0 5px;
    overflow: hidden;
  }
  .image-list {
    // transform: translateX(-50%);
    flex: 1;
    display: flex;
    align-items: center;
    margin: 0px -5px;
    // overflow: hidden;
    transition: all 1s ease;
    .image {
      width: 110px;
      //   margin-right: 10px;
      flex-shrink: 0;
      padding: 0 5px;
      img {
        width: 100%;
        border-radius: 5px;
        cursor: pointer;
      }
    }
  }
  .active-image {
    border: 3px solid var(--color-b27437);
    box-sizing: border-box;
  }
  .usb-btn2 {
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 24px;
    color: #fff;
    background: rgba(0, 0, 0, 0.2);
    border-radius: 50%;
    cursor: pointer;
    z-index: 1;
    flex-shrink: 0;
  }
  .ml5 {
    margin-left: 5px;
  }
  .mr5 {
    margin-right: 5px;
  }
  .no {
    cursor: not-allowed;
  }
}
</style>
