<template>
  <div class="about">
    <div class="container">
      <div class="about-kaimost-title">{{ detail[langurageType('name_')] }}</div>
      <div class="about-kaimost-box">
        <div class="about-kaimost-left">
          <div v-html="detail[langurageType('content_')]"></div>
          <!-- <div>
            Kaimost Industrial Ltd established in 1989 with more than 34 years of manufacturing experiences in home decorating products. Specialized in
            Artificial flowers, Greenery, Plant, Tree and Seasonal Decorative items.
          </div>
          <br />
          <div>
            Our factory and showroom located in Changping, Dongguan, Guangdong province with more than 10,000 sq. meter of production area and Warehouse and
            1,500 sq. meter of showroom and sample development area. We are capable to serve customer requests of every aspect of home decoration need.
          </div>
          <br />
          <div>Our skillful workers and strong product development team will fully satisfy customer required of high quality and trendy products.</div>
          <br />
          <div>
            We located within 1.5 hours from HK, SZ, GZ airports and high speed train stations. Our convenient location will make your sourcing trip effectively
            and easy.
          </div> -->
        </div>
        <!-- <div class="about-kaimost-right pl100">
          <div class="about-kaimost-image"><img :src="getAssetURL('97.jpg')" alt="" /></div>
        </div> -->
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

import { storeToRefs } from 'pinia'
import useAboutStore from '@/store/modules/about'

import getLangurageType from '@/hooks/langurageType'

const useAbout = useAboutStore()
const { detail } = storeToRefs(useAbout)

useAbout.getDetailAction()

const { langurageType } = getLangurageType()
</script>

<style scoped lang="less">
.about {
  padding: 30px 0 60px;
  // background: var(--color-f8f9fa);
  .about-kaimost-title {
    padding: 30px 30px;
    text-align: center;
    font-size: 26px;
    font-weight: bold;
  }
  .about-kaimost-box {
    display: flex;
    padding: 0 30px;

    .about-kaimost-left {
      flex: 5;
      font-size: 15px;
      line-height: 24px;
      color: var(--color-6c757d);
      :deep(img) {
        max-width: 100%;
      }
    }
    .about-kaimost-right {
      flex: 3;
      display: flex;
      align-items: center;
      .about-kaimost-image {
        position: relative;
        padding: 0 40px 0 80px;
        &::before {
          content: '';
          position: absolute;
          top: 35%;
          bottom: 10%;
          left: 0;
          right: 0;
          background-color: var(--color-f7c86f);
        }
        img {
          position: relative;
          z-index: 1;
          width: 100%;
        }
      }
    }
    .pl100 {
      padding-left: 100px;
    }
  }
}
@media screen and (max-width: 1024px) {
  .about {
    .about-kaimost-box {
      display: block;
      .about-kaimost-left {
        margin-bottom: 30px;
      }
      .pl100 {
        padding-left: 0px;
      }
    }
  }
}
</style>
