<template>
  <div class="contact">
    <div class="container">
      <div class="contacts-box">
        <div class="contacts-left pr100">
          <div class="contacts-title">{{ $t('contacts') }}</div>
          <div class="contacts-tip">{{ $t('contacts_test') }}</div>
        </div>
        <div class="contacts-right">
          <el-form :model="form" :rules="rules" ref="formRef">
            <div class="input-frame">
              <div class="input-box pr20">
                <el-form-item :label="$t('name')" prop="client_name">
                  <el-input v-model="form.client_name" size="large" :placeholder="$t('please_input')" clearable />
                </el-form-item>
              </div>
              <div class="input-box">
                <el-form-item :label="$t('email')" prop="client_email">
                  <el-input v-model="form.client_email" size="large" :placeholder="$t('please_input')" clearable />
                </el-form-item>
              </div>
            </div>
            <div class="input-frame">
              <div class="input-box pr20">
                <el-form-item :label="$t('phone')">
                  <el-input v-model="form.client_phone" size="large" :placeholder="$t('please_input')" clearable />
                </el-form-item>
              </div>
              <div class="input-box">
                <el-form-item :label="$t('inquiry_matters')" prop="matters">
                  <el-select v-model="form.matters" :placeholder="$t('please_select')" size="large" clearable>
                    <template v-for="item in inquiryList" :key="item.id">
                      <el-option :label="item[langurageType('name_')]" :value="item.value" />
                    </template>
                  </el-select>
                </el-form-item>
              </div>
            </div>
            <div class="input-frame">
              <div class="input-box">
                <el-form-item :label="$t('how_can_we_help') + '?'" prop="remark">
                  <el-input size="large" v-model="form.remark" type="textarea" :rows="6" :placeholder="$t('enter_your_message_here') + '...'" />
                </el-form-item>
              </div>
            </div>
            <div class="check-box">
              <el-checkbox v-model="isCheckbox" size="large" /><span @click="changeCheckbox" class="span-test">{{ $t('i_agree_to_the') }} </span
              ><router-link to="/terms">{{ $t('terms_and_conditions') }}</router-link>
            </div>
            <div class="contacts-btn">
              <el-button type="success" size="large" color="#448c74" @click="submitContact">{{ $t('send_a_request') }}</el-button>
            </div>
          </el-form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

import { storeToRefs } from 'pinia'
import useMainStore from '@/store/modules/main'

import getLangurageType from '@/hooks/langurageType'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const { langurageType } = getLangurageType()

const useMain = useMainStore()

const formRef = ref(null)
const form = ref({
  client_phone: '',
  client_name: '',
  client_email: '',
  matters: '',
  remark: ''
})
const isCheckbox = ref(false)

const inquiryList = ref([
  {
    id: '1',
    value: '活動資訊',
    name_tc: '活動資訊',
    name_sc: '活动资讯',
    name_en: 'Event information'
  },
  {
    id: '2',
    value: '加入SportsFay',
    name_tc: '加入SportsFay',
    name_sc: '加入SportsFay',
    name_en: 'Join SportsFay'
  },
  {
    id: '3',
    value: '贊助活動',
    name_tc: '贊助活動',
    name_sc: '赞助活动',
    name_en: 'Sponsorship Activities'
  },
  {
    id: '4',
    value: '舉辦活動',
    name_tc: '舉辦活動',
    name_sc: '举办活动',
    name_en: 'Organize events'
  }
])

const rules = reactive({
  client_name: [{ required: true, message: t('please_input') + ' ' + t('name'), trigger: 'blur' }],
  matters: [{ required: true, message: t('please_input') + ' ' + t('inquiry_matters'), trigger: 'blur' }],
  remark: [{ required: true, message: t('please_input') + ' ' + t('how_can_we_help'), trigger: 'blur' }],
  client_email: [{ required: true, message: t('please_input'), trigger: 'blur' }]
})

const changeCheckbox = () => {
  isCheckbox.value = !isCheckbox.value
}

const submitContact = () => {
  formRef.value?.validate(async (valid) => {
    if (valid) {
      if (isCheckbox.value) {
        let formData = new FormData()
        formData.append('client_name', form.value.client_name)
        formData.append('client_phone', form.value.client_phone)
        formData.append('client_email', form.value.client_email)
        formData.append('matters', form.value.matters)
        formData.append('remark', form.value.remark)
        const flag = await useMain.sendContacUsAction(formData)
        if (flag) {
          isCheckbox.value = false
          formRef.value?.resetFields()
        }
      } else {
        // ElMessage.error(t('tipcontact'))
        ElMessage({
          showClose: true,
          message: t('tipcontact'),
          type: 'error'
        })
      }
    } else {
      // ElMessage.error(t('form_tip'))
      ElMessage({
        showClose: true,
        message: t('form_tip'),
        type: 'error'
      })
    }
  })
}
</script>

<style scoped lang="less">
.contact {
  padding: 80px 0;
  .contacts-box {
    display: flex;
    padding: 0 30px;
    .contacts-left {
      flex: 1;
      .contacts-title {
        font-size: 50px;
        margin-bottom: 20px;
      }
      .contacts-tip {
        font-size: 15px;
      }
    }
    .contacts-right {
      flex: 2;
      :deep(.el-form) {
        .input-frame {
          display: flex;
          .input-box {
            flex: 1;
          }
          .el-form-item {
            display: block;
            margin-bottom: 12px;
            .el-form-item__error {
              display: none;
            }
          }
        }
        .check-box {
          display: flex;
          align-items: center;
          .el-checkbox {
            height: 20px;
          }
          .span-test {
            margin: 0 5px;
            cursor: pointer;
          }
          a {
            color: rgba(68, 140, 116, 0.9);
            // color: var(--color-f5ba4b);
            &:hover {
              color: var(--color-b27437);
            }
          }
        }
        .contacts-btn {
          margin-top: 12px;
          .el-button {
            // height: 45px;
            width: 100%;
            padding: 8px 50px;
            // border-radius: 50px;
            color: var(--color-fff);
          }
        }
        .pr20 {
          padding-right: 30px;
        }
      }
    }
    .pr100 {
      padding-right: 100px;
    }
  }
}
@media screen and (max-width: 1024px) {
  .contact {
    .contacts-box {
      display: block;
      .contacts-left {
        margin-bottom: 50px;
      }
      .pr100 {
        padding-right: 0px;
      }
    }
  }
}
@media screen and (max-width: 600px) {
  .contact {
    .contacts-box {
      .contacts-left {
        .contacts-title {
          font-size: 35px;
        }
      }
      .contacts-right {
        :deep(.el-form) {
          .input-frame {
            display: block;
          }
          .pr20 {
            padding-right: 0px;
          }
        }
      }
    }
  }
}
</style>
