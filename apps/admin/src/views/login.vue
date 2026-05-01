<template>
  <div class="login-container flex-center">
    <el-form ref="loginFormRef" class="login-form" :model="loginForm" :rules="loginRules">
      <h3 class="title">{{ appTitle }}</h3>

      <el-form-item prop="username">
        <el-input v-model.trim="loginForm.username" placeholder="账号" clearable>
          <template #prefix>
            <SvgIcon name="User"></SvgIcon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="password">
        <el-input v-model.trim="loginForm.password" type="password" show-password placeholder="密码" clearable>
          <template #prefix>
            <SvgIcon name="Lock"></SvgIcon>
          </template>
        </el-input>
      </el-form-item>

      <el-form-item prop="captcha">
        <div class="flex items-center w-full">
          <el-input v-model.trim="loginForm.captcha" placeholder="请输入验证码" @keydown.enter="handleLogin" clearable>
            <template #prefix>
              <SvgIcon name="Key"></SvgIcon>
            </template>
          </el-input>
          <img :src="captchaURL" alt="captcha" class="captcha-image" draggable="false" @click="getCaptcha" />
        </div>
      </el-form-item>

      <el-checkbox v-model="rememberMe" style="margin: 0px 0px 25px 0px">记住密码</el-checkbox>

      <el-form-item>
        <el-button :loading type="primary" class="w-full" size="large" @click="handleLogin">
          <span>{{ loading ? `登录中` : `登录` }}</span>
        </el-button>
      </el-form-item>
    </el-form>

    <!--  底部  -->
    <div class="login-footer text-center">
      <span>Copyright © 2026-{{ dayjs().format('YYYY') }} snowbox All Rights Reserved.</span>
    </div>
  </div>
</template>

<script setup lang="ts">
defineOptions({ name: 'Login' })
import dayjs from 'dayjs'
import { TipModal } from '@/utils'
import { getTimeGreeting } from '@yunhe-vue/utils'
import type { LoginDto } from '@/types'
import type { FormRules } from 'element-plus'
import { AuthRequest } from '@/api/auth.request'
import defaultCaptcha from '@/assets/images/default/default-captcha.png'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()

/** 系统标题 */
const appTitle = import.meta.env.VITE_APP_TITLE

/** 是否记住密码 */
const rememberMe = ref<boolean>(false)

/** 登录加载状态 */
const loading = ref<boolean>(false)

/** 验证码图片地址 */
const captchaURL = ref<string>(defaultCaptcha)

/** 计算需要跳转的路径 */
const redirect = (route.query['redirect'] as string) ?? '/'

/** 获取登录表单实例 */
const loginFormRef = useTemplateRef('loginFormRef')

/** 登录表单数据 */
const loginForm = ref({ username: 'admin', password: 'admin123456' } as LoginDto)

/** 登录表单校验规则 */
const loginRules: FormRules<LoginDto> = {
  username: [{ required: true, message: '请输入账号', trigger: ['blur'] }],
  password: [{ required: true, message: '请输入密码', trigger: ['blur'] }],
  captcha: [{ required: true, message: '请输入验证码', trigger: ['blur'] }],
}

/** 请求验证码数据 */
async function getCaptcha() {
  const data = await AuthRequest.getCaptcha()
  captchaURL.value = data.captcha
  loginForm.value.uuid = data.uuid
}

/** 处理登录请求 */
async function handleLogin() {
  try {
    loading.value = true
    await loginFormRef.value?.validate()
    await userStore.login(loginForm.value)
    loading.value = false
    await router.replace(redirect)
    TipModal.msgSuccess(`${getTimeGreeting()}，欢迎回来`)
  } catch (error: any) {
    console.log('handleLogin error: ', error)
    loginForm.value.captcha = ''
    getCaptcha()
    loading.value = false
  }
}

onMounted(() => {
  getCaptcha()
})
</script>

<style lang="scss" scoped>
html[data-device='mobile'] .login-container {
  --login-form-width: calc(100% - 32px);
}
.login-container {
  --login-form-width: 420px;
  --login-captcha-height: 38px;
  --login-captcha-border-radius: var(--el-border-radius-base);
  --login-input-height: 38px;
  position: relative;
  height: 100%;
  background-image: linear-gradient(to top, #2d8cc4, #d8d0d0);
  // background-image: linear-gradient(to top, var(--el-color-primary-light-7), var(--el-color-danger-light-7));
  background-size: cover;

  .login-form {
    width: var(--login-form-width);
    padding: 25px 25px 5px 25px;
    border-radius: 6px;
    background-color: #fff;

    .title {
      margin: 0px auto 30px auto;
      text-align: center;
      color: var(--el-text-color-regular);
      font-size: 20px;
      font-weight: 500;
    }

    .el-input {
      --el-input-height: var(--login-input-height);
    }

    .captcha-image {
      cursor: pointer;
      margin-left: 8px;
      height: var(--login-captcha-height);
      border-radius: var(--login-captcha-border-radius);
      box-shadow: var(--el-box-shadow);
    }
  }

  .login-footer {
    position: absolute;
    bottom: 0;
    width: 100%;
    height: 40px;
    line-height: 40px;
    color: var(--el-color-white);
    font-size: var(--el-font-size-extra-small);
    letter-spacing: 1px;
  }
}
</style>
