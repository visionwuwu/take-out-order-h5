<template>
  <div>
    <van-nav-bar title="注册" left-text="返回" left-arrow @click-left="$router.back()" />
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="username"
        label="用户名"
        required
        clearable
        placeholder="用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        required
        clearable
        type="password"
        name="password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="mobile"
        type="tel"
        name="mobile"
        label="手机号"
        required
        clearable
        placeholder="手机号"
        :rules="[{ required: true, message: '请填写手机号' }]"
      />
      <div style="margin: 16px">
        <van-button round block type="primary" native-type="submit" :loading="loading">
          提交
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useSingupEffect } from './hooks/useSingupEffect'

export default defineComponent({
  name: 'Singup',
  setup() {
    const { username, password, mobile, loading, onSubmit } = useSingupEffect()
    return {
      username,
      password,
      mobile,
      loading,
      onSubmit
    }
  }
})
</script>

<style scoped></style>
