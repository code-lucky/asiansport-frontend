<template>
  <div class="sidebar-container">
    <div class="sidebar-menu">
      <div class="sidebar-menu-label" v-if="title">{{ title }}</div>
      <div class="sidebar-menu-items">
        <div class="sidebar-menu-item" v-for="(item,index) in list" :key="index">
            <a :href="item.link">{{ item.name }}</a>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
const prop = defineProps({
  title:{
    type: String,
    default: ''
  },
  list: {
    type: Array,
    default: () => {
      return []
    }
  }
})
</script>
<style scoped lang="less">
.sidebar-menu {
  width: 270px;
  border-radius: 15px;
  padding: 12px;
  background-color: #fff;
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
}

.sidebar-menu-item:last-child {
  border: 0;
}
</style>
