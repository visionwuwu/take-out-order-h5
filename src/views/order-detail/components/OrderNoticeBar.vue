<template>
  <div class="order-notice-bar" v-if="showNoticeBar">
    <van-notice-bar
      left-icon="volume-o"
      mode="closeable"
      text="15分钟内未支付，订单将自动取消"
      @close="$emit('update:showNoticeBar', false)"
    />
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'OrderNoticeBar',
  props: {
    showNoticeBar: {
      type: Boolean,
      default: false
    }
  },
  emits: ['update:showNoticeBar']
})
</script>

<style scoped lang="less">
.order-notice-bar {
  padding: 0 13px;
  .van-notice-bar {
    font-size: 13px;
    height: 6.667vw;
    padding: 0 5px;
  }
}
</style>
