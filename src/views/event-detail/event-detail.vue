<template>
  <div class="event-detail">
    <div class="container">
      <div class="breadcrumb">
        <el-breadcrumb :separator-icon="ArrowRight">
          <el-breadcrumb-item :to="{ path: '/' }">{{ $t('home') }}</el-breadcrumb-item>
          <el-breadcrumb-item
            :to="{
              path: '/events',
              query: {
                categroycode: [detail.eventcategory_id]
              }
            }"
            >{{ detail[langurageType('eventcategory_name_')] }}</el-breadcrumb-item
          >
          <el-breadcrumb-item class="active">{{ detail[langurageType('name_')] }}</el-breadcrumb-item>
        </el-breadcrumb>
      </div>
      <div class="event-frame">
        <div class="event-title">{{ detail[langurageType('name_')] }}</div>
        <!-- <div class="event-header">
          <div class="header-left">{{ detail[langurageType('eventcategory_name_')] }}</div>
        </div> -->
        <div class="event-image-box">
          <div class="image-box">
            <template v-for="(item, index) in detail.systemfile" :key="index">
              <div class="image" v-if="index <= 2" @click="changeShowPerview(index)">
                <img class="img" :src="item.cover_filenamepath ? item.cover_filenamepath : getAssetURL('goods/g12.avif')" alt="" />
              </div>
            </template>
            <div class="img-num" v-if="detail.systemfile?.length > 3">1/{{ detail.systemfile?.length }}</div>
          </div>
          <div class="detail-image">
            <template v-for="(item, index) in detail.systemfile" :key="index">
              <div class="image-item" v-if="index < 1" @click="changeShowPerview(index)">
                <img class="img" :src="item.cover_filenamepath ? item.cover_filenamepath : getAssetURL('goods/g12.avif')" alt="" />
              </div>
            </template>
            <div class="detail-img-num" v-if="detail.systemfile?.length > 1">1/{{ detail.systemfile?.length }}</div>
          </div>
        </div>
        <div class="event-box">
          <div class="box-left">
            <div class="about-box">
              <div class="about-title">{{ $t('about') }}</div>
              <div class="about-test">
                <div v-html="detail[langurageType('information_')]"></div>
              </div>
            </div>
            <div class="date-location-box">
              <div class="date-location-title">{{ $t('date_and_time') }}</div>
              <div class="date-location-test">
                <el-icon size="16"><Calendar /></el-icon>
                <div class="test">{{ detail.start_date }} {{ detail.start_time }} - {{ detail.end_date }} {{ detail.end_time }}</div>
              </div>
            </div>
            <div class="date-location-box">
              <div class="date-location-title">{{ $t('location') }}</div>
              <div class="date-location-test">
                <el-icon size="16"><LocationInformation /></el-icon>
                <div class="test">{{ detail[langurageType('address_')] }}</div>
              </div>
            </div>
            <div class="organized-box">
              <div class="organized-title">{{ $t('organiser') }}</div>
              <div class="organized-test">{{ detail[langurageType('clubs_name_')] ? detail[langurageType('clubs_name_')] : '-' }}</div>
            </div>
            <div class="organized-box">
              <div class="organized-title">{{ $t('details') }}</div>
              <div class="organized-test"><div v-html="detail[langurageType('notice_')]"></div></div>
            </div>
          </div>
          <div class="box-right">
            <div class="sports-list">
              <template v-for="item in eventItemList" :key="item.id">
                <div class="sports-frame">
                  <div class="sports-box" @click="changeProject(item.id)" :class="{ active: currentProject === item.id }">
                    <div class="sports-title">{{ item[langurageType('name_')] }}</div>
                    <div class="sports-test">{{ item[langurageType('description_')] ? item[langurageType('description_')] : '-' }}</div>
                  </div>
                </div>
              </template>
            </div>

            <div class="enroll-btn" v-if="eventItemList.length">
              <el-button type="warning" color="#448c74" :disabled="detail.can_join == 0 || detail.can_join == -1" size="large" @click="goProject">{{
                $t('enroll_now')
              }}</el-button>
              <div v-if="detail.can_join == 1">{{ $t('deadline_for_registration') }}:{{ detail.join_end_datetime }}</div>
              <div v-if="detail.can_join == 0">{{ $t('registration_start') }}:{{ detail.join_start_datetime }}</div>
              <div v-if="detail.can_join == -1">{{ $t('closed_registration') }}</div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="dialog">
      <el-dialog v-model="dialogVisible" :title="eventItemDetail[langurageType('name_')]" width="80%" align-center>
        <div class="dialog-content">
          <div class="Leve-list">
            <!-- <template v-for="leveitem in leveList" :key="leveitem.id"> -->
            <div class="leve-item">
              <!-- <div class="leve-title">{{ leveitem.name }}</div> -->
              <div class="item-list">
                <template v-for="item in eventItemDetail.item_level" :key="item.id">
                  <div class="item">
                    <div class="item-content">
                      <div class="item-name">{{ item[langurageType('event_level_name_')] }}</div>
                      <div class="item-tip">{{ item[langurageType('description_')] }}</div>
                      <div class="price-box">
                        <span class="nprice">HK${{ item.setting_discount == '1' ? item.discount_price : item.price }}</span>
                        <div class="oqty" v-if="item.setting_discount == '1'">HK${{ item.price }}</div>
                      </div>
                    </div>
                    <div class="leve-price">
                      <div class="totle-price">
                        <span class="price">HK${{ item.setting_discount == '1' ? item.discount_price : item.price }}</span>
                        <el-button size="small" plain :icon="Plus" @click="goApplication(item)"></el-button>
                      </div>
                      <div class="qty" v-if="item.setting_discount == '1'">HK${{ item.price }}</div>
                    </div>
                  </div>
                </template>
              </div>
            </div>
            <!-- </template> -->
          </div>
        </div>
        <!-- <template #footer>
          <div class="dialog-footer">
            <el-button @click="dialogVisible = false">Cancel</el-button>
            <el-button type="primary" @click="dialogVisible = false"> Confirm </el-button>
          </div>
        </template> -->
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog v-model="dialogApplication" :title="currentLevel[langurageType('event_level_name_')]" width="80%" align-center>
        <div class="dialog-content-application">
          <div class="form">
            <el-form ref="formRef" :model="form" :rules="rules">
              <!-- <div class="application-title"></div> -->
              <el-card class="card" v-if="eventItemDetail.required_team == '1'">
                <div class="input-frame">
                  <div class="input-box">
                    <el-form-item :label="$t('team_tip')" prop="event_team_name">
                      <el-input v-model="form.event_team_name" size="large" :placeholder="$t('please_input')" clearable />
                    </el-form-item>
                  </div>
                </div>
              </el-card>

              <template v-for="(item, index) in form.people" :key="index">
                <el-card class="card">
                  <div class="people-index">
                    <div>{{ $t('place', { index: index + 1 }) }}</div>
                    <div v-if="item.is_required != 1">
                      {{ $t('not_fill_in') }}：<el-switch v-model="item.isCheck" :active-value="1" :inactive-value="0" inline-prompt />
                    </div>
                  </div>
                  <template v-if="item.isCheck == 1">
                    <div class="input-frame">
                      <div class="input-box">
                        <el-form-item :label="$t('first_name')" :prop="`people[${index}].first_name`" :rules="peopleRules.first_name">
                          <el-input v-model="item.first_name" size="large" :placeholder="$t('please_input')" clearable />
                        </el-form-item>
                      </div>
                      <div class="input-box">
                        <el-form-item :label="$t('last_name')" :prop="`people[${index}].last_name`" :rules="peopleRules.last_name">
                          <el-input v-model="item.last_name" size="large" :placeholder="$t('please_input')" clearable />
                        </el-form-item>
                      </div>
                    </div>
                    <div class="input-frame">
                      <div class="input-box">
                        <el-form-item :label="$t('gender')" :prop="`people[${index}].gender`" :rules="peopleRules.gender">
                          <template v-if="item.gender_value === 'notlimit'">
                            <el-select v-model="item.gender" size="large" :placeholder="$t('gender')" value-key="id" clearable>
                              <el-option v-for="itm in genderList" :key="itm.key" :label="itm[langurageType('name_')]" :value="itm.key" />
                            </el-select>
                          </template>
                          <template v-else>
                            <el-select v-model="item.gender" size="large" :placeholder="$t('gender')" value-key="id" clearable disabled>
                              <el-option v-for="itm in genderList" :key="itm.key" :label="itm[langurageType('name_')]" :value="itm.key" />
                            </el-select>
                          </template>
                        </el-form-item>
                      </div>
                      <div class="input-box">
                        <el-form-item :label="$t('year_of_birth')" :prop="`people[${index}].dob`" :rules="peopleRules.dob">
                          <el-date-picker v-model="item.dob" size="large" type="date" format="YYYY-MM-DD" value-format="YYYY-MM-DD" placeholder="YYYY-MM-DD" />
                        </el-form-item>
                      </div>
                    </div>
                    <div class="input-frame">
                      <div class="input-box">
                        <el-form-item :label="$t('email')" :prop="`people[${index}].email`" :rules="peopleRules.email">
                          <el-input v-model="item.email" size="large" :placeholder="$t('please_input')" clearable />
                        </el-form-item>
                      </div>
                      <div class="input-box">
                        <el-form-item :label="$t('nation')" :prop="`people[${index}].nation_id`" :rules="peopleRules.nation_id">
                          <el-select v-model="item.nation_id" size="large" :placeholder="$t('please_select')" value-key="id" clearable>
                            <el-option v-for="itm in nationList" :key="itm.id" :label="itm[langurageType('name_')]" :value="itm.id" />
                          </el-select>
                        </el-form-item>
                      </div>
                    </div>
                    <div class="input-frame" v-if="eventItemPeople.contactparameter">
                      <template v-for="it in eventItemPeople.contactparameter" :key="it.id">
                        <div class="i-box">
                          <el-form-item :label="it[langurageType('name_')]" :prop="`people[${index}].contactparameter[${it.id}]`" :rules="peopleRules[it.id]">
                            <el-input v-model="item.contactparameter[it.id]" size="large" :placeholder="$t('please_input')" clearable />
                          </el-form-item>
                        </div>
                      </template>
                    </div>
                  </template>
                </el-card>
              </template>
            </el-form>
          </div>
        </div>
        <template #footer>
          <div class="dialog-footer">
            <el-button size="large" @click="dialogApplication = false">{{ $t('cancel') }}</el-button>
            <el-button size="large" color="#448c74" @click="payBtn">{{ $t('add_cart') }}</el-button>
          </div>
        </template>
      </el-dialog>
    </div>
    <div class="dialog">
      <el-dialog v-model="dialogImage" :title="detail[langurageType('name_')]" width="80%" align-center>
        <div class="image-page">
          <template v-for="(item, index) in detail.systemfile" :key="index">
            <div class="image-item">
              <el-image
                style="width: 100%"
                :src="item.cover_filenamepath"
                :zoom-rate="1.2"
                :max-scale="7"
                :min-scale="0.2"
                :preview-src-list="srcList(detail.systemfile)"
                :initial-index="index"
                fit="cover"
              />
            </div>
          </template>
        </div>
      </el-dialog>
    </div>
    <div v-if="showPerview">
      <view-image
        :list="detail.systemfile"
        :currentIndex="currentIndex"
        :showPerview="showPerview"
        @closeImage="closeImage"
        @leftMore="leftMore"
        @rightMore="rightMore"
        @changeIndex="changeIndex"
      ></view-image>
    </div>
  </div>
