<template>
  <div class="login-container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form ref="loginFormRef" :model="loginForm" :rules="loginRules" class="login-form">
          <h3 class="title">用户登录</h3>
          <el-form-item prop="username">
            <el-input
              v-model="loginForm.username"
              :prefix-icon="User"
              placeholder="请输入用户名"
              size="default"
            />
          </el-form-item>
          <el-form-item prop="password">
            <el-input
              v-model="loginForm.password"
              :prefix-icon="Lock"
              type="password"
              placeholder="请输入密码"
              size="default"
              show-password
            />
          </el-form-item>
          <el-form-item>
            <el-button
              type="primary"
              size="default"
              class="login_btn"
              @click="handleLogin"
              :loading="loading"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { User, Lock } from '@element-plus/icons-vue'
import useUserStore from '@/stores/modules/user'
import { useRouter } from 'vue-router'

const loading = ref(false)
const $router = useRouter()
const userStore = useUserStore()
const loginFormRef = ref()
const loginForm = ref({
  username: '',
  password: '',
})

// 表单校验规则对象
const loginRules = {
  // 对于username表单项的校验规则数组，每个元素为一个表单项校验规则对象
  // username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
  // password: [{ required: true, message: '请输入密码', trigger: 'blur' }],
  username: [{ validator: validateUsername, trigger: 'blur' }],
  password: [{ validator: validatePassword, trigger: 'blur' }],
}

const handleLogin = async () => {
  // 按钮显示加载效果
  loading.value = true

  // 保证整个表单校验通过才发送登录请求
  await loginFormRef.value.validate()

  try {
    await userStore.userLogin(loginForm.value)
    loading.value = false
    // 登录成功，跳转到登出前页面或首页
    const redirect = ($router.currentRoute.value.query.redirect as string) || '/'
    $router.push({ path: redirect })
    ElNotification({
      type: 'success',
      title: 'hi，欢迎回来',
      message: '登录成功',
    })
  } catch {
    loading.value = false
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validateUsername(rule: any, value: any, callback: any) {
  // rule:表单项校验规则对象
  // value:表单项校验值
  // callback:回调函数
  if (value.length >= 5) {
    callback()
  } else {
    callback(new Error('请输入用户名，至少5位'))
  }
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function validatePassword(rule: any, value: any, callback: any) {
  if (value.length >= 6) {
    callback()
  } else {
    callback(new Error('请输入密码，至少6位'))
  }
}
</script>

<style scoped lang="scss">
.login-container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;
}

.login-form {
  position: relative;
  width: 60%;
  top: 30vh;
  background: url('@/assets/images/login_form.png') no-repeat;
  background-size: cover;
  padding: 40px;
  border-radius: 50px;

  .title {
    font-size: 24px;
    font-weight: bold;
    color: #fff;
    padding-bottom: 20px;
  }

  .el-form-item:nth-of-type(-n + 2) {
    margin-bottom: 30px;
  }

  @media (width <= 768px) {
    width: 90%;
    margin: 0 auto;
    padding: 30px 20px;
    border-radius: 24px;
  }
}
</style>
