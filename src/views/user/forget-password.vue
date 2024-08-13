<template>
  <div class="continer">
    <div class="continer-login">
      <div class="login-content">
        <h2>{{ $t('reset_password.reset_password') }}</h2>

        <div class="login-form">
          <el-form label-position="top" :rules="rules" :model="form" ref="formRef" size="large">
            <el-form-item :label="$t('email')" prop="email">
              <el-input v-model="form.email" type="text"></el-input>
            </el-form-item>
            <el-form-item :label="$t('reset_password.new_password')" prop="password">
              <el-input v-model="form.password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item :label="$t('reset_password.confirm_password')" prop="password_confirmation">
              <el-input v-model="form.password_confirmation" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item :label="$t('captcha_code')" class="append" prop="captch_code">
              <el-input v-model="form.captch_code" type="text" maxlength="6"></el-input>
              <el-button class="captch-code" slot="append" type="primary" @click="getCaptchCode" size="small">{{ captchTitle }}</el-button>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="login-btn" @click="submit" size="large">{{ $t('reset_password.reset_password_submit') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import getLangurageType from '@/hooks/langurageType'
const { langurageType } = getLangurageType()
const { t, locale } = useI18n()

const form = ref({
  email: '',
  password: '',
  password_confirmation: '',
  captch_code: ''
})

const captchTitle = ref(t('get_captcha_code'))
const formRef = ref(null)
const rules = reactive({
  email: [
    { required: true, message: t('reset_password.email_msg'), trigger: 'blur' },
    { type: 'email', message: t('reset_password.email_type_msg'), trigger: 'blur' }
  ],
  password: [
    { required: true, message: t('reset_password.password_msg'), trigger: 'blur' },
    { min: 8, message: t('reset_password.password_type_msg'), trigger: 'blur' }
  ],
  password_confirmation: [
    { required: true, message: t('reset_password.password_confirmation_msg'), trigger: 'blur' },
    { min: 8, message: t('reset_password.password_confirmation_type_msg'), trigger: 'blur' }
  ],
  captch_code: [{ required: true, message: t('reset_password.captch_code_msg'), trigger: 'blur' }]
})

const getCaptchCode = () => {
  if (!form.value.email) {
    ElMessage({
      showClose: true,
      message: t('register.email_msg'),
      type: 'error'
    })
    return
  }

  // 防止重複點擊判斷
  if (captchTitle.value !== t('get_captcha_code')) return
  let count = 60
  const timer = setInterval(() => {
    count--
    captchTitle.value = `${count}s`
    if (count <= 0) {
      clearInterval(timer)
      captchTitle.value = t('get_captcha_code')
    }
  }, 1000)
}

const submit = () => {
  formRef.value.validate((valid) => {
    if (valid) {
      console.log('submit')
    } else {
      console.log('error')
    }
  })
}

watch(locale, (newLocale, oldLocale) => {
  captchTitle.value = t('get_captcha_code')
})
</script>
<style scoped lang="less">
.continer {
  background-color: rgba(250, 250, 250, 1);
}
.continer-login {
  display: flex;
  justify-content: center;
  padding: 70px 20px;
  color: #333;
  
  .login-content {
    width: 700px;
    box-shadow: 0 0 6px #e7e7e7;
    border-radius: 20px;
    padding: 40px 20px;
    position: relative;
    background-color: #fff;
    .login-form {
      margin-top: 50px;

      .login-info {
        display: flex;
        align-items: center;
        justify-content: space-between;

        .login-info-register {
          a {
            color: rgba(68, 140, 116, 1);
            font-size: 14px;
            text-decoration: underline;
          }
        }
      }

      .forget-password {
        width: 100%;
        text-align: right;
        margin-right: 10px;
        a {
          color: #333;
          font-size: 14px;
          text-decoration: underline;
        }
      }
    }

    .login-btn {
      width: calc(100%);
      // height: 50px;
      // border-radius: 50px;
      margin-top: 30px;
    }

    .login-rules {
      margin-top: 10px;
      a {
        font-size: 14px;
        text-decoration: underline;
      }
    }
  }
}

// :deep(.el-form-item__label) {
//   font-size: 16px;
//   color: #333;
// }

// :deep(.el-input) {
//   --el-component-size: 50px !important;
//   --el-input-height: 50px !important;
//   --el-input-bg-color: #f4f4f4 !important;
//   --el-input-border-radius: 50px !important;
//   font-size: 15px;
// }
// :deep(.el-input__wrapper) {
//   padding: 1px 30px;
//   box-shadow: none;
// }
// :deep(.el-form-item) {
//   margin-bottom: 30px;
// }
// :deep(.el-checkbox__label) {
//   color: #333;
// }

.append {
  position: relative;
  .captch-code {
    // border-radius: 40px;
    position: absolute;
    right: 10px;
  }
}
</style>