</template>

<script setup>
import Swal from 'sweetalert2'
import { ref, reactive, computed, nextTick } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

import { storeToRefs } from 'pinia'
import useEventStore from '@/store/modules/event'
import useCartStore from '@/store/modules/cart'
import useMainStore from '@/store/modules/main'

import ViewImage from '@/components/view-image/view-image.vue'

import { ArrowRight, Plus, Upload } from '@element-plus/icons-vue'

import getLangurageType from '@/hooks/langurageType'

import { useI18n } from 'vue-i18n'

import { emit } from '@/utils/eventbus.js'



const { t } = useI18n()

const route = useRoute()
const router = useRouter()

const useEvent = useEventStore()
const { detail, eventItemList, eventItemDetail, eventItemPeople } = storeToRefs(useEvent)

detail.value = {}
eventItemList.value = []
eventItemDetail.value = {}

const useMain = useMainStore()
const { nationList, textType } = storeToRefs(useMain)

const useCart = useCartStore()
const { session_id } = storeToRefs(useCart)

useEvent.getDetailAction({ id: route.params.event_id })
useEvent.getEventItemListAction({ event_id: route.params.event_id })
useMain.getNationListAction()

const { langurageType } = getLangurageType()
const genderList = ref([
  {
    key: 'male',
    name_en: 'Male',
    name_tc: '男生'
  },
  {
    key: 'female',
    name_en: 'Female',
    name_tc: '女生'
  }
])
const dialogVisible = ref(false)
const dialogApplication = ref(false)

