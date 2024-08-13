<template>
  <div class="continer">
    <div class="continer-login">
      <SidebarMenu/>
      <!-- <ProfileHeader /> -->
      <div class="login-content">
        <h2>{{ $t('profile.edit') }}</h2>

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

            <h2 class="change-pwd" v-if="screenWidth > 768">{{ $t('profile.change') }}</h2>

            <h2 class="change-pwd-mobile" v-else>{{ $t('profile.change') }}</h2>

            <el-form-item :label="$t('profile.password')" prop="password">
              <el-input v-model="form.password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item :label="$t('profile.new_password')" prop="new_password">
              <el-input v-model="form.new_password" type="password" show-password></el-input>
            </el-form-item>
            <el-form-item :label="$t('profile.confirm_new_password')" prop="password_confirmation">
              <el-input v-model="form.password_confirmation" type="password" show-password></el-input>
            </el-form-item>
          </el-form>
          <el-button type="primary" class="login-btn" @click="submit" size="large">{{ $t('profile.save') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import SidebarMenu from './component/sidebar-menu.vue'
import ProfileHeader from './component/profile-header.vue'
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
  new_password: '',
  password_confirmation: ''
})
const titleArr = ref([
  { value: 'mr', label: 'Mr' },
  { value: 'ms', label: 'Ms' },
  { value: 'mrs', label: 'Mrs' }
])

const screenWidth = ref(window.innerWidth)

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
  phone: [{ required: true, message: t('register.phone_msg'), trigger: 'blur' }]
  // password: [
  //   { required: true, message: t('register.password_msg'), trigger: 'blur' },
  //   { min: 8, message: t('register.password_type_msg'), trigger: 'blur' }
  // ],
  // new_password: [
  //   { required: true, message: t('register.password_msg'), trigger: 'blur' },
  //   { min: 8, message: t('register.password_type_msg'), trigger: 'blur' }
  // ],
  // password_confirmation: [{ required: true, message: t('register.password_confirmation_error'), trigger: 'blur' }]
})

const getCaptchCode = () => {
  if (!form.value.email) {
    ElMessage({
      showClose: true,
      message: t('order.phone_hint'),
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

const resetSize = () => {
  screenWidth.value = window.innerWidth
}

onMounted(() => {
  window.addEventListener('resize', resetSize)
})

watch(
  () => form.value.password_confirmation,
  (newVal) => {
    if (newVal !== form.value.new_password) {
      formRuleRef.value.validateField('password_confirmation', () => {
        formRuleRef.value.fields.find((field) => field.prop === 'password_confirmation').validateMessage = t('register.password_confirmation_error')
      })
    } else {
      formRuleRef.value.validateField('password_confirmation')
    }
  }
)
</script>
<style scoped lang="less">
.continer{
  background-color: rgba(250, 250, 250, 1);
}
.continer-login {
  display: flex;
  justify-content: center;
  padding: 40px 20px;
  color: #333;
  align-items: flex-start;
  gap: 30px;
  .login-content {
    max-width: 840px;
    width: 100%;
    box-shadow: 0 0 6px #e7e7e7;
    border-radius: 15px;
    padding: 40px 20px;
    position: relative;
    background-color: #fff;
    box-sizing: border-box;
    .login-form {
      margin-top: 30px;
      :deep(.el-form) {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 20px;
      }

      :deep(.el-form-item) {
        width: calc(100% - 40px);
        margin-bottom: 0px;
      }

      .change-pwd {
        grid-column: span 2; /* 使 h3 元素跨越两列 */
        margin-top: 50px; /* 添加一些上边距 */
        margin-bottom: 10px;
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
      margin-top: 50px;
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

  .continer-login{
    flex-direction: column;
    padding-top: 20px;
    gap: 20px;
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
