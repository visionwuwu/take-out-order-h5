<template>
  <div class="user-info">
    <van-image radius="6" width="50" height="50" :src="userInfo.avatar" />
    <div class="main">
      <div class="main__title">
        <h3 class="main__title__name">{{ userInfo.username }}</h3>
      </div>
      <div class="main__id">
        <span class="main__id__code">手机号：{{ userInfo.mobile }}</span>
        <!-- <span style="color:#fff">
          <svg-icon icon-class="copy" :width="13" :height="13" />
        </span> -->
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { useAppStore } from 'src/store'
import { computed, defineComponent } from 'vue'

export default defineComponent({
  name: 'User',
  setup() {
    const store = useAppStore()
    console.log(store.state.user)
    return {
      userInfo: computed(() => store.state.user)
    }
  }
})
</script>

<style lang="less" scoped>
@import 'styles/variables.module.less';
.user-info {
  display: flex;
  flex-direction: row;
  padding: 30px 12px 25px 12px;
  background: @theme-color;
  border-radius: 100% 100% 100% 100% / 0% 0% 16% 16%;
  .main {
    margin-left: 9px;
    &__title {
      display: flex;
      flex-direction: row;
      align-items: center;
      margin-top: 3px;
      &__name {
        font-size: 19px;
        font-weight: 500;
        color: #fff;
        display: inline-block;
        max-width: 175px;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        margin-right: 10px;
      }
    }
    &__id {
      margin-top: 12px;
      &__code {
        font-size: 14px;
        font-weight: 400;
        color: #fff;
        margin-right: 5px;
      }
    }
  }
}
</style>