const currentProject = ref(null)
const changeProject = (id) => {
  if (currentProject.value != id) {
    currentProject.value = id
  }
}

const goProject = () => {
  if (currentProject.value) {
    dialogVisible.value = true
    useEvent.getEventItemDetailAction({ id: currentProject.value })
  } else {
    ElMessage({
      showClose: true,
      message: t('project_tip'),
      type: 'error'
    })
  }
}

const goApplication = (item) => {
  currentLevel.value = {
    ...item
  }
  dialogApplication.value = true
  form.value.people = []
  form.value.event_team_name = ''
  useEvent
    .getEventItemPeopleAction({
      item_id: currentProject.value,
      event_id: route.params.event_id
    })
    .then(() => {
      if (Object.keys(eventItemPeople.value).length) {
        eventItemPeople.value.people.forEach((item) => {
          let contactparameter = {}
          eventItemPeople.value.contactparameter.forEach((itm) => {
            contactparameter[itm.id] = ''
            if (itm.is_required == '1') {
              peopleRules[itm.id] = [{ required: true, message: t('please_input') + itm['name_' + textType.value], trigger: 'blur' }]
            }
          })
          form.value.people.push({
            dob: '',
            gender: item['gender'] === 'notlimit' ? 'male' : item['gender'],
            email: '',
            first_name: '',
            last_name: '',
            nation_id: '',
            gender_value: item['gender'],
            contactparameter,
            is_required: item['is_required'] == 1 ? 1 : 0,
            isCheck: item['is_required'] == 1 ? 1 : 0
          })
        })
      }
    })
}

