<template>
  <div class="continer">
    <div class="news">
      <div class="sidebar-menu">
        <el-checkbox-group v-model="eventCategory" @change="changeCategory">
          <template v-for="(item, index) in categoryList" :key="index">
            <div class="sidebar-menu-item">
              <el-checkbox :value="item.id">
                <div class="item-name">{{ item[langurageType('name_')] }}</div>
              </el-checkbox>
            </div>
          </template>
        </el-checkbox-group>
      </div>
      <div class="news-list">
        <div class="news-item" v-for="(item, index) in list" :key="index" @click="goDetail(item)">
          <div class="news-item-img">
            <img :src="item.cover_filenamepath" />
          </div>
          <div class="news-item-detail">
            {{ item[langurageType('title_')] }}
          </div>
          <div class="news-item-infos">
            <div class="infos-left">{{ item[langurageType('newstype_name_')] }}</div>
            <div>{{ item.start_date }}</div>
          </div>
        </div>
      </div>
    </div>
    <div>
      <el-button type="primary" v-if="pageSearch.page_total > pageSearch.page" @click="getMoreList">{{ $t('load_more_news') }}</el-button>
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
              <div class="checkbox-brand">
                <el-checkbox-group v-model="eventCategory2">
                  <template v-for="(item, index) in categoryList" :key="index">
                    <div class="brand-item">
                      <el-checkbox :value="item.id">
                        <div class="item-name">{{ item[langurageType('name_')] }}</div>
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
import { useRoute, useRouter } from 'vue-router'
import { ref, onMounted } from 'vue'
import { storeToRefs } from 'pinia'
import useNewsStore from '@/store/modules/news.js'
import getLangurageType from '@/hooks/langurageType'
import { useI18n } from 'vue-i18n'
import { getAssetURL } from '@/utils/load_assets'
const { t, locale } = useI18n()
const { langurageType } = getLangurageType()
const route = useRoute()
const router = useRouter()
const useNews = useNewsStore()
const { categoryList, list } = storeToRefs(useNews)

const eventCategory = ref([])
const eventCategory2 = ref([])
const pageSearch = ref({
  page: 1,
  items_per_page: 12,
  page_total: 1
})

const changeCategory = async () => {
  pageSearch.value.page = 1
  list.value = []
  useNews.getListAction({ ...pageSearch.value, newstype_ids: eventCategory.value.length ? JSON.stringify(eventCategory.value) : '' }).then((res) => {
    pageSearch.value.page_total = res.page_total
  })
}

const goDetail = (item) => {
  router.push(`/news-detail/${item.id}`)
}

const drawer = ref(false)

const getMoreList = () => {
  pageSearch.value.page += 1
  useNews.getListAction({ ...pageSearch.value, newstype_ids: eventCategory.value.length ? JSON.stringify(eventCategory.value) : '' }).then((res) => {
    pageSearch.value.page_total = res.page_total
  })
}

const openDrawer = () => {
  drawer.value = true
  eventCategory2.value = [...eventCategory.value]
}

const confirmFilter = () => {
  drawer.value = false
  eventCategory.value = [...eventCategory2.value]

  changeCategory()
}

onMounted(async () => {
  list.value = []
  await useNews.getCategoryListAction()
  useNews.getListAction({ ...pageSearch.value }).then((res) => {
    pageSearch.value.page_total = res.page_total
  })
})
</script>
<style scoped lang="less">
.continer {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding-bottom: 40px;
}
.news {
  max-width: 1200px;
  width: 100%;
  padding: 30px 10px;
  display: flex;
  gap: 19px;
  align-items: flex-start;
}

.sidebar-menu {
  width: 230px;
  background-color: #fff;
  box-shadow: 0 0 6px #e7e7e7;
  border-radius: 15px;
  padding: 23px 14px;
  flex-shrink: 0;
}

.news-list {
  display: flex;
  gap: 16px;
  flex-wrap: wrap;
}

.news-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
  cursor: pointer;
  max-width: 300px;
}
.news-item-img {
  max-width: 300px;
  width: 100%;
  height: 187px;
  border-radius: 15px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #e7e7e7;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}

.news-item-img img:hover {
  transform: scale(1.05);
  transition: all 0.3s;
}

.news-item-infos {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
  div {
    font-size: 12px;
    color: #666;
  }

  .infos-left {
    color: rgba(0, 104, 56, 1);
  }
}

.news-item-detail {
  color: rgba(51, 51, 51, 1);
  font-size: 14px;
  font-weight: bold;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: normal;
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
@media screen and (max-width: 768px) {
  .filter-btn {
    display: block;
  }

  .sidebar-menu {
    display: none;
  }

  .news{
    padding: 30px;
  }
}

@media screen and (max-width: 680px) {
  .news-list {
    justify-content: center;
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
</style>
