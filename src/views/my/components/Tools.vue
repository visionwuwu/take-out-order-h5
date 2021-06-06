<template>
  <div class="user-tools">
    <van-cell title="Git仓库" is-link />
    <van-cell title="文档说明" is-link />
    <van-cell title="退出登录" is-link @click="loginOut" />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'
import { useRouter } from 'vue-router'
import { Dialog, Notify } from 'vant'
import { useAppStore } from 'src/store'
import { UserActionTypes } from 'src/store/modules/user/action-types'

export default defineComponent({
  name: 'User',
  setup() {
    const store = useAppStore()
    const router = useRouter()
    const loginOut = () => {
      Dialog.confirm({
        message: '确认退出登录吗？'
      }).then(() => {
        store.dispatch(UserActionTypes.ACTION_LOGIN_OUT).then(() => {
          Notify({ type: 'success', message: '退出登录成功' })
          router.replace('/')
        })
      })
    }
    return {
      loginOut
    }
  }
})
</script>
<style lang="less" scoped>
.user-tools {
  width: 351px;
  background: rgba(255, 255, 255, 1);
  margin: 0 auto;
  margin-top: 12px;
  box-shadow: 0px 1px 8px 0px rgba(0, 0, 0, 0.09);
  border-radius: 12px;
  overflow: hidden;
}
</style>