const formRef = ref(null)
const currentLevel = ref({})
const form = ref({
  event_team_name: '',
  people: []
})

const rules = reactive({
  event_team_name: [{ required: true, message: t('please_input') + ' ' + t('team_tip'), trigger: 'blur' }]
})
const peopleRules = reactive({
  dob: [{ required: true, message: t('please_input') + ' ' + t('year_of_birth'), trigger: 'blur' }],
  email: [{ required: true, message: t('please_input') + ' ' + t('email'), trigger: 'blur' }],
  first_name: [{ required: true, message: t('please_input') + ' ' + t('first_name'), trigger: 'blur' }],
  last_name: [{ required: true, message: t('please_input') + ' ' + t('last_name'), trigger: 'blur' }],
  gender: [{ required: true, message: t('please_select') + ' ' + t('gender'), trigger: 'blur' }],
  nation_id: [{ required: true, message: t('please_select') + ' ' + t('nation'), trigger: 'blur' }]
})

const payBtn = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
      let clients = [...form.value.people]
      clients = clients.map((item) => {
        let contactparameter = eventItemPeople.value.contactparameter.map((it) => {
          let value = item.contactparameter[it.id]
          return {
            ...it,
            value
          }
        })
        return {
          ...item,
          contactparameter
        }
      })

      const params = clients.filter((item) => item.isCheck == 1)

      // 判斷電郵是否重複
      const emailSet = new Set()
      for (let client of params) {
        if (emailSet.has(client.email)) {
          Swal.fire({
            title: t('repetition_email'),
            text: t('again_email'),
            icon: 'warning',
            confirmButtonText: t('got_it')
          })
          return
        }
        emailSet.add(client.email)
      }

      // 判斷clients裡的isCheck !=1

      console.log(params)
      const formData = new FormData()
      if (eventItemDetail.value.required_team == '1') {
        formData.append('event_team_name', form.value.event_team_name)
      }
      formData.append('event_id', route.params.event_id)
      formData.append('event_item_id', currentProject.value)
      formData.append('session_id', session_id.value)
      formData.append('event_level_id', currentLevel.value.event_level_id)
      formData.append('clients', JSON.stringify(params))
      useCart.addCartAction(formData).then((res) => {
        if (res) {
          dialogApplication.value = false
          dialogVisible.value = false
          // 成功後打開購物車
          emit('open-cart', true)
        }
      })

      // useCart.addCartAction({
      //   event_id: route.params.event_id,
      //   event_item_id: currentProject.value,
      //   event_level_id: currentLevel.value.event_level_id,
      //   clients: JSON.stringify(clients)
      // })
    } else {
      ElMessage({
        showClose: true,
        message: t('form_tip'),
        type: 'error'
      })
    }
  })
}

const dialogImage = ref(false)

const openImage = () => {
  dialogImage.value = true
}

