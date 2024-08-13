<template>
  <div class="event-detail">
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">{{ $t('home') }}</el-breadcrumb-item>
          <el-breadcrumb-item :to="{ path: '/news-list' }">{{ $t('news_list') }}</el-breadcrumb-item>
          <el-breadcrumb-item class="active">{{ detail[langurageType('title_')] }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="event-frame">
        <div class="event-image-box" v-if="detail.systemfile">
          <div class="image-box">
            <template v-for="(item, index) in detail.systemfile" :key="index">
              <div class="image" v-if="index <= 2" @click="changeShowPerview(index)">
                <img class="img" :src="item.cover_filenamepath ? item.cover_filenamepath : getAssetURL('goods/default.png')" alt="" />
              </div>
            </template>
            <div class="img-num" v-if="detail.systemfile?.length > 3">1/{{ detail.systemfile?.length }}</div>
          </div>
          <div class="detail-image">
            <template v-for="(item, index) in detail.systemfile" :key="index">
              <div class="image-item" v-if="index < 1" @click="changeShowPerview(index)">
                <img class="img" :src="item.cover_filenamepath ? item.cover_filenamepath : getAssetURL('goods/default.png')" alt="" />
              </div>
            </template>
            <div class="detail-img-num" v-if="detail.systemfile?.length > 1">1/{{ detail.systemfile?.length }}</div>
          </div>
        </div>
        <div class="info-label">
          {{ detail[langurageType('title_')] }}
        </div>
        <div class="info-title">
          <div class="info-title-type">
            {{ detail[langurageType('newstype_name_')] }}
          </div>
          <div class="info-title-date">
            {{ detail.start_date }}
          </div>
        </div>

        <div class="info-detail" v-html="detail[langurageType('content_')]"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

import { storeToRefs } from 'pinia'
import NewsStore from '@/store/modules/news'

import ViewImage from '@/components/view-image/view-image.vue'

import { ArrowRight, Plus, Upload } from '@element-plus/icons-vue'

import getLangurageType from '@/hooks/langurageType'

import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const { langurageType } = getLangurageType()

const useNews = NewsStore()
const { detail, getNewsRelationList } = storeToRefs(useNews)

onMounted(async () => {
  const id = route.params.news_id
  console.log(route,'id.....')
  await useNews.getDetailAction({ id })

  await useNews.getNewsRelationListAction
})
</script>

<style scoped lang="less">
.event-detail {
  padding-bottom: 80px;
  .breadcrumb {
    padding: 30px 30px;
    :deep(.el-breadcrumb) {
      .is-link {
        color: var(--color-858c97);
      }
      .active {
        span {
          color: var(--color-448c74);
        }
      }
    }
  }
  .event-frame {
    padding: 0 30px;
    .event-title {
      margin-bottom: 20px;
      font-size: 30px;
      font-weight: bold;
    }
    .event-header {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
      .header-left {
      }
      .header-right {
      }
    }
    .event-image-box {
      .image-box {
        position: relative;
        display: grid;
        flex-wrap: wrap;
        gap: 15px;
        grid-template-columns: 1fr 1fr 1fr;
        grid-template-areas:
          'first first second'
          'first first third';
        // aspect-ratio: 2.03;
        margin-bottom: 30px;
        .image {
          border-radius: 12px;
          cursor: pointer;
          background-color: var(--color-f6f9fc);
          overflow: hidden;
          &:first-child {
            grid-area: first;
            flex-basis: 100%;
            inline-size: 100%;
          }
          &:nth-of-type(2) {
            grid-area: second;
          }
          &:nth-of-type(3) {
            grid-area: third;
          }
          .img {
            width: 100%;
            height: 100%;
          }
        }
        .img-num {
          position: absolute;
          right: 10px;
          bottom: 10px;
          padding: 5px 20px;
          font-size: 16px;
          color: #fff;
          border-radius: 15px;
          background: rgba(0, 0, 0, 0.5);
        }
      }
    }
    .detail-image {
      display: none;
      position: relative;
      .image-item {
        border-radius: 12px;
        overflow: hidden;
        background-color: var(--color-f6f9fc);
        .img {
          width: 100%;
        }
      }
      .detail-img-num {
        position: absolute;
        right: 10px;
        bottom: 10px;
        padding: 5px 20px;
        font-size: 16px;
        color: #fff;
        border-radius: 15px;
        background: rgba(0, 0, 0, 0.5);
      }
    }
    .event-box {
      display: flex;
      .box-left {
        flex: 2;
        margin-right: 24px;
      }
      .box-right {
        flex: 1;
      }
      .about-box {
        margin-bottom: 30px;
        .about-title {
          margin-bottom: 10px;
          font-size: 20px;
          font-weight: bold;
        }
        .about-test {
          :deep(ul) {
            margin-left: 20px;
          }
          :deep(img) {
            max-width: 100%;
          }
        }
      }
      .date-location-box {
        margin-bottom: 30px;
        .date-location-title {
          margin-bottom: 10px;
          font-size: 18px;
        }
        .date-location-test {
          display: flex;
          align-items: center;
          .test {
            position: relative;
            top: 2px;
            margin-left: 5px;
          }
        }
      }
      .organized-box {
        margin-bottom: 30px;
        .organized-title {
          margin-bottom: 10px;
          font-size: 18px;
        }
        .organized-test {
          :deep(ul) {
            margin-left: 20px;
          }
          :deep(img) {
            max-width: 100%;
          }
        }
      }
      .sports-box {
        padding: 20px;
        margin-bottom: 20px;
        text-align: center;
        border-radius: 12px;
        border: 2px solid #d3d3d3;
        cursor: pointer;
        .sports-title {
          margin-bottom: 30px;
          font-size: 20px;
        }
        .sports-test {
        }
      }
      .active {
        border-color: var(--color-448c74);
      }
      .enroll-btn {
        :deep(.el-button) {
          width: 100%;
        }

        div {
          margin-top: 6px;
        }
      }
    }
  }
}

@media screen and (max-width: 850px) {
  .event-detail {
    .dialog {
      .image-page {
        display: flex;
        flex-wrap: wrap;
        .image-item {
          width: 25%;
          padding: 5px;
        }
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .event-detail {
    .event-frame {
      .event-image-box {
        .image-box {
          display: none;
        }
      }
      .detail-image {
        display: block;
        margin-bottom: 30px;
      }
      .event-box {
        flex-direction: column;
        .box-left {
          order: 2;
          margin-right: 0;
        }
        .box-right {
          order: 1;
          margin-bottom: 20px;
          .sports-list {
            display: flex;
            flex-wrap: wrap;
            margin: 0 -10px;
            .sports-frame {
              width: 50%;
              padding: 0 10px;
            }
          }
        }
      }
    }
    .dialog {
      :deep(.el-dialog) {
        .el-dialog__body {
          .dialog-content {
            .Leve-list {
              .leve-item {
                .item-list {
                  .item {
                    .item-content {
                      .price-box {
                        display: flex;
                      }
                    }
                    .leve-price {
                      .totle-price {
                        .price {
                          display: none;
                        }
                      }
                      .qty {
                        display: none;
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }

      .form {
        .input-frame {
          display: block;

          .i-box {
            width: 100%;
          }
        }
      }
      .image-page {
        display: flex;
        flex-wrap: wrap;
        .image-item {
          width: 33.33%;
          padding: 5px;
        }
      }
    }
  }
}
@media screen and (max-width: 500px) {
  .event-detail {
    .event-frame {
      .event-box {
        .box-right {
          .sports-list {
            .sports-frame {
              width: 100%;
            }
          }
        }
      }
    }
    .dialog {
      .image-page {
        display: flex;
        flex-wrap: wrap;
        .image-item {
          width: 50%;
          padding: 5px;
        }
      }
    }
  }
}
@media screen and (max-width: 450px) {
  .event-detail {
    .breadcrumb {
      padding: 30px 15px;
      :deep(.el-breadcrumb) {
        font-size: 13px;
      }
    }
    .event-frame {
      padding: 0 15px;
    }
  }
}

:deep(.el-form-item__error) {
  display: none !important;
}

.people-index {
  margin-bottom: 4px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 12px;
}
.info-label {
  color: rgba(154, 154, 154, 1);
  font-size: 20px;
  font-weight: bold;
}
.info-title {
  display: flex;
  justify-content: space-between;
  color: rgba(108, 108, 108, 1);
  font-size: 12px;
  margin: 12px 0;
  .info-title-type {
    color: rgba(0, 104, 56, 1);
  }
}

.info-title-type {
}

</style>
