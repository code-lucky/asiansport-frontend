<template>
  <div class="application">
    <div class="container"></div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { getAssetURL } from '@/utils/load_assets'

import { ArrowRight, Plus } from '@element-plus/icons-vue'

const formRef = ref(null)
const form = ref({
  people: [
    {
      dob: '',
      phone: '',
      email: '',
      name_en: '',
      name_tc: '',
      membership_id: '',
      club_name: ''
    }
  ]
})

const rules = reactive({})
const peopleRules = reactive({
  dob: [{ required: true, message: 'Please input Year of Birth', trigger: 'blur' }],
  phone: [{ required: true, message: 'Please input Phone', trigger: 'blur' }],
  email: [{ required: true, message: 'Please input Email', trigger: 'blur' }],
  name_en: [{ required: true, message: 'Please input English Name', trigger: 'blur' }],
  name_tc: [{ required: true, message: 'Please input Chinese Name', trigger: 'blur' }],
  membership_id: [{ required: true, message: 'Please input Membership ID', trigger: 'blur' }],
  club_name: [{ required: true, message: 'Please select Club Name', trigger: 'blur' }]
})

const payBtn = () => {
  formRef.value?.validate((valid) => {
    if (valid) {
    } else {
      ElMessage.error('Oops, Please enter the correct format before proceeding with the operation.')
    }
  })
}
</script>

<style scoped lang="less">
.application {
  .form {
    padding: 0 30px;
    .application-title {
      margin-bottom: 20px;
      font-size: 22px;
      font-weight: bold;
    }
    .input-frame {
      display: flex;
      margin: 0 -10px;
      .input-box {
        flex: 1;
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
      .paybtn {
        margin-bottom: 30px;
        text-align: center;
        .el-button {
          width: 320px;
          font-size: 16px;
        }
      }
    }
  }
}
</style>