const srcList = computed(() => {
  return (imgList) => {
    if (imgList.length) {
      let arr = imgList.map((item) => {
        return item.cover_filenamepath
      })
      return arr
    } else {
      return []
    }
  }
})

const showPerview = ref(false)
const currentIndex = ref(0)

const changeShowPerview = (e) => {
  showPerview.value = true
  currentIndex.value = e
}

const closeImage = () => {
  showPerview.value = false
}
const leftMore = () => {
  if (currentIndex.value === 0) {
    currentIndex.value = detail.value.systemfile.length - 1
  } else {
    currentIndex.value = currentIndex.value - 1
  }
}
const rightMore = () => {
  if (currentIndex.value === detail.value.systemfile.length - 1) {
    currentIndex.value = 0
  } else {
    currentIndex.value = currentIndex.value + 1
  }
}

const changeIndex = (e) => {
  currentIndex.value = e
}
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
          color: var(--color-b27437);
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
        border-color: var(--color-b27437);
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
  .dialog {
    :deep(.el-dialog) {
      max-width: 1000px;
      min-width: 330px;
      max-height: 80vh;
      .el-dialog__body {
        max-height: calc(80vh - 146px);
        overflow-y: auto;
        .dialog-content {
          height: 100%;
          // padding: 0 20px;
          color: var(--color-212529);
          .Leve-list {
            .leve-item {
              margin-bottom: 20px;
              .leve-title {
                margin-bottom: 10px;
                font-size: 18px;
              }
              .item-list {
                .item {
                  display: flex;
                  align-items: center;
                  padding: 20px 20px 15px;
                  margin-bottom: 10px;
                  border: 1px solid var(--color-e3e9ef);
                  //   cursor: pointer;
                  .item-content {
                    flex: 1;
                    padding-right: 20px;
                    .item-name {
                      margin-bottom: 5px;
                    }
                    .item-tip {
                      margin-bottom: 5px;
                      color: var(--color-858c97);
                    }
                    .price-box {
                      display: none;
                      align-items: flex-end;
                      .nprice {
                        margin-right: 5px;
                        font-size: 15px;
                      }
                      .oqty {
                        font-size: 13px;
                        color: #ccc;
                        text-decoration: line-through;
                      }
                    }
                  }
                  .leve-price {
                    flex-shrink: 0;
                    .totle-price {
                      display: flex;
                      align-items: center;

                      .price {
                        font-size: 16px;
                        margin-right: 10px;
                      }
                    }
                    .qty {
                      color: #ccc;
                      text-decoration: line-through;
                    }
                  }
                }
              }
            }
          }
        }
        .dialog-content-application {
          padding: 0;
        }
      }
    }

    .form {
      .application-title {
        margin-bottom: 20px;
        font-size: 22px;
        font-weight: bold;
      }
      .input-frame {
        display: flex;
        flex-wrap: wrap;
        margin: 0 -10px;
        .input-box {
          flex: 1;
          padding: 0 10px;
        }
        .i-box {
          width: 50%;
          padding: 0 10px;
        }
      }
      :deep(.el-form) {
        .card {
          margin-bottom: 20px;
          .el-card__body {
            padding-bottom: 0;
          }
        }
        .el-form-item {
          display: block;
          width: 100%;
          margin-bottom: 18px;
          .el-form-item__label {
            height: 16px;
            line-height: 16px;
            margin-bottom: 5px;
            font-size: 14px;
            font-weight: 600;
            color: #1b2a4e;
          }
        }
        .el-form-item.is-required {
          .el-form-item__label {
            &::before {
              display: none;
            }
            &::after {
              content: '*';
              color: var(--el-color-danger);
              margin-left: 4px;
            }
          }
        }
        .el-select {
          flex: 1;
        }
        .el-input {
          flex: 1;
          .el-input__wrapper {
            font-size: 14px;
          }
        }
        .el-textarea {
          font-size: 14px;
        }
        .el-checkbox-group {
          flex: 1;
          .el-checkbox {
            width: 33.33%;
            margin-right: 0;
            .el-checkbox__label {
              font-size: 16px;
              white-space: pre-wrap;
              color: #1b2a4e;
            }
            .el-checkbox__input.is-checked + .el-checkbox__label {
              color: #1b2a4e;
            }
          }
        }
        .el-radio-group {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          .el-radio {
            .el-radio__label {
              font-size: 14px;
            }
          }
        }
      }
    }
    .image-page {
      display: flex;
      flex-wrap: wrap;
      .image-item {
        width: 20%;
        padding: 5px;
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
</style>
