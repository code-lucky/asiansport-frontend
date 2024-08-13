<template>
  <div class="footer">
    <div class="footer-content">
      <div class="container">
        <div class="footer-frame">
          <div class="footer-box">
            <div class="footer-nav">
              <template v-for="(item, index) in footerList" :key="index">
                <div class="nav-item">
                  <div class="nav-name">{{ $t(item.key) }}</div>
                  <div class="path-list">
                    <template v-for="(path, indx) in item.list" :key="indx">
                      <div :class="path.path == '#' ? 'path-item-default' : 'path-item'">
                        <div class="path-sub-title" v-if="path.url">{{ $t(path.key) }}</div>
                        <template v-if="path.url">
                          <a :href="path.path" target="_blank">{{ path.url }}</a>
                        </template>
                        <template v-else>
                          <router-link :to="path.path" v-if="path.path != '#'">{{ $t(path.key) }}</router-link>
                          <a href="javascript:void(0)" v-else class="default" v-html="$t(path.name)"></a>
                        </template>
                      </div>
                    </template>
                  </div>
                </div>
              </template>
              <div class="nav-item">
                <div class="nav-name">{{ contactDetail[langurageType('name_')] }}</div>
                <div class="path-list" v-html="contactDetail[langurageType('content_')]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="footer-frame">
        <div class="footer-tip">&copy;&nbsp;Copyright 2012 - 2024 SportsFay.</div>
      </div>
      <!-- <div>English</div> -->
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

import useArticleStore from '@/store/modules/article'

import { storeToRefs } from 'pinia'
import useMainStore from '@/store/modules/main'

import getLangurageType from '@/hooks/langurageType'

const useArticle = useArticleStore()

const { contactDetail } = storeToRefs(useArticle)
useArticle.getContactDetailAction()
const useMain = useMainStore()
const { seo } = storeToRefs(useMain)

useMain.getSeoAction()

const { langurageType } = getLangurageType()

const footerList = [
  {
    name: '認識我們',
    key: 'footer.know_us',
    list: [
      {
        name: '關於我們',
        path: '/about',
        key: 'footer.about'
      }
    ]
  },
  {
    name: '網站條款',
    key: 'footer.website_terms',
    list: [
      {
        name: '私隱條例',
        path: '/privacy',
        key: 'footer.privacy_policy'
      },
      {
        name: '條款及細則',
        path: '/terms',
        key: 'footer.terms_of_service'
      }
    ]
  }
]
</script>

<style scoped lang="less">
.footer {
  background: var(--color-f2f2f2);
  .footer-content {
    padding: 40px 0 0 0;
    border-bottom: 1px solid var(--color-b4bbc3);
  }
  .footer-frame {
    padding: 0 30px;
    .footer-box {
      display: flex;
      // justify-content: space-between;
    }
    .logo-image {
      display: inline-block;
      width: 150px;
      margin-bottom: 20px;
      .img {
        width: 100%;
        cursor: pointer;
      }
    }
    .footer-nav {
      flex: 1;
      display: flex;
      // justify-content: space-between;
      flex-wrap: wrap;
      .nav-item {
        min-width: 227px;
        // padding: 0 10px;
        margin-bottom: 20px;
        font-size: 15px;
        .nav-name {
          margin-bottom: 20px;
          font-size: 17px;
          font-weight: bold;
        }
        .path-list {
          .path-item {
            .path-sub-title {
              margin-bottom: 5px;
            }
            a {
              display: inline-block;
              margin-bottom: 5px;
              line-height: 22px;
              &:hover {
                color: var(--color-006838);
              }
            }
          }

          .path-item-default {
            .path-sub-title {
              margin-bottom: 5px;
            }
            a {
              display: inline-block;
              margin-bottom: 5px;
              line-height: 22px;
            }
          }
          .mb20 {
            margin-bottom: 20px;
            a {
              text-decoration: underline;
              &:hover {
                color: var(--color-be1e2d);
              }
            }
          }
        }
      }
    }
    .footer-tip {
      line-height: 20px;
      text-align: left;
      padding: 20px 0;
    }
    .footer-test {
      padding-bottom: 10px;
      line-height: 16px;
      font-size: 12px;
      text-align: center;
    }
    .payment-type-image {
      margin-bottom: 20px;
      text-align: center;
      img {
        height: 32px;
      }
    }
  }
}
@media screen and (max-width: 820px) {
  .footer {
    .footer-frame {
      .footer-box {
        display: block;
      }
    }
  }
}

@media screen and (max-width: 768px) {
  .footer-tip {
    padding-bottom: 60px !important;
  }
}

@media screen and (max-width: 560px) {
  .footer {
    .footer-frame {
    }
  }
}
@media screen and (max-width: 450px) {
  .footer {
    .footer-frame {
      padding: 12px 15px;
    }
  }
}

.default {
  cursor: auto;
}
</style>
