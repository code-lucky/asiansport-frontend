<template>
  <div class="continer">
    <div class="continer-login">
      <div class="login-content">
        <h2>{{ $t('register.user_register') }}</h2>

        <div class="login-form">
          <el-form label-position="top" ref="formRuleRef" :rules="rules" :model="form" size="large">
            <el-form-item :label="$t('register.last_name')" prop="last_name">
              <el-input v-model="form.last_name" type="text"></el-input>
            </el-form-item>
            <el-form-item :label="$t('register.first_name')" prop="first_name">
              <el-input v-model="form.first_name" type="text"></el-input>
            </el-form-item>
            <el-form-item :label="$t('register.title')" prop="title">
              <el-select class="select" v-model="form.title" size="large" placeholder="">
                <el-option v-for="item in titleArr" :key="item.value" :label="item.label" :value="item.value" />
              </el-select>
            </el-form-item>
            <el-form-item :label="$t('email')" prop="email">
              <el-input v-model="form.email" type="text"></el-input>
            </el-form-item>
            <el-form-item :label="$t('phone')" prop="phone">
              <el-input v-model="form.phone" type="number"></el-input>
            </el-form-item>
            <el-form-item :label="$t('register.password')" prop="password">
              <el-input v-model="form.password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item :label="$t('confirm_password')" prop="password_confirmation">
              <el-input v-model="form.password_confirmation" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item :label="$t('captcha_code')" prop="captch_code" class="append">
              <el-input v-model="form.captch_code" type="text" maxlength="6"></el-input>
              <el-button class="captch-code" slot="append" type="primary" @click="getCaptchCode" size="small">{{ captchTitle }}</el-button>
            </el-form-item>
          </el-form>
          <div class="login-rules" v-html="$t('agreement')"></div>

          <div class="go-login">
            <a href="/login"> {{ $t('register.register_login') }} </a>
          </div>
          <el-button type="primary" class="login-btn" @click="submit" size="large">{{ $t('register.register') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive, onMounted, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import getLangurageType from '@/hooks/langurageType'
const { langurageType } = getLangurageType()
const { t, locale } = useI18n()

const form = ref({
  first_name: '',
  last_name: '',
  title: '',
  email: '',
  phone: '',
  password: '',
  password_confirmation: '',
  captch_code: ''
})
const titleArr = ref([
  { value: 'mr', label: 'Mr' },
  { value: 'ms', label: 'Ms' },
  { value: 'mrs', label: 'Mrs' }
])
const captchTitle = ref(t('get_captcha_code'))
const formRuleRef = ref(null)
const rules = reactive({
  first_name: [{ required: true, message: t('register.first_name_msg'), trigger: 'blur' }],
  last_name: [{ required: true, message: t('register.last_name_msg'), trigger: 'blur' }],
  title: [{ required: true, message: t('register.title_msg'), trigger: 'change' }],
  email: [
    { required: true, message: t('register.email_msg'), trigger: 'blur' },
    { type: 'email', message: t('register.email_type_msg'), trigger: 'blur' }
  ],
  phone: [{ required: true, message: t('register.phone_msg'), trigger: 'blur' }],
  password: [
    { required: true, message: t('register.password_msg'), trigger: 'blur' },
    { min: 8, message: t('register.password_type_msg'), trigger: 'blur' }
  ],
  password_confirmation: [{ required: true, message: t('register.password_confirmation_error'), trigger: 'blur' }],
  captch_code: [{ required: true, message: t('register.captch_code_msg'), trigger: 'blur' }]
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
  formRuleRef.value.validate((valid) => {
    if (valid) {
      console.log('submit')
    } else {
      console.log('error submit!!')
      return false
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
    background-color: #fff;
    width: 900px;
    box-shadow: 0 0 6px #e7e7e7;
    border-radius: 20px;
    padding: 40px 20px;
    position: relative;

    .login-form {
      margin-top: 50px;
      :deep(.el-form) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 40px;
      }

      :deep(.el-form-item) {
        width: calc(100% - 40px);
        margin-bottom: 0px;
      }

      .login-rules {
        margin-top: 20px;
        a {
          color: #333;
          text-decoration: underline;
        }
      }
    }

    .login-btn {
      width: calc(100%);
      // height: 50px;
      // border-radius: 50px;
      margin-top: 10px;
    }

    .go-login {
      margin-top: 30px;
      text-align: right;
      margin-right: 20px;
      a {
        color: rgba(68, 140, 116, 1);
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

// :deep(.el-select) {
//   --el-fill-color-blank: #f4f4f4 !important;
//   --el-border-radius-base: 50px !important;
//   --el-border-color: #fff !important;
//   font-size: 15px;
// }

// :deep(.el-select--large .el-select__wrapper) {
//   min-height: 50px !important;
//   box-shadow: none;
// }

// :deep(.el-input__wrapper) {
//   padding: 1px 30px;
//   box-shadow: none;
// }
:deep(.el-checkbox__label) {
  color: #333;
}

@media screen and (max-width: 768px) {
  :deep(.el-form) {
    grid-template-columns: repeat(1, 1fr) !important;
  }
  :deep(.el-form-item) {
    width: 100% !important;
  }
}

.select {
  width: 100%;
  :deep(.el-input__inner) {
    --el-color-primary: transparent !important;
  }
}

.append {
  position: relative;
  .captch-code {
    // border-radius: 40px;
    position: absolute;
    right: 10px;
  }
}
</style>
