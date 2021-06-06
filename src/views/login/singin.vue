<template>
  <div>
    <Logo />
    <van-form class="form" @submit="onSubmit">
      <van-field
        v-model="username"
        type="text"
        name="username"
        maxlength="20"
        clearable
        label="用户名"
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="password"
        maxlength="20"
        clearable
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" :loading="loading">
          提交
        </van-button>
        <van-button
          style="margin-top: 10px"
          plain
          round
          block
          type="primary"
          native-type="button"
          to="/register"
          >注册</van-button
        >
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import Logo from './components/Logo.vue'
import { useSigninEffect } from './hooks/useSinginEffect'

export default defineComponent({
  name: 'Signin',
  components: {
    Logo
  },
  setup() {
    const { username, password, loading, onSubmit } = useSigninEffect()
    return {
      username,
      password,
      loading,
      onSubmit
    }
  }
})
</script>

<style lang="less" scoped>
.form {
  padding: 24px;
  margin-top: 50px;
}
.forget {
  box-sizing: border-box;
  color: #323233b9;
  font-size: 26px;
  text-align: right;
  padding-right: 34px;
  padding-top: 20px;
}
</style>

<style lang="less">
.van-cell__title {
  flex: none;
}
</style>
