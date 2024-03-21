<template>
  <div id="userLoginView">
    <h2 style="margin-bottom: 16px">用户登录</h2>
    <a-form
      label-align="left"
      style="max-width: 480px; margin: 0 auto"
      class="loginForm"
      auto-label-width
      :model="form"
      @submit="handleSubmit"
    >
      <a-form-item field="userAccount" label="账号">
        <a-input v-model="form.userAccount" placeholder="请输入账号" />
      </a-form-item>
      <a-form-item field="userPassword" label="密码">
        <a-input-password v-model="form.userPassword" placeholder="请输入密码" />
      </a-form-item>
      <a-form-item>
        <a-button type="primary" style="width: 120px; margin-left: auto" html-type="submit"
          >登录</a-button
        >
      </a-form-item>
    </a-form>
  </div>
</template>
<script setup lang="ts">
import { UserControllerService, type UserLoginRequest } from '@/generated'
import { Message } from '@arco-design/web-vue';
import { reactive } from 'vue'
import { useRouter } from "vue-router";
import { useUserStore } from '@/stores/user'

const form = reactive<UserLoginRequest>({
  userAccount: '',
  userPassword: ''
})

const router = useRouter();

const handleSubmit = async () => {
  console.log(JSON.stringify(form))
  const res = await UserControllerService.userLoginUsingPost(form)
  console.log(JSON.stringify(res))
  if (res.code === 0) {
    Message.success("登录成功！你好" + res.data.userName);
    const userStore = useUserStore()
    userStore.loginUser.userName = res.data.userName
    userStore.loginUser.userRole = res.data.userRole
    router.push('/')
  } else {
    Message.error('登录失败' + res.message)
  }

}
</script>

<style scoped></style>
