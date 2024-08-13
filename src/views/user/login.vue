<template>
  <div class="continer">
    <div class="continer-login">
      <div class="login-content">
        <h2>{{ $t('login.user_login') }}</h2>

        <div class="login-form">
          <el-form label-position="top" :model="form" :rules="rules" ref="formRuleRef">
            <el-form-item :label="$t('email')" prop="email">
              <el-input v-model="form.email" type="text" size="large"></el-input>
            </el-form-item>
            <el-form-item :label="$t('password')" prop="password">
              <el-input v-model="form.password" type="password" show-password size="large"></el-input>
            </el-form-item>
            <div class="forget-password">
              <a href="/forget-password">{{ $t('login.forget_password') }}</a>
            </div>
          </el-form>
          <div class="login-info">
            <div>
              <el-checkbox>{{ $t('login.rember_me') }}</el-checkbox>
            </div>
            <div class="login-info-register">
              <a href="/register">{{ $t('login.login_register') }}</a>
            </div>
          </div>
          <div class="login-rules" v-html="$t('agreement')"></div>
          <el-button type="primary" class="login-btn" size="large" @click="submit">{{ $t('login.login') }}</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { ref, reactive } from 'vue'
import { useI18n } from 'vue-i18n'
import getLangurageType from '@/hooks/langurageType'
const { langurageType } = getLangurageType()
const { t, locale } = useI18n()
const form = ref({
  email: '',
  password: ''
})

const formRuleRef = ref(null)

const rules = reactive({
  first_name: [{ required: true, message: t('register.first_name_msg'), trigger: 'blur' }],
  last_name: [{ required: true, message: t('register.last_name_msg'), trigger: 'blur' }],
  title: [{ required: true, message: t('register.title_msg'), trigger: 'change' }],
  email: [
    { required: true, message: t('register.email_msg'), trigger: 'blur' },
    { type: 'email', message: t('register.email_type_msg'), trigger: 'blur' }
  ],
  password: [{ required: true, message: t('register.password_msg'), trigger: 'blur' }]
})

const submit = () => {
  formRuleRef.value.validate((valid) => {
    if (valid) {
      console.log('submit')
      location.href = '/profile'
    } else {
      console.log('error submit!!')
      return false
    }
  })
}
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
        margin-bottom: 40px;
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
        text-decoration: underline !important;
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
</style>
